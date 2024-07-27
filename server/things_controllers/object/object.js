import asyncHandler from '../../middleware/asyncHandler.js'

import ObjectSchema from '../../../things/objects/object.js'
import {
    uid
} from '../../functions/data_management/hexuids.js'

const getObject = asyncHandler(async (req, res) => {
    const Object = req.connection.model('Object', ObjectSchema)
    const object = await Object.findOne({
        id: req.body.id
    })
    if (!object) {
        res.status(404)
        throw new Error('Object not found')
    }
    res.json(object.toJSON())
})

const getObjects = asyncHandler(async (req, res) => {
    const Object = req.connection.model('Object', ObjectSchema)
    const objects = await Object.find({})
    const objectsJson = objects.map(object => object.toJSON())
    res.json(objectsJson)
})

const createObject = asyncHandler(async (req, res) => {
    const Object = req.connection.model('Object', ObjectSchema)
    req.highest++
    req.body.id = await uid(req.highest)
    const object = await Object.create(req.body)
    res.json(object.toJSON())
})

const deleteObject = asyncHandler(async (req, res) => {
    const Object = req.connection.model('Object', ObjectSchema)
    try {
        await Object.findOneAndDelete({
            id: body.id
        })
        res.json({
            success: true,
            message: 'Object deleted'
        })
    } catch (err) {
        res.json({
            success: false,
            message: 'Error deleting object'
        })

    }
})

const updateObject = asyncHandler(async (req, res) => {
    const Object = req.connection.model('Object', ObjectSchema)
    await Object.findOneAndUpdate({
        id: req.body.id
    }, req.body).then(async (object) => {
        await object.save()
        res.json({
            success: true,
            message: 'Object updated'
        })
    }).catch((err) => {
        res.json({
            success: false,
            message: 'Error updating object'
        })
    })
})

export {
    getObject,
    getObjects,
    createObject,
    deleteObject,
    updateObject
}