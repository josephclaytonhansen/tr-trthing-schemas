import asyncHandler from '../../middleware/asyncHandler.js'
import GlobalMagicTypesSchema from '../../../things/globalSettings/magictypes.js'

const getGlobalMagicTypes = asyncHandler(async (req, res) => {
    const GlobalMagicTypes = req.connection.model('GlobalMagicTypes', GlobalMagicTypesSchema)
    const magictypes = await GlobalMagicTypes.find().limit(1).populate()
    res.json(magictypes)
})

const updateGlobalMagicTypes = asyncHandler(async (req, res) => {
    const GlobalMagicTypes = req.connection.model('GlobalMagicTypes', GlobalMagicTypesSchema)
    await GlobalMagicTypes.findOneAndUpdate({}, req.body).populate()
    res.status(201).json({success: true, message: 'GlobalMagicTypes updated'})
})

export {
    getGlobalMagicTypes,
    updateGlobalMagicTypes
}
