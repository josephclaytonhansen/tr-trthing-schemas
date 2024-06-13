import asyncHandler from '../../middleware/asyncHandler.js'
import ExtraStats from '../../../things/globalSettings/extrastats.js'

const getExtraStats = asyncHandler(async (req, res) => {
    const extrastats = await ExtraStats.find().limit(1).populate()
    res.json(extrastats)
})

const updateExtraStats = asyncHandler(async (req, res) => {
    await ExtraStats.findOneAndUpdate({}, req.body).populate()
    res.status(201).json({success: true, message: 'ExtraStats updated'})
})


export {
    getExtraStats,
    updateExtraStats
}