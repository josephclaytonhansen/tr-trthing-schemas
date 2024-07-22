import { Schema } from 'mongoose'

const GeneralSettingsSchema = new Schema({
    UseWeatherOnLevels: {type: Boolean, default: false},
    unitsCanHaveChildren: {type: Boolean, default: true},
    useExperienceSublevels: {type: Boolean, default: false},
    useExperienceAptitudes: {type: Boolean, default: true},
    unitEditorAvatarDefaultHairColor: {type: String, default: 'rgb(39, 31, 86)'},
    unitEditorAvatarDefaultHairStyle: {type: Number, default: 0},
    unitEditorAvatarDefaultEyeColor: {type: String, default: 'rgb(34, 132, 181)'},
    unitEditorAvatarDefaultSkinColor: {type: String, default: 'rgb(255, 232, 207)'}
})

export default GeneralSettingsSchema