import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const EnemySchema = new Schema({
    owner: String,
    id: String,
    baseStats: {
        type: Object,
    },
    currentStats: {
        type: Object,
    },
    statGrowths: {
        type: Object,
    },
    skills: {
        type: Array,
    },
    experiences: {
        type: Object,
    },
    level: Number,
    unitClass: {
        ref: 'UnitClass',
        type: Schema.Types.ObjectId
    },
    exp: Number,
    battalion: {
        ref: 'Battalion',
        type: Schema.Types.ObjectId
    },
    unique: Boolean,
    ai: {
        type: Object,
    },
    baseBehavior: {
        type: Object,
    }
})

const Enemy = mongoose.model('Enemy', EnemySchema)

export default Enemy