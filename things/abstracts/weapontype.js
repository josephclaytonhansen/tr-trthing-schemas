import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const WeaponTypeSchema = new Schema({
    name: String,
    icon: String,
    magic: Boolean,
})

const WeaponType = mongoose.model('WeaponType', WeaponTypeSchema)

export default WeaponType