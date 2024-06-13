import asyncHandler from '../../middleware/asyncHandler.js'
import CombatExtras from '../../../things/globalSettings/combat/combatextras.js'

const getCombatExtras = asyncHandler(async (req, res) => {
    const combatextras = await CombatExtras.find().limit(1).populate()
    res.json(combatextras)
})

const updateCombatExtras = asyncHandler(async (req, res) => {
    const combatextras = await CombatExtras.findOneAndUpdate({}, req.body).populate()
    res.status(201).json({success: true, message: 'CombatExtras updated'})
})

export {
    getCombatExtras,
    updateCombatExtras
}
