import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const NpcSchema = new Schema({
    id: String,
})

const Npc = mongoose.model('Npc', NpcSchema)

export default Npc