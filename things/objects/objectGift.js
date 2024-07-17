import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import {uid} from '../../server/functions/data_management/hexuids.js'

const objectGiftSchema = new Schema({
    id: String,
    name: {
        type: String,
        required: true,
        default: 'New Gift Item'
    },
    flavorText: {
        type: String,
        default: 'A gift item'
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
    giftRank: {
        type: Number,
        default: 1,
        enum: [1, 2, 3, 4, 5]
    },
})

export default objectGiftSchema