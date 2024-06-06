import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const ExtraStatsSchema = new Schema({
    weight: Boolean,
    weightAffectsMov: Boolean,
    luck: Boolean,
    separateCritAvo: Boolean,
    authority: Boolean
})

ExtraStatsSchema.pre('save', function() {
    if (this.isNew) {
        this.weight = false
        this.weightAffectsMov = false
        this.luck = true
        this.separateCritAvo = false
        this.authority = true
    }
})

const ExtraStats = mongoose.model('ExtraStats', ExtraStatsSchema)
export default ExtraStats