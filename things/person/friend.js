import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import _StatSet from '../numbers/stats/statset.js'
import _SkillSet from '../person_adjacents/skills/skillset.js'
import _Experiences from '../numbers/experiences/experiences'
import _ExperiencesGrowth from '../numbers/experiences/experiencesgrowth'
import _ExperiencesAptitude from '../numbers/experiences/experiencesaptitude'
import _UnitClass from '../person_adjacents/classes/unitclass'
import _Battalion from '../person_adjacents/battalions/battalion.js'
import _Personality from '../algorithms/units/personality'
import _BaseBehavior from '../algorithms/units/basebehavior'

const FriendSchema = new Schema({
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