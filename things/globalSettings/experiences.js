import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GlobalExperiencesSchema = new Schema({
    riding: Boolean,
    flying: Boolean,
    armor: Boolean,
    authority: Boolean,
})

GlobalExperiencesSchema.methods.addNewWeaponType = function(type) {
    this[type] = true
}

const GlobalExperiences = mongoose.model('GlobalExperiences', GlobalExperiencesSchema)

export default GlobalExperiences