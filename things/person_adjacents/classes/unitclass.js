import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const UnitClassSchema = new Schema({
    id: String,
    minStats: {
        type: Object,
    },
    isRiding: Boolean,
    isFlying: Boolean,
    isArmored: Boolean,
    isMagic: Boolean,
    unique: Boolean,
    name: String,
    description: String,
    growths: {
        type: Object,
    },
    classSkills: {
        type: Array,
    },
    classSkillsReqs: {
        type: Array,
    },
    level: String,
    icon: String,
    promotions: {
        type: Array,
    },
    sprites: {
        type: Object,
    },
})

const UnitClass = mongoose.model('UnitClass', UnitClassSchema)

export default UnitClass