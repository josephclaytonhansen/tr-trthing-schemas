import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GoalSchema = new Schema({
    experience: String,
})

const Goal = mongoose.model('Goal', GoalSchema)
export { Goal, GoalSchema}