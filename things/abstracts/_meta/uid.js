import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const UidSchema = new Schema({
    value: String,
})

const Uid = mongoose.model('Uid', UidSchema)
export default Uid