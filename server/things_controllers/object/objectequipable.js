import asyncHandler from '../../middleware/asyncHandler.js'

import objectEquipableSchema from '../../../things/objects/objectEquipable.js'

import {uid} from '../../functions/data_management/hexuids.js' 

const getObjectEquipables = asyncHandler(async (req, res) => {
    const ObjectEquipable = req.connection.model('ObjectEquipable', objectEquipableSchema)
    const objectEquipables = await ObjectEquipable.find({})
    const objectEquipablesJson = objectEquipables.map(objectEquipable => objectEquipable.toJSON(req.combatExtras))
    res.json(objectEquipablesJson)
})

const createObjectEquipable = asyncHandler(async (req, res) => {
    const ObjectEquipable = req.connection.model('ObjectEquipable', objectEquipableSchema)
    req.highest++
    req.body.id = await uid(req.highest)
    const objectEquipable = await ObjectEquipable.create(req.body)
    res.json(objectEquipable.toJSON(req.combatExtras))
})

const getObjectEquipable = asyncHandler(async (req, res) => {
    const ObjectEquipable = req.connection.model('ObjectEquipable', objectEquipableSchema)
    const objectEquipable = await ObjectEquipable.findOne({
        id: req.body.id
    })

    if (!objectEquipable) {
        res.status(404)
        throw new Error('Object Equipable not found')
    }
    
    res.json(objectEquipable)
})

const updateObjectEquipable = asyncHandler(async (req, res) => {
    const ObjectEquipable = req.connection.model('ObjectEquipable', objectEquipableSchema)
    let body = req.body.actions.actions[req.body.index].body
    await ObjectEquipable.findOneAndUpdate({id: body.id}, body).then( async(objectEquipable) => {
        await objectEquipable.save()
        res.json({success: true, message: 'Object Equipable updated'})} ).catch( (err) => {
        res.json({success: false, message: 'Error updating object equipable'})    
    })
})

const deleteObjectEquipable = asyncHandler(async (req, res) => {
    const ObjectEquipable = req.connection.model('ObjectEquipable', objectEquipableSchema)
    await ObjectEquipable.findOneAndDelete({id:req.body.id}).then( () => {
        res.json({success: true, message: 'Object Equipable deleted'})
    }).catch( (err) => {
        res.json({success: false, message: 'Error deleting object equipable'})
    })
})

export {
    getObjectEquipables,
    createObjectEquipable,
    getObjectEquipable,
    updateObjectEquipable,
    deleteObjectEquipable
}