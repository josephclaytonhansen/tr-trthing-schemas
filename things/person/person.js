import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import {uid} from '../../server/functions/data_management/hexuids.js'

import UnitClass from '../person_adjacents/classes/unitclass.js'
import {Battalion} from '../person_adjacents/battalions/battalion.js'

import _StatSet from '../numbers/stats/statset.js'
import _StatGrowths from '../numbers/stats/growths.js'
import _Experiences from '../numbers/experiences/experiences.js'
import _ExperiencesGrowth from '../numbers/experiences/growths.js'
import _ExperiencesAptitude from '../numbers/experiences/aptitudes.js'
import _Personality from '../algorithms/units/personality.js'
import _BaseBehavior from '../algorithms/units/basebehavior.js'

const personSchema = new Schema({
    id: String,
    which: {
        type: String,
        required: true,
        enum: ['avatar', 'npc', 'enemy', 'friend'],
        default: 'enemy'
    },
    name: {
        type: String,
        required: true,
        default: 'New Unit'
    },
    fullName: {
        type: String,
        default: 'Newly Created Unit'
    },
    age: {
        type: Number,
        default: 18
    },
    pronouns: {
        singular: {type: String, default: 'they'},
        possessive: {type:String, default: 'their'},
        possessives: {type:String, default: 'theirs'},
        object: {type:String, default: 'them'}
    },
    height: {type:Number, default: 166},
    birthdayDay: {type:Number, default: 1},
    birthdayMonth: {type:Number, default: 1},
    shortDescription: {type:String, default: 'A new unit'},
    notes: {type:String, default: 'Take private notes (only in the editor) about this unit'},
    team: String,
    title: {type:String, default: ''},
    specialUnitClasses: Array,
    specialSkills: Array,
    portraits: Object,
    sprites: Object,
    accentColor1: {type:String, default: '#000000'},
    accentColor2: {type:String, default: '#000000'},
    useAccentColors: {type:Boolean, default: false},
    canSSupport: {type:Boolean, default: false},
    canHaveChildren: {type:Boolean, default: false},
    isRecruitable: {type:Boolean, default: false},
    isUnique: {type:Boolean, default: false},
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
        ref: 'Battalion',
        type: Schema.Types.ObjectId
    },
    ai: {
        type: Object,
    },
    undoData: Object,
    supports: {
        type: Object,
        default: {}
    },
    supportPoints: {
        type: Object,
        default: {}
    },
    maxSupports: {
        type: Object,
        default: {}
    },
    supportSpeeds: {
        type: Object,
        default: {}
    },
    passedDownTraits: {
        type: Array,
        default: [
            'Hair color',
            'Eye color',
            'Skin color',
            'Height',
        ]
    },
    childUnit: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    goals: Array,
})

personSchema.methods.addSubs = async function(req) {
    let baseStats = new _StatSet(req)
    let currentStats = new _StatSet(req)
    let statGrowths = new _StatGrowths(req)
    let skills = []
    let experiences = new _Experiences(req)
    let experienceGrowths = new _ExperiencesGrowth(req)
    let experienceAptitudes = new _ExperiencesAptitude(req)
    let existingClasses = await UnitClass.find()
    if (existingClasses.length === 0 || !existingClasses) {
        req.highest++
        let unitClass = new UnitClass({
            name: "New Class",
            id: await uid(req.highest++),
        })
        await unitClass.save()
        existingClasses = [unitClass]
    }
    let unitClass = existingClasses[0]
    let unitClassId = unitClass.id
    let classExps = {}
    classExps[unitClassId] = 0

    this.baseStats = baseStats.toObject()
    this.currentStats = currentStats.toObject()
    this.statGrowths = statGrowths.toObject()
    this.skills = skills
    this.experiences = experiences.toObject()
    this.experienceGrowths = experienceGrowths.toObject()
    this.experienceAptitudes = experienceAptitudes.toObject()
    this.classExps = classExps
    this.level = 1
    this.unitClass = unitClass._id
    this.exp = 0

    let bonusStats = new _StatSet(req)
    let battalion = new Battalion(
        {
            id: await uid(req.highest++),
            name: "New Battalion",
            bonusStats: bonusStats.toObject(),
        }
    )
    await battalion.save()

    await this.save()
}

personSchema.pre('findOneAndUpdate', async function() {
    const person = await this.model.findOne(this.getQuery())
    if (person) {
        person._objectData = person.toJSON()
        await person.save()
    }
});

personSchema.methods.rollback = async function() {
    const unit = await this.model.findOne(this.getQuery())
    if (unit) {
        await unit.updateOne(unit._objectData)
    }
}

personSchema.methods.toJSON = function() {
    let returns = {
        id: this.id,
        which: this.which,
        name: this.name,
        fullName: this.fullName,
        age: this.age,
        pronouns: this.pronouns,
        height: this.height,
        birthday: this.birthday,
        shortDescription: this.shortDescription,
        team: this.team,
        title: this.title,
        specialUnitClasses: this.specialUnitClasses,
        specialSkills: this.specialSkills,
        portraits: this.portraits,
        sprites: this.sprites,
        accentColor1: this.accentColor1,
        accentColor2: this.accentColor2,
        useAccentColors: this.useAccentColors,
        Notes: this.notes,
        canSSupport: this.canSSupport,
        canHaveChildren: this.canHaveChildren,
        isRecruitable: this.isRecruitable,
        isUnique: this.isUnique,
        baseStats: this.baseStats,
        currentStats: this.currentStats,
        statGrowths: this.statGrowths,
        skills: this.skills,
        experiences: this.experiences,
        experienceGrowths: this.experienceGrowths,
        experienceAptitudes: this.experienceAptitudes,
        classExps: this.classExps,
        level: this.level,
        unitClass: this.unitClass,
        exp: this.exp,
        battalion: this.battalion,
        ai: this.ai,
        maxSupports: this.maxSupports,
        passedDownTraits: this.passedDownTraits,
        childUnit: this.childUnit,
    }
    return returns
}

export default personSchema