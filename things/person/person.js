import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import {uid} from '../../server/functions/data_management/hexuids.js'

import Avatar from './avatar.js'
import Enemy from './enemy.js'
import Friend from './friend.js'
import Npc from './npc.js'
import UnitClass from '../person_adjacents/classes/unitclass.js'
import Details from './details.js'
import {Battalion} from '../person_adjacents/battalions/battalion.js'
import {Goal} from '../person_adjacents/goals/goal.js'

import _StatSet from '../numbers/stats/statset.js'
import _StatGrowths from '../numbers/stats/growths.js'
import _Experiences from '../numbers/experiences/experiences.js'
import _ExperiencesGrowth from '../numbers/experiences/growths.js'
import _ExperiencesAptitude from '../numbers/experiences/aptitudes.js'
import _Personality from '../algorithms/units/personality.js'
import _BaseBehavior from '../algorithms/units/basebehavior.js'

const personSchema = new Schema({
    id: String,
    which: String,
    _undoData: Object,
    _avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar'},
    _npc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Npc'
    },
    _enemy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enemy'
    },
    _friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    },
    _details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Details'
    },
    _isAvatar: Boolean,
    _isNpc: Boolean,
    _isEnemy: Boolean,
    _isFriend: Boolean,
    _supports: {
        type: Object,
        default: {}
    },
    _supportPoints: {
        type: Object,
        default: {}
    },
    _maxSupportPoints: {
        type: Object,
        default: {}
    },
    _goals: Array,
    _reactions: Object,
})

personSchema.methods.addSubs = async function(req) {
    if (this.which === 'avatar') {
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

        req.highest++
        let bonusStats = new _StatSet(req)
        let battalion = new Battalion(
            {
                id: await uid(req.highest++),
                name: "New Battalion",
                bonusStats: bonusStats.toObject(),
            }
        )
        await battalion.save()

        const avatar = new Avatar({ 
            owner: this.id, 
            id: await uid(req.highest++),
            baseStats: baseStats.toObject(), 
            currentStats: currentStats.toObject(),
            statGrowths: statGrowths.toObject(),
            skills: skills,
            classExps: classExps,
            experiences: experiences.json(),
            experienceGrowths: experienceGrowths.json(),
            experienceAptitudes: experienceAptitudes.json(),
            unitClass: unitClass,
            battalion: battalion.toObject(),
            level: 1,
            exp: 0,
        } )
        await avatar.save()
        this._avatar = avatar._id
        this._isAvatar = true

    } else if (this.which === 'npc') {
        const npc = new Npc({ owner: this.id, id: await uid(req.highest++)} )
        await npc.save()
        this._npc = npc._id
        this._isNpc = true

    } else if (this.which === 'enemy') {
        let baseStats = new _StatSet(req)
        let currentStats = new _StatSet(req)
        let statGrowths = new _StatGrowths(req)
        let skills = []
        let experiences = new _Experiences(req)
        let experienceGrowths = new _ExperiencesGrowth(req)
        let experienceAptitudes = new _ExperiencesAptitude(req)
        let existingClasses = await UnitClass.find()
        if (existingClasses.length === 0 || !existingClasses) {
            let unitClass = new UnitClass({
                name: "New Class",
                id: "newclass",

            })
            await unitClass.save()
            existingClasses = [unitClass]
        }
        let unitClass = existingClasses[0]
        let classExps = {[existingClasses[0]["id"]]: 0}
        req.highest++
        let bonusStats = new _StatSet(req)
        let battalion = new Battalion(
            {
                id: await uid(req.highest++),
                name: "New Battalion",
                bonusStats: bonusStats.toObject(),
            }
        )
        await battalion.save()
        let ai = new _Personality(req)
        let baseBehavior = new _BaseBehavior(req)

        const enemy = new Enemy({ 
            owner: this.id, 
            id: await uid(req.highest++),
            baseStats: baseStats.toObject(), 
            currentStats: currentStats.toObject(),
            statGrowths: statGrowths.toObject(),
            skills: skills,
            experiences: experiences.toObject(),
            experienceGrowths: experienceGrowths.toObject(),
            experienceAptitudes: experienceAptitudes.toObject(),
            unitClass: unitClass,
            classExps: classExps,
            battalion: battalion.toObject(),
            level: 1,
            exp: 0,
            ai: ai.toObject(),
            baseBehavior: baseBehavior.toObject(),
            unique: false,
        } )
        await enemy.save()
        this._enemy = enemy._id
        this._isEnemy = true

    } else if (this.which === 'friend') {
        let baseStats = new _StatSet(req)
        let currentStats = new _StatSet(req)
        let statGrowths = new _StatGrowths(req)
        let skills = []
        let experiences = new _Experiences(req)
        let experienceGrowths = new _ExperiencesGrowth(req)
        let experienceAptitudes = new _ExperiencesAptitude(req)
        let existingClasses = await UnitClass.find()
        if (existingClasses.length === 0 || !existingClasses) {
            let unitClass = new UnitClass({
                name: "New Class",
                id: "newclass",

            })
            await unitClass.save()
            existingClasses = [unitClass]
        }
        let unitClass = existingClasses[0]
        let classExps = {[existingClasses[0]["id"]]: 0}
        req.highest++
        let bonusStats = new _StatSet(req)
        let battalion = new Battalion(
            {
                id: await uid(req.highest++),
                name: "New Battalion",
                bonusStats: bonusStats.toObject(),
            }
        )
        await battalion.save()
        let ai = new _Personality(req)
        let baseBehavior = new _BaseBehavior(req)

        const friend = new Friend({ 
            owner: this.id, 
            id: await uid(req.highest++),
            baseStats: baseStats.toObject(), 
            currentStats: currentStats.toObject(),
            statGrowths: statGrowths.toObject(),
            skills: skills.toObject(),
            experiences: experiences.toObject(),
            experienceGrowths: experienceGrowths.toObject(),
            experienceAptitudes: experienceAptitudes.toObject(),
            unitClass: unitClass,
            classExps: classExps,
            battalion: battalion.toObject(),
            level: 1,
            exp: 0,
            ai: ai.toObject(),
            baseBehavior: baseBehavior.toObject(),
            unique: false,
        } )
        await friend.save()
        this._friend = friend._id
        this._isFriend = true
    }

    const details = new Details({ owner: this.id, id: await uid(req.highest++)} )
    await details.save()
    this._details = details._id

    const goal = new Goal({ owner: this.id, id: await uid(req.highest++)} )
    await goal.save()
    this._goals = [goal._id]

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

personSchema.methods.toJSON = function(combatExtras) {
    let returns = {
        id: this.id,
        which: this.which,
        details: this._details,
        isAvatar: this.get('_isAvatar'),
        isNpc: this.get('_isNpc'),
        isEnemy: this.get('_isEnemy'),
        isFriend: this.get('_isFriend'),
        props: [
            '_avatar',
            '_npc',
            '_enemy',
            '_friend',
            '_details',
            '_isAvatar',
            '_isNpc',
            '_isEnemy',
            '_isFriend',
            '_supports',
            '_supportPoints',
            '_maxSupportPoints',
            '_goals',
        ],
    }
    if (!this.get('_isNpc') || this.get('_isEnemy') || this.get('_isFriend') || this.get('_isAvatar')) {
        if (!this.get('_isEnemy')){
        }
        returns.combatData = {
            baseStats: this.get('_enemy')?.baseStats || this.get('_friend')?.baseStats || this.get('_avatar')?.baseStats,
            currentStats: this.get('_enemy')?.currentStats || this.get('_friend')?.currentStats || this.get('_avatar')?.currentStats,
            statGrowths: this.get('_enemy')?.statGrowths || this.get('_friend')?.statGrowths || this.get('_avatar')?.statGrowths,
            experiences: this.get('_enemy')?.experiences || this.get('_friend')?.experiences || this.get('_avatar')?.experiences,
            experienceGrowths: this.get('_enemy')?.experienceGrowths || this.get('_friend')?.experienceGrowths || this.get('_avatar')?.experienceGrowths,
            experienceAptitudes: this.get('_enemy')?.experienceAptitudes || this.get('_friend')?.experienceAptitudes || this.get('_avatar')?.experienceAptitudes,
            skills: this.get('_enemy')?.skills || this.get('_friend')?.skills || this.get('_avatar')?.skills,
            level: this.get('_enemy')?.level || this.get('_friend')?.level || this.get('_avatar')?.level,
            unitClass: this.get('_enemy')?.unitClass || this.get('_friend')?.unitClass || this.get('_avatar')?.unitClass,
            exp: this.get('_enemy')?.exp || this.get('_friend')?.exp || this.get('_avatar')?.exp,
            unique: this.get('_enemy')?.unique || this.get('_friend')?.unique,
        }

        if (combatExtras && combatExtras.battalions){
            returns.combatData.battalion = this.get('_enemy')?.battalion || this.get('_friend')?.battalion || this.get('_avatar')?.battalion
        }
    }

    if (returns.combatData) {
        returns.combatData.ai = this.get('_friend')?.ai || this.get('_enemy')?.ai
        returns.combatData.baseBehavior = this.get('_friend')?.baseBehavior || this.get('_enemy')?.baseBehavior
    }
    return returns
}

export default personSchema