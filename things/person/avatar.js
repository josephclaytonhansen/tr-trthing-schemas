import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const AvatarSchema = new Schema({
    owner: String,
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
    classExps: {
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
    defaultName: String,
    voiceOptions: [String],
    voice: String,
    appearanceCustomizations: [[String]],
    appearance: Object,
})


const Avatar = mongoose.model('Avatar', AvatarSchema)

export default Avatar