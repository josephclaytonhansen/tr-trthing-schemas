import asyncHandler from '../../middleware/asyncHandler.js'

import ImageSchema from '../../../things/graphics/images/images.js'

const getImagesByType = asyncHandler(async (req, res) => {
    const Image = req.connection.model('Image', ImageSchema)
    const images = await Image.find({type: req.body.type})
    res.json(images)
})

const getImagesByAssetPack = asyncHandler(async (req, res) => {
    const Image = req.connection.model('Image', ImageSchema)
    const images = await Image.find({assetPack: req.body.assetPack})
    res.json(images)
})

const getImage = asyncHandler(async (req, res) => {
    const Image = req.connection.model('Image', ImageSchema)
    const image = await Image.findOne({name: req.body.name, assetPack: req.body.assetPack})
    res.json(image)
})

export {
    getImagesByType,
    getImagesByAssetPack,
    getImage
}