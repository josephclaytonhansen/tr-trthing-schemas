import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import {uid} from '../../server/functions/data_management/hexuids.js'

const objectConsumableSchema = new Schema({
    id: String,
    name: {
        type: String,
        required: true,
        default: 'New Consumable'
    },
    uses: {
        type: Number,
        default: 1
    },
    flavorText: {
        type: String,
        default: 'A consumable item'
    },
    scope: {
        type: String,
        enum: ['combat', 'map', 'any'],
        default: 'both'
    },
    icon: {
        type: String,
        default: ''
    },
    sellPrice: {
        type: Number,
        default: 0
    },
    buyPrice: {
        type: Number,
        default: 0
    },
    sellable: {
        type: Boolean,
        default: true
    },
    buyable: {
        type: Boolean,
        default: true
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

export default objectConsumableSchema