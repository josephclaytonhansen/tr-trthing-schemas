import asyncHandler from '../../middleware/asyncHandler.js'
import ExtraStats from '../../../things/globalSettings/extrastats.js'

import express from 'express'
const router = express.Router()

const getExtraStats = asyncHandler(async (req, res) => {
    const extrastats = await ExtraStats.find().limit(1).populate()
    res.json(extrastats)
})

const updateExtraStats = asyncHandler(async (req, res) => {
    const extrastats = await ExtraStats.findOneAndUpdate({}, req.body).populate()
    res.status(201).json({success: true, message: 'ExtraStats updated'})
})

router.route('/').get(getExtraStats)
router.route('/').put(updateExtraStats)