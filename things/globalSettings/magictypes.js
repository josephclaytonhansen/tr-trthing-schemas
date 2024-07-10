import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GlobalMagicTypesSchema = new Schema({
    id: String,
    types: {
        type: Array,
    }
})

GlobalMagicTypesSchema.pre('save', function() {
    if (this.isNew) {
        this.id = 'SIGMT'
        this.types = [
            {
                name: 'Light',
                icon: '',
                id: 'light',
            },
            {
                name: 'Dark',
                icon: '',
                id: 'dark',
            },
            {
                name: 'Elemental',
                icon: '',
                id: 'elemental',
            }
        ]
    }
})

export default GlobalMagicTypesSchema