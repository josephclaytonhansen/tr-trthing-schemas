import mongoose from 'mongoose'
import {Schema} from 'mongoose'

const skillSchema = new Schema({
    id: String,
    name: String,
    icon: String,
    description: String,
    skillFile: String,
    skillFunction: String
})

const Skill = mongoose.model('Skill', skillSchema)

export default Skill