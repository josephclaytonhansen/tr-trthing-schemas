import asyncHandler from '../../middleware/asyncHandler.js'
import CombatExtras from '../../../things/globalSettings/combatextras.js'

import express from 'express'
const router = express.Router()

const getCombatExtras = asyncHandler(async (req, res) => {
    const combatextras = await CombatExtras.find().limit(1).populate()
    res.json(combatextras)
})

const updateCombatExtras = asyncHandler(async (req, res) => {
    const combatextras = await CombatExtras.findOneAndUpdate({}, req.body).populate()
    res.status(201).json({success: true, message: 'CombatExtras updated'})
})

router.route('/').get(getCombatExtras).put(updateCombatExtras)
export default router