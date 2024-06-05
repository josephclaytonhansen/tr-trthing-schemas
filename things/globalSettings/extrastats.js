import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const ExtraStatsSchema = new Schema({
    weight: Boolean,
    weightAffectsMov: Boolean,
    luck: Boolean,
    separateCritAvo: Boolean,
    authority: Boolean
})

const ExtraStats = mongoose.model('ExtraStats', ExtraStatsSchema)
export default ExtraStats