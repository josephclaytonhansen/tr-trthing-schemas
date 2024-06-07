import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const NpcSchema = new Schema({
    owner: String,
    id: String,
})


const Npc = mongoose.model('Npc', NpcSchema)

export default Npc