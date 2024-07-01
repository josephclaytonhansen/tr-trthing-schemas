import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import morgan from 'morgan'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const connectionsFilePath = path.join(__dirname, '.connections')

let connections = {}

let storedConnections = {}
if (fs.existsSync(connectionsFilePath)) {
    const connectionsFileContent = fs.readFileSync(connectionsFilePath, 'utf8')
    storedConnections = JSON.parse(connectionsFileContent)
} else {
    fs.writeFileSync(connectionsFilePath, JSON.stringify(storedConnections))
}

dotenv.config()

import express from 'express'
import CombatExtrasSchema from './things/globalSettings/combat/combatextras.js'
import GlobalExperiencesSchema from './things/globalSettings/experiences.js'
import ExtraStatsSchema from './things/globalSettings/extrastats.js'
import GlobalWeaponTypesSchema from './things/globalSettings/weapontypes.js'

import {checkHighest} from './server/functions/data_management/hexuids.js'

import Map from './server/data_maps.js'

const app = express()
const port = 9194

app.use(cors(
    {
        origin: process.env.LOCAL === 'true' ?  'http://localhost:26068' : 'https://editor.turnroot.com'
    }
))

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const attachHighest = async (req, res, next) => {
    if (!req.body.userId) {
        throw new Error('No user ID provided')
    }
    if (!req.user) {
        req.user = {
            userId: req.body.userId
        }
    }
    if (!req.user.highest) {
        let check = await checkHighest()
        req.highest = parseInt(check, 16)
    }
    if (connections[req.body.userId]) {
        req.connection = connections[req.body.userId].connection
        req.dbName = connections[req.body.userId].dbName
        mongoose.connection.useDb(req.connection.dbName)
    }
    next()
}

const attachCombatExtras = async (req, res, next) => {
    if (!req.combatExtras) {
        const CombatExtras = req.connection.model('CombatExtras', CombatExtrasSchema)
        req.combatExtras = await CombatExtras.findOne()
    }
    next()
}

const attachGlobalExperiences = async (req, res, next) => {
    if (!req.globalExperiences) {
        const GlobalExperiences = req.connection.model('GlobalExperiences', GlobalExperiencesSchema)
        req.globalExperiences = await GlobalExperiences.findOne()
    }
    next()
}

const attachExtraStats = async (req, res, next) => {
    if (!req.ExtraStats) {
        const ExtraStats = req.connection.model('ExtraStats', ExtraStatsSchema)
        req.ExtraStats = await ExtraStats.findOne()
    }
    next()
}

const attachGlobalWeaponTypes = async (req, res, next) => {
    if (!req.weaponTypes) {
        const GlobalWeaponTypes = req.connection.model('GlobalWeaponTypes', GlobalWeaponTypesSchema)
        req.weaponTypes = await GlobalWeaponTypes.findOne()
    }
    next()
}

const setConnection = async (req, res, next) => {
    console.log("setConnection", req.body)
    if (!req.body.userId) {
        return res.status(400).json({success: false, message: 'No user ID provided'})
    }

    if (!connections[req.body.userId]) {
        let dbName = storedConnections[req.body.userId] ||  "_trdb_" + req.body.userId
        let connection = await mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true, retryReads: true, retryWrites: true, dbName: dbName })
        connections[req.body.userId] = {
            connection: connection,
            dbName: dbName,
            db: mongoose.connection.useDb(dbName),
            ip: Buffer.from(req.ip).toString('base64')
        }
        console.log('Database Connected')
        await init(connection)

        storedConnections[req.body.userId] = dbName
        fs.writeFileSync(connectionsFilePath, JSON.stringify(storedConnections))
    }

    req.connection = connections[req.body.userId].connection
    next()
}

app.use(setConnection, attachHighest, attachCombatExtras, attachGlobalExperiences, attachExtraStats, attachGlobalWeaponTypes)

app.get('/', async (req, res) => {
    res.status(200).json({success: true, message: 'Server is running'})
})

app.post('/', async (req, res) => {
    if (!req.body.userId){
        return res.status(400).json({success: false, message: 'No user ID provided'})
    }
    if (!req.body.key){
        return res.status(400).json({success: false, message: 'No key provided'})
    }

    if (connections[req.body.userId] && req.body.key + '-' + process.env.HANDSHAKE_KEY === process.env.FULL_HANDSHAKE_KEY){
        return res.status(200).json({success: true, message: connections[req.body.userId].dbName})
    } 
    else {
        return res.status(500).json({success: false, message: 'Unable to establish a connection'})
    }
})

app.post('/data', async (req, res) => {
    console.log("POST to /data", req.body)
    if (!req.body.userId){
        console.log('No user ID provided')
        return res.status(400).json({success: false, message: 'No user ID provided'})
    }
    if (!req.body.key){
        console.log('No key provided')
        return res.status(400).json({success: false, message: 'No key provided'})
    }
    if (!req.body.actions){
        console.log('No data provided')
        return res.status(400).json({success: false, message: 'No data provided'})
    }
    if (connections[req.body.userId] && (req.body.key + '-' + process.env.HANDSHAKE_KEY) === process.env.FULL_HANDSHAKE_KEY){
        let db = connections[req.body.userId].db
        let actions = req.body.actions.actions || req.body.actions
        actions.forEach(async action => {
        let method = action.method
        await Map(action.model, method, req, res)
        })
    } 
    else {
        return res.status(500).json({success: false, message: 'Unable to establish a connection'})
    }
})

const init = async(connection) => {
    try {
        const CombatExtras = connection.model('CombatExtras', CombatExtrasSchema)
        let combatExtras = await CombatExtras.findOne({})
        if (!combatExtras) {
            await CombatExtras.create({})
        }

        const GlobalExperiences = connection.model('GlobalExperiences', GlobalExperiencesSchema)
        let globalExperiences = await GlobalExperiences.findOne({})
        if (!globalExperiences) {
            await GlobalExperiences.create({})
        }

        const ExtraStats = connection.model('ExtraStats', ExtraStatsSchema)
        let extraStats = await ExtraStats.findOne({})
        if (!extraStats) {
            await ExtraStats.create({})
        }

        const GlobalWeaponTypes = connection.model('GlobalWeaponTypes', GlobalWeaponTypesSchema)
        let globalWeaponTypes = await GlobalWeaponTypes.findOne({})
        if (!globalWeaponTypes) {
            await GlobalWeaponTypes.create({})
        }

    } catch (err) {
        console.error(err)
    }
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})