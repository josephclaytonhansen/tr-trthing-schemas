import asyncHandler from '../../middleware/asyncHandler.js'

import objectConsumableSchema from '../../../things/objects/objectConsumable.js'
import objectEquipableSchema from '../../../things/objects/objectEquipable.js'
import objectGiftSchema from '../../../things/objects/objectGift.js'
import objectWeaponSchema from '../../../things/objects/objectWeapon.js'

import { createObjectConsumable } from './objectconsumable.js'
import { createObjectEquipable } from './objectequipable.js'
import { createObjectGift } from './objectgift.js'
import { createObjectWeapon } from './objectweapon.js'

import {uid} from '../../functions/data_management/hexuids.js' 

const getObjects = asyncHandler(async (req, res) => {
    let returns = {}
    const ObjectConsumable = req.connection.model('ObjectConsumable', objectConsumableSchema)
    const objectConsumables = await ObjectConsumable.find({})
    const objectConsumablesJson = objectConsumables.map(objectConsumable => objectConsumable.toJSON(req.combatExtras))
    returns.objectConsumables = objectConsumablesJson
    const ObjectEquipable = req.connection.model('ObjectEquipable', objectEquipableSchema)
    const objectEquipables = await ObjectEquipable.find({})
    const objectEquipablesJson = objectEquipables.map(objectEquipable => objectEquipable.toJSON(req.combatExtras))
    returns.objectEquipables = objectEquipablesJson
    const ObjectGift = req.connection.model('ObjectGift', objectGiftSchema)
    const objectGifts = await ObjectGift.find({})
    const objectGiftsJson = objectGifts.map(objectGift => objectGift.toJSON(req.combatExtras))
    returns.objectGifts = objectGiftsJson
    const ObjectWeapon = req.connection.model('ObjectWeapon', objectWeaponSchema)
    const objectWeapons = await ObjectWeapon.find({})
    const objectWeaponsJson = objectWeapons.map(objectWeapon => objectWeapon.toJSON(req.combatExtras))
    returns.objectWeapons = objectWeaponsJson
    res.json(returns)
})

const updateObjectSubtype = asyncHandler(async (req, res) => {
    let body = req.body.actions.actions[req.body.index].body

    let newType = body.subtype

    let oldType = body.oldSubtype

    switch (oldType) {
        case 'consumable':
            const ObjectConsumable = req.connection.model('ObjectConsumable', objectConsumableSchema)
            await ObjectConsumable.findOneAndDelete({id: body.id})
            break
        case 'equipable':
            const ObjectEquipable = req.connection.model('ObjectEquipable', objectEquipableSchema)
            await ObjectEquipable.findOneAndDelete({id: body.id})
            break
        case 'gift':
            const ObjectGift = req.connection.model('ObjectGift', objectGiftSchema)
            await ObjectGift.findOneAndDelete({id: body.id})
            break
        case 'weapon':
            const ObjectWeapon = req.connection.model('ObjectWeapon', objectWeaponSchema)
            await ObjectWeapon.findOneAndDelete({id: body.id})
            break
    }

    switch (newType) {
        case 'consumable':
            createObjectConsumable(req, res)
            break
        case 'equipable':
            createObjectEquipable(req, res)
            break
        case 'gift':
            createObjectGift(req, res)
            break
        case 'weapon':
            createObjectWeapon(req, res)
            break
        default:
            res.json({success: false, message: 'Error changing object type'})
    }


})

export {getObjects, updateObjectSubtype}
