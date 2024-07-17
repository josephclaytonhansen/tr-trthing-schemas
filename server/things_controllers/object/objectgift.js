import asyncHandler from '../../middleware/asyncHandler.js'

import objectGiftSchema from '../../../things/objects/objectGift.js'

import {uid} from '../../functions/data_management/hexuids.js' 

const getObjectGifts = asyncHandler(async (req, res) => {
    const ObjectGift = req.connection.model('ObjectGift', objectGiftSchema)
    const objectGifts = await ObjectGift.find({})
    const objectGiftsJson = objectGifts.map(objectGift => objectGift.toJSON(req.combatExtras))
    res.json(objectGiftsJson)
})

const createObjectGift = asyncHandler(async (req, res) => {
    const ObjectGift = req.connection.model('ObjectGift', objectGiftSchema)
    req.highest++
    req.body.id = await uid(req.highest)
    const objectGift = await ObjectGift.create(req.body)
    res.json(objectGift.toJSON(req.combatExtras))
})

const getObjectGift = asyncHandler(async (req, res) => {
    const ObjectGift = req.connection.model('ObjectGift', objectGiftSchema)
    const objectGift = await ObjectGift.findOne({
        id: req.body.id
    })

    if (!objectGift) {
        res.status(404)
        throw new Error('Object Gift not found')
    }
    
    res.json(objectGift)
})

const updateObjectGift = asyncHandler(async (req, res) => {
    const ObjectGift = req.connection.model('ObjectGift', objectGiftSchema)
    let body = req.body.actions.actions[req.body.index].body
    await ObjectGift.findOneAndUpdate({id: body.id}, body).then( async(objectGift) => {
        await objectGift.save()
        res.json({success: true, message: 'Object Gift updated'})} ).catch( (err) => {
        res.json({success: false, message: 'Error updating object gift'})    
    })
})

const deleteObjectGift = asyncHandler(async (req, res) => {
    const ObjectGift = req.connection.model('ObjectGift', objectGiftSchema)
    await ObjectGift.findOneAndDelete({id:req.body.id}).then( () => {
        res.json({success: true, message: 'Object Gift deleted'})
    }).catch( (err) => {
        res.json({success: false, message: 'Error deleting object gift'})
    })
})

export {
    getObjectGifts,
    createObjectGift,
    getObjectGift,
    updateObjectGift,
    deleteObjectGift
}