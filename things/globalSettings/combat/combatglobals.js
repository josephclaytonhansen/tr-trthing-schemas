import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const CombatGlobalsSchema = new Schema({
        combatArts: Boolean,
        combatArtLimit: Number,
        weaponTriangle: Boolean,
        triangleTypes: Array,
        neutralTypes: Array,
        triangleMapping: Object,
        expandedWeaponTriangle: Boolean,
        weaponTriangleAdvantage: Number,
        weaponTriangleDisadvantage: Number,
        magicTriangle: Boolean,
        magicTriangleAdvantage: Number,
        magicTriangleDisadvantage: Number,
        magicTriangleTypes: Array,
        neutralMagicTypes: Array,
        magicTriangleMapping: Object,
        battalions: Boolean,
        battalionLimit: Number,
        battalionEndurance: Boolean,
        pairUp: Boolean,
        adjutants: Boolean,
        adjutantHeal: Boolean,
        adjutantGuard: Boolean,
        adjutantAttack: Boolean,
})

export default CombatGlobalsSchema