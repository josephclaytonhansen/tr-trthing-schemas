import asyncHandler from '../../../middleware/asyncHandler.js'
import UnitClass from '../../../../things/person_adjacents/classes/unitclass.js'

const getUnitClasses = asyncHandler(async (req, res) => {
    const unitClasses = await UnitClass.find().populate()
    resJson = unitClasses.map(unitClass => unitClass.toJSON())
    res.json(resJson)
})

const getUnitClassByMongoId = asyncHandler(async (req, res) => {
    const unitClass = await UnitClass.findById(req.params.id).populate()
    res.json(unitClass.toJSON())
})

const getUnitClass = asyncHandler(async (req, res) => {
    const unitClass = await UnitClass.findOne({id: req.params.id}).populate()
    res.json(unitClass.toJSON())
})

const createUnitClass = asyncHandler(async (req, res) => {
    const unitClass = await UnitClass.create(req.body)
    res.json({success: true, message: "UnitClass created"})
})

const updateUnitClass = asyncHandler(async (req, res) => {
    const unitClass = await UnitClass.findOneAndUpdate({id: req.params.id}, req.body)
    res.json({success: true, message: "UnitClass updated"})
})

const deleteUnitClass = asyncHandler(async (req, res) => {
    const unitClass = await UnitClass.findOneAndDelete({id: req.params.id})
    res.json({success: true, message: "UnitClass deleted"})
})

export {
    getUnitClasses,
    getUnitClassByMongoId,
    getUnitClass,
    createUnitClass,
    updateUnitClass,
    deleteUnitClass
}