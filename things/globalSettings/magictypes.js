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
                ranges: [1, 2, 3, 4],
            },
            {
                name: 'Dark',
                icon: '',
                id: 'dark',
                ranges: [1, 2, 3, 4],
            },
            {
                name: 'Elemental',
                icon: '',
                id: 'elemental',
                ranges: [1, 2, 3, 4],
            }
        ]
    }
})

export default GlobalMagicTypesSchema