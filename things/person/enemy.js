import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import _StatSet from '../numbers/stats/statset.js'
import _StatGrowths from '../numbers/stats/growths.js'
import SkillSet from '../person_adjacents/skills/skillset'
import UnitClass from '../person_adjacents/classes/unitclass'
import Personality from '../algorithms/units/personality'
import baseBehaviors from '../algorithms/units/basebehavior'
import Experiences from '../numbers/experiences/experiences'
import Battalion from '../person_adjacents/battalions/battalion.js'

const EnemySchema = new Schema({
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

const Enemy = mongoose.model('Enemy', EnemySchema)

export default Enemy