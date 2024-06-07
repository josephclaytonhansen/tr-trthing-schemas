import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const BattalionSchema = new Schema({
    name: String,
    id: String,
    authorityLevel: String,
    battalionLevel: String,
    battalionExperience: Number,
    uses: Number,
    description: String,
    icon: Object,
    minRange: Number,
    maxRange: Number,
    bonusStats: Object,
    statsAtLevels: Object,
    squares: Array,
    effects: Array,
})

BattalionSchema.pre('save', function(next) {
    if (this.isNew) {
        this.name = this.name || 'New Battalion'
        this.authorityLevel = this.authorityLevel || 'E'
        this.battalionLevel = this.battalionLevel || 'E'
        this.battalionExperience = this.battalionExperience || 0
        this.uses = this.uses || 2
        this.description = this.description || 'A new battalion.'
        this.icon = this.icon || {}
        this.minRange = this.minRange || 1
        this.maxRange = this.maxRange || 1
        this.bonusStats = this.bonusStats || {}
    }
    next()
})

const Battalion = mongoose.model('Battalion', BattalionSchema)

export {Battalion, BattalionSchema}