import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import {uid} from '../../server/functions/data_management/hexuids.js'

const objectEquipableSchema = new Schema({
    id: String,
    subtype: {type: String, default: 'Equipable'},
    name: {
        type: String,
        required: true,
        default: 'New Equipable'
    },
    flavorText: {
        type: String,
        default: 'An equipable item'
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
    statEffects: {
        type: Object,
        default: {}
    },
    otherEffects: {
        type: Object,
        default: {}
    }
})

export default objectEquipableSchema