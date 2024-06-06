import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const DetailsSchema = new Schema({
    owner: String,
    name: String,
    alive: Boolean,
    age: Number,
    pronouns: {
        singular: String,
        possessive: String,
        possessives: String,
        object: String
    },
    gender: String,
    orientation: String,
    height: Number,
    birthday: {
        month: Number,
        day: Number
    },
    shortDescription: String,
    longDescription: String,
    likes: Array,
    dislikes: Array,
    hobbies: Array,
    team: String,
    title: String,
    specialUnitClasses: Array,
    specialSkills: Array,
    portraits: Object,
    sprites: Object,
    specialColors: Object,
})

DetailsSchema.pre('save', function() {
    if (this.isNew) {
        this.alive = true
        this.age = 0
        this.pronouns = {
            singular: 'they',
            possessive: 'their',
            possessives: 'theirs',
            object: 'them',
        }
        this.height = 166
        this.birthday = {
            month: 1,
            day: 1,
        }
    }
})

const Details = mongoose.model('Details', DetailsSchema)


export default Details