import asyncHandler from '../../middleware/asyncHandler.js'
import GeneralSettingsSchema from '../../../things/globalSettings/general.js'

const getGeneralSettings = asyncHandler(async (req, res) => {
    console.log('getGeneralSettings')
    const GeneralSettings = req.connection.model('GeneralSettings', GeneralSettingsSchema)
    const generalsettings = await GeneralSettings.find().limit(1)
    res.json(generalsettings)
})

const updateGeneralSettings = asyncHandler(async (req, res) => {
    console.log('updateGeneralSettings')
    let body = req.body.actions.actions[req.body.index].body
    console.log(body)
    const GeneralSettings = req.connection.model('GeneralSettings', GeneralSettingsSchema)
    await GeneralSettings.findOneAndUpdate({}, body)
    console.log('GeneralSettings updated')
    res.status(200).json({success: true})
})

export {
    getGeneralSettings,
    updateGeneralSettings
}