import asyncHandler from '../../middleware/asyncHandler.js'

import objectWeaponSchema from '../../../things/objects/objectWeapon.js'

import {uid} from '../../functions/data_management/hexuids.js' 

const getObjectWeapons = asyncHandler(async (req, res) => {
    const ObjectWeapon = req.connection.model('ObjectWeapon', objectWeaponSchema)
    const objectWeapons = await ObjectWeapon.find({})
    const objectWeaponsJson = objectWeapons.map(objectWeapon => objectWeapon.toJSON(req.combatExtras))
    res.json(objectWeaponsJson)
})

const createObjectWeapon = asyncHandler(async (req, res) => {
    const ObjectWeapon = req.connection.model('ObjectWeapon', objectWeaponSchema)
    req.highest++
    req.body.id = await uid(req.highest)
    const objectWeapon = await ObjectWeapon.create(req.body)
    res.json(objectWeapon.toJSON(req.combatExtras))
})

const getObjectWeapon = asyncHandler(async (req, res) => {
    const ObjectWeapon = req.connection.model('ObjectWeapon', objectWeaponSchema)
    const objectWeapon = await ObjectWeapon.findOne({
        id: req.body.id
    })

    if (!objectWeapon) {
        res.status(404)
        throw new Error('Object Weapon not found')
    }
    
    res.json(objectWeapon)
})

const updateObjectWeapon = asyncHandler(async (req, res) => {
    const ObjectWeapon = req.connection.model('ObjectWeapon', objectWeaponSchema)
    let body = req.body.actions.actions[req.body.index].body
    await ObjectWeapon.findOneAndUpdate({id: body.id}, body).then( async(objectWeapon) => {
        await objectWeapon.save()
        res.json({success: true, message: 'Object Weapon updated'})} ).catch( (err) => {
        res.json({success: false, message: 'Error updating object weapon'})    
    })
})

const deleteObjectWeapon = asyncHandler(async (req, res) => {
    const ObjectWeapon = req.connection.model('ObjectWeapon', objectWeaponSchema)
    await ObjectWeapon.findOneAndDelete({id:req.body.id}).then( () => {
        res.json({success: true, message: 'Object Weapon deleted'})
    }).catch( (err) => {
        res.json({success: false, message: 'Error deleting object weapon'})
    })
})

export {
    getObjectWeapons,
    createObjectWeapon,
    getObjectWeapon,
    updateObjectWeapon,
    deleteObjectWeapon
}