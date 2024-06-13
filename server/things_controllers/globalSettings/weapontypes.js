import asyncHandler from '../../middleware/asyncHandler.js'
import GlobalWeaponTypes from '../../../things/globalSettings/weapontypes.js'

const getGlobalWeaponTypes = asyncHandler(async (req, res) => {
    const weapontypes = await GlobalWeaponTypes.find().limit(1).populate()
    res.json(weapontypes)
})

const updateGlobalWeaponTypes = asyncHandler(async (req, res) => {
    await GlobalWeaponTypes.findOneAndUpdate({}, req.body).populate()
    res.status(201).json({success: true, message: 'GlobalWeaponTypes updated'})
})

export {
    getGlobalWeaponTypes,
    updateGlobalWeaponTypes
}
