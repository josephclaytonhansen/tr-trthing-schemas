import asyncHandler from '../../middleware/asyncHandler.js'

import objectConsumableSchema from '../../../things/objects/objectConsumable.js'

import {uid} from '../../functions/data_management/hexuids.js' 

const getObjectConsumables = asyncHandler(async (req, res) => {
    const ObjectConsumable = req.connection.model('ObjectConsumable', objectConsumableSchema)
    const objectConsumables = await ObjectConsumable.find({})
    const objectConsumablesJson = objectConsumables.map(objectConsumable => objectConsumable.toJSON(req.combatExtras))
    res.json(objectConsumablesJson)
})

const createObjectConsumable = asyncHandler(async (req, res) => {
    const ObjectConsumable = req.connection.model('ObjectConsumable', objectConsumableSchema)
    req.highest++
    req.body.id = await uid(req.highest)
    const objectConsumable = await ObjectConsumable.create(req.body)
    res.json(objectConsumable.toJSON(req.combatExtras))
})

const getObjectConsumable = asyncHandler(async (req, res) => {
    const ObjectConsumable = req.connection.model('ObjectConsumable', objectConsumableSchema)
    const objectConsumable = await ObjectConsumable.findOne({
        id: req.body.id
    })

    if (!objectConsumable) {
        res.status(404)
        throw new Error('Object Consumable not found')
    }
    
    res.json(objectConsumable)
})

const updateObjectConsumable = asyncHandler(async (req, res) => {
    const ObjectConsumable = req.connection.model('ObjectConsumable', objectConsumableSchema)
    let body = req.body.actions.actions[req.body.index].body
    await ObjectConsumable.findOneAndUpdate({id: body.id}, body).then( async(objectConsumable) => {
        await objectConsumable.save()
        res.json({success: true, message: 'Object Consumable updated'})} ).catch( (err) => {
        res.json({success: false, message: 'Error updating object consumable'})    
    })
})

const deleteObjectConsumable = asyncHandler(async (req, res) => {
    const ObjectConsumable = req.connection.model('ObjectConsumable', objectConsumableSchema)
    await ObjectConsumable.findOneAndDelete({id:req.body.id}).then( () => {
        res.json({success: true, message: 'Object Consumable deleted'})
    }).catch( (err) => {
        res.json({success: false, message: 'Error deleting object consumable'})
    })
})

export {
    getObjectConsumables,
    createObjectConsumable,
    getObjectConsumable,
    updateObjectConsumable,
    deleteObjectConsumable
}