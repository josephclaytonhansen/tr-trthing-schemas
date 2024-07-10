import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GlobalWeaponTypesSchema = new Schema({
    id: String,
    types: {
        type: Array,
    }
})

GlobalWeaponTypesSchema.pre('save', function() {
    if (this.isNew) {
        this.id = 'SIGWT'
        this.types = [
            {
                name: 'Sword',
                icon: '',
                id: 'sword',
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Lance',
                icon: '',
                id: 'lance',
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Axe',
                icon: '',
                id: 'axe',
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Bow',
                icon: '',
                id: 'bow',
                ranges: [1, 2, 3, 4],
                defaultRange: 2
            },
            {
                name: 'Gauntlet',
                icon: '',
                id: 'gauntlet',
                ranges: [1],
                defaultRange: 1
            },
            {
                name: 'Dagger',
                icon: '',
                id: 'dagger',
                ranges: [1, 2],
                defaultRange: 1
            }
        ]
    }
})

export default GlobalWeaponTypesSchema