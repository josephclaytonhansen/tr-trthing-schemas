import asyncHandler from '../../../middleware/asyncHandler.js'

import IconSchema from '../../../../things/graphics/icons/icon.js'
import ImageSchema from '../../../../things/graphics/images/images.js'

const getIcons = asyncHandler(async (req, res) => {
    const Icon = req.connection.model('Icon', IconSchema)
    const icons = await Icon.find()
    const Image = req.connection.model('Image', ImageSchema)
    res.json(icons)
})

const getIcon = asyncHandler(async (req, res) => {
    const Icon = req.connection.model('Icon', IconSchema)
    const icon = await Icon.findOne({id: req.body.id})
    res.json(icon)
})

const getIconByName = asyncHandler(async (req, res) => {
    const Icon = req.connection.model('Icon', IconSchema)
    const icon = await Icon.findOne({name: req.body.name})
    res.json(icon)
})

const createIcon = asyncHandler(async (req, res) => {
    const Icon = req.connection.model('Icon', IconSchema)
    const icon = new Icon(req.body)
    await icon.save()
    res.json(icon)
})

const updateIcon = asyncHandler(async (req, res) => {
    console.log('updating icon', req.body.actions.actions)
    const Icon = req.connection.model('Icon', IconSchema)
    const icon = await Icon.findOne({id: req.body.id})
    console.log(icon)
    icon.components = req.body.actions.actions[req.body.index].body.components
    await icon.save()
    res.json(icon)
})

export {
    getIcons,
    getIcon,
    getIconByName,
    createIcon,
    updateIcon
}