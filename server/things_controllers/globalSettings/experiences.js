import asyncHandler from '../../middleware/asyncHandler.js'
import GlobalExperiences from '../../../things/globalSettings/experiences.js'
import WeaponType from '../../../things/abstracts/weapontype.js'

const getGlobalExperiences = asyncHandler(async (req, res) => {
    const globalExperiences = await GlobalExperiences.findOne({}).populate()
    res.json(globalExperiences)
})

const updateGlobalExperiences = asyncHandler(async (req, res) => {
    const globalExperiences = await GlobalExperiences.findOneAndUpdate({}, req.body).populate()
})

const AddNewWeaponType = asyncHandler(async (req, res) => {
    const globalExperiences = await GlobalExperiences.findOne()
    if (typeof req.body.weaponType === 'string') {
        try{
        globalExperiences.addNewWeaponType(req.body.weaponType)
        await globalExperiences.save()
        let weaponType = new WeaponType({ name: req.body.weaponType, magic: req.body.magic, icon: req.body.icon })
        await weaponType.save()
        res.json({ message: 'New weapon type added successfully.' })
        } catch (err) {
            res.json({ message: 'Error adding new weapon type.' })
        }
    }
})

const RemoveWeaponType = asyncHandler(async (req, res) => {
    const globalExperiences = await GlobalExperiences.findOne()
    if (typeof req.body.weaponType === 'string') {
        try{
        globalExperiences.removeWeaponType(req.body.weaponType)
        await globalExperiences.save()
        await WeaponType.findOneAndDelete({ name: req.body.weaponType })
        res.json({ message: 'Weapon type removed successfully.' })
        } catch (err) {
            res.json({ message: 'Error removing weapon type.' })
        }
    }
})

export {
    getGlobalExperiences,
    updateGlobalExperiences,
    AddNewWeaponType,
    RemoveWeaponType
}
