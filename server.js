import db from './server/db.js'
import express from 'express'
import unit from './server/things_routes/person/person_routes.js'
import CombatExtras from './things/globalSettings/combatextras.js'
import GlobalExperiences from './things/globalSettings/experiences.js'
import ExtraStats from './things/globalSettings/extrastats.js'
import combatExtrasRoutes from './server/things_routes/globalSettings/combatextras_routes.js'
import globalExperiencesRoutes from './server/things_routes/globalSettings/experiences_routes.js'
import extraStatsRoutes from './server/things_routes/globalSettings/extrastats_routes.js'
import SkillRoutes from './server/things_routes/person_adjacents/skills/skill_routes.js'

const app = express()
const port = 9194

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
    if (!req.extraStats) {
        req.extraStats = await ExtraStats.findOne()
    }
    next()
}

app.use(express.json())

app.use(attachCombatExtras, attachGlobalExperiences, attachExtraStats)
app.use('/unit', unit)
app.use('/combatextras', combatExtrasRoutes)
app.use('/globalexperiences', globalExperiencesRoutes)
app.use('/extrastats', extraStatsRoutes)
app.use('/skills', SkillRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})