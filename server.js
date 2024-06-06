import mongoose from 'mongoose'
import dotenv from 'dotenv'
import generateDbName from './server/functions/database_management/projectdb.js'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

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
import unit from './server/things_routes/person/person_routes.js'
import CombatExtrasSchema from './things/globalSettings/combat/combatextras.js'
import GlobalExperiencesSchema from './things/globalSettings/experiences.js'
import ExtraStatsSchema from './things/globalSettings/extrastats.js'
import GlobalWeaponTypesSchema from './things/globalSettings/weapontypes.js'
import combatExtrasRoutes from './server/things_routes/globalSettings/combatextras_routes.js'
import globalExperiencesRoutes from './server/things_routes/globalSettings/experiences_routes.js'
import extraStatsRoutes from './server/things_routes/globalSettings/extrastats_routes.js'
import weaponTypesRoutes from './server/things_routes/globalSettings/weapontypes_routes.js'
import SkillRoutes from './server/things_routes/person_adjacents/skills/skill_routes.js'
import UnitClassRoutes from './server/things_routes/person_adjacents/classes/unitclasses_routes.js'
import {checkHighest} from './server/functions/data_management/hexuids.js'

const app = express()
const port = 9194

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const attachHighest = async (req, res, next) => {
    if (!req.userId) {
        req.userId = Buffer.from(req.ip).toString('base64')
    }
    if (!req.highest) {
        let check = await checkHighest()
        req.highest = parseInt(check, 16)
    }
    if (connections[req.userId]) {
        req.connection = connections[req.userId].connection
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
    if (!req.userId) {
        req.userId = Buffer.from(req.ip).toString('base64')
    }

    if (!connections[req.userId]) {
        let dbName = storedConnections[req.userId] || generateDbName()
        let connection = await mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true, retryReads: true, retryWrites: true, dbName: dbName })
        connections[req.userId] = {
            connection: connection,
            dbName: dbName,
            db: mongoose.connection.useDb(dbName),
            ip: Buffer.from(req.ip).toString('base64')
        }
        console.log('Database Connected')
        await init(connection)

        storedConnections[req.userId] = dbName
        fs.writeFileSync(connectionsFilePath, JSON.stringify(storedConnections))
    }

    req.connection = connections[req.userId].connection
    next()
}

app.use(setConnection, attachHighest, attachCombatExtras, attachGlobalExperiences, attachExtraStats, attachGlobalWeaponTypes)
app.use('/unit', unit)
app.use('/combatextras', combatExtrasRoutes)
app.use('/globalexperiences', globalExperiencesRoutes)
app.use('/extrastats', extraStatsRoutes)
app.use('/weapontypes', weaponTypesRoutes)
app.use('/skills', SkillRoutes)
app.use('/unitclasses', UnitClassRoutes)


app.get('/', async (req, res) => {
    if (!req.userId){
        return res.status(400).json({success: false, message: 'No user ID provided'})
    }

    if (connections[req.userId]){
        return res.status(200).json({success: true, message: 'Connected to ' + connections[req.userId].dbName})
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