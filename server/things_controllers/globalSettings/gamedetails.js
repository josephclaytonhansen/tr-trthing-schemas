import asyncHandler from '../../middleware/asyncHandler.js'
import GameDetailsSchema from '../../../things/globalSettings/gamedetails.js'

const getGameDetails = asyncHandler(async (req, res) => {
    console.log('getGameDetails')
    const GameDetails = req.connection.model('GameDetails', GameDetailsSchema)
    const gamedetails = await GameDetails.find().limit(1)
    res.json(gamedetails)
})

const updateGameDetails = asyncHandler(async (req, res) => {
    console.log('updateGameDetails')
    let body = req.body.actions.actions[req.body.index].body
    console.log(body)
    const GameDetails = req.connection.model('GameDetails', GameDetailsSchema)
    await GameDetails.findOneAndUpdate({}, body)
    console.log('GameDetails updated')
    res.status(200).json({success: true})
})

export {
    getGameDetails,
    updateGameDetails
}
