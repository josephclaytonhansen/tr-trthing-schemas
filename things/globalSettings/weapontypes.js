import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const GlobalWeaponTypesSchema = new Schema({
    types: {
        type: Array,
    }
})

GlobalWeaponTypesSchema.pre('save', function() {
    if (this.isNew) {
        this.types = [
            {
                name: 'Sword',
                icon: '',
                id: 'sword',
                magic: false,
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Lance',
                icon: '',
                id: 'lance',
                magic: false,
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Axe',
                icon: '',
                id: 'axe',
                magic: false,
                ranges: [1, 2],
                defaultRange: 1
            },
            {
                name: 'Bow',
                icon: '',
                id: 'bow',
                magic: false,
                ranges: [1, 2, 3, 4],
                defaultRange: 2
            },
            {
                name: 'Gauntlet',
                icon: '',
                id: 'gauntlet',
                magic: false,
                ranges: [1],
                defaultRange: 1
            },
            {
                name: 'Dagger',
                icon: '',
                id: 'dagger',
                magic: false,
                ranges: [1, 2],
                defaultRange: 1
            }
        ]
    }
})

export default GlobalWeaponTypesSchema