import db from './server/db.js'
import express from 'express'
import unit from './server/things_routes/person/person_routes.js'
import CombatExtras from './things/globalSettings/combat/combatextras.js'
import GlobalExperiences from './things/globalSettings/experiences.js'
import ExtraStats from './things/globalSettings/extrastats.js'
import GlobalWeaponTypes from './things/globalSettings/weapontypes.js'
import combatExtrasRoutes from './server/things_routes/globalSettings/combatextras_routes.js'
import globalExperiencesRoutes from './server/things_routes/globalSettings/experiences_routes.js'
import extraStatsRoutes from './server/things_routes/globalSettings/extrastats_routes.js'
import weaponTypesRoutes from './server/things_routes/globalSettings/weapontypes_routes.js'
import SkillRoutes from './server/things_routes/person_adjacents/skills/skill_routes.js'
import UnitClassRoutes from './server/things_routes/person_adjacents/classes/unitclasses_routes.js'
import {checkHighest} from './server/functions/hexuids.js'

const app = express()
const port = 9194

app.use(express.json())

const attachHighest = async (req, res, next) => {
    if (!req.highest) {
        let check = await checkHighest()
        req.highest = parseInt(check, 16)
    }
    next()

}

const attachCombatExtras = async (req, res, next) => {
    if (!req.combatExtras) {
        req.combatExtras = await CombatExtras.findOne()
    }
    next()
}

const attachGlobalExperiences = async (req, res, next) => {
    if (!req.globalExperiences) {
        req.globalExperiences = await GlobalExperiences.findOne()
    }
    next()
}

const attachExtraStats = async (req, res, next) => {
    if (!req.ExtraStats) {
        req.ExtraStats = await ExtraStats.findOne()
    }
    next()
}

const attachGlobalWeaponTypes = async (req, res, next) => {
    if (!req.weaponTypes) {
        req.weaponTypes = await GlobalWeaponTypes.findOne()
    }
    next()

}

app.use(attachCombatExtras, attachGlobalExperiences, attachExtraStats, attachGlobalWeaponTypes, attachHighest)
app.use('/unit', unit)
app.use('/combatextras', combatExtrasRoutes)
app.use('/globalexperiences', globalExperiencesRoutes)
app.use('/extrastats', extraStatsRoutes)
app.use('/weapontypes', weaponTypesRoutes)
app.use('/skills', SkillRoutes)
app.use('/unitclasses', UnitClassRoutes)

const init = async() => {
    try {
        let combatExtras = await CombatExtras.findOne({});
        if (!combatExtras) {
            await CombatExtras.create({});
        }

        let globalExperiences = await GlobalExperiences.findOne({});
        if (!globalExperiences) {
            await GlobalExperiences.create({});
        }

        let extraStats = await ExtraStats.findOne({});
        if (!extraStats) {
            await ExtraStats.create({});
        }

        let globalWeaponTypes = await GlobalWeaponTypes.findOne({});
        if (!globalWeaponTypes) {
            await GlobalWeaponTypes.create({});
        }

    } catch (err) {
        console.error(err)
    }
}

init()

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})