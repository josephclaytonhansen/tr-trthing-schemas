import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import {uid} from '../../server/functions/data_management/hexuids.js'

const objectWeaponSchema = new Schema({
    id: String,
    subtype: {type: String, default: 'Weapon', enum: ['Weapon', 'Magic']},
    name: {
        type: String,
        required: true,
        default: 'New Weapon'
    },
    weaponType: {
        type: String,
    },
    magicType: {
        type: String,
    },
    minAptitude: {
        type: String,
        default: 'E'
    },
    hasUses: {
        type: Boolean,
        default: true
    },
    maxUses: {
        type: Number,
        default: 20
    },
    replenishUsesAfterBattleAmount: {
        type: String,
        enum: ['full', 'half', 'quarter', 'none'],
        default: 'none'
    },
    flavorText: {
        type: String,
        default: 'A consumable item'
    },
    scope: {
        type: String,
        enum: ['combat', 'map', 'both'],
        default: 'both'
    },
    icon: {
        type: String,
        default: ''
    },
    sellPrice: {
        type: Number,
        default: 75
    },
    buyPrice: {
        type: Number,
        default: 100
    },
    sellable: {
        type: Boolean,
        default: true
    },
    buyable: {
        type: Boolean,
        default: true
    },
    sellPriceDeductedPerUse: {
        type: Number,
        default: 2
    },
    repairable: {
        type: Boolean,
        default: false
    },
    repairPricePerUse: {
        type: Number,
        default: 0
    },
    repairNeedsItems: {
        type: Boolean,
        default: false
    },
    repairItem: {
        type: Schema.Types.ObjectId,
        ref: 'ObjectConsumable'
    },
    forgeable: {
        type: Boolean,
        default: false
    },
    forgeInto: {
        type: [Schema.Types.ObjectId],
        ref: 'ObjectConsumable'
    },
    forgePrices: {
        type: [Number],
        default: []
    },
    forgeNeedsItems: {
        type: Boolean,
        default: false
    },
    forgeItems: {
        type: [Schema.Types.ObjectId],
        ref: 'ObjectConsumable'
    },
    lowerRange: {
        type: Number,
        default: 0
    },
    upperRange: {
        type: Number,
        default: 0
    },
    rangeAdjustedByStat: {
        type: Boolean,
        default: false
    },
    rangeAdjustedByStatName: {
        type: String,
        default: ''
    },
    rangeAdjustedByDivisor: {
        type: Number,
        default: 1
    },
    effectsAtStartOfTurn: {
        type: Object,
        default: {}
    },
    effectsAtStartOfCombat: {
        type: Object,
        default: {}
    },
    effectsAfterCombat: {
        type: Object,
        default: {}
    },
    otherEffects: {
        type: Object,
        default: {}
    }
})

export default objectWeaponSchema