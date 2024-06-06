import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GlobalExperiencesSchema = new Schema({
    riding: Boolean,
    flying: Boolean,
    armor: Boolean,
    authority: Boolean,
})

GlobalExperiencesSchema.pre('save', function() {
    if (this.isNew) {
        this.riding = true
        this.flying = true
        this.armor = true
        this.authority = true
    }
})

GlobalExperiencesSchema.methods.addNewWeaponType = function(type) {
    this[type] = true
}

const GlobalExperiences = mongoose.model('GlobalExperiences', GlobalExperiencesSchema)

export default GlobalExperiences