import asyncHandler from '../../middleware/asyncHandler.js'
import GlobalExperiences from '../../../things/globalSettings/experiences.js'
import WeaponType from '../../../things/abstracts/weapontype.js'

import express from 'express'
const router = express.Router()

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

router.route('/').get(getGlobalExperiences)
router.route('/').put(updateGlobalExperiences)
router.route('/add').post(AddNewWeaponType)

export default router