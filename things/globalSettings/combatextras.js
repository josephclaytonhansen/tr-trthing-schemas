import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const CombatExtrasSchema = new Schema({
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

CombatExtrasSchema.pre('save', function() {
        if (this.isNew) {
                this.combatArts = true
                this.combatArtLimit = 3
                this.weaponTriangle = true
                this.triangleTypes = []
                this.neutralTypes = []
                this.triangleMapping = {}
                this.expandedWeaponTriangle = false
                this.weaponTriangleAdvantage = 20
                this.weaponTriangleDisadvantage = -20
                this.magicTriangle = false
                this.magicTriangleAdvantage = 20
                this.magicTriangleDisadvantage = -20
                this.magicTriangleTypes = []
                this.neutralMagicTypes = []
                this.magicTriangleMapping = {}
                this.battalions = true
                this.battalionLimit = 1
                this.battalionEndurance = true
                this.pairUp = true
                this.adjutants = false
                this.adjutantHeal = false
                this.adjutantGuard = false
                this.adjutantAttack = false
        }
})

const CombatExtras = mongoose.model('CombatExtras', CombatExtrasSchema)


export default CombatExtras