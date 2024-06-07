import mongoose from 'mongoose'
import { Schema } from 'mongoose'
const FriendSchema = new Schema({
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
        type: Object,
    },
    experiences: {
        type: Object,
    },
    experienceGrowths: {
        type: Object,
    },
    experienceAptitudes: {
        type: Object,
    },
    level: Number,
    unitClass: {
        ref: 'UnitClass',
        type: Schema.Types.ObjectId
    },
    exp: Number,
    battalion: {
        type: Object,
    },
    unique: Boolean,
    ai: {
        type: Object,
    },
    baseBehavior: {
        type: Object,
    }
})

const Friend = mongoose.model('Friend', FriendSchema)

export default Friend