import asyncHandler from '../../middleware/asyncHandler.js'
import GlobalWeaponTypesSchema from '../../../things/globalSettings/weapontypes.js'

const getGlobalWeaponTypes = asyncHandler(async (req, res) => {
    const GlobalWeaponTypes = req.connection.model('GlobalWeaponTypes', GlobalWeaponTypesSchema)
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
