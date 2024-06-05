import asyncHandler from '../../middleware/asyncHandler.js'
import Person from '../../../things/person/person.js'

import express from 'express'
const router = express.Router()

const getPeople = asyncHandler(async (req, res) => {
    const people = await Person.find({}).populate()
    const peopleJson = people.map(person => person.toJSON(req.combatExtras))
    res.json(peopleJson)
})

const createPerson = asyncHandler(async (req, res) => {
    const person = await Person.create(req.body)
    await person.addSubs(req)
    res.json(person.toJSON(req.combatExtras))
})

const getPersonByMongoId = asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id).populate()
    res.json(person.toJSON(req.combatExtras))
})

const getPerson = asyncHandler(async (req, res) => {
    const person = await Person.findOne({id: $eq(req.params.id)}).populate()
    res.json(person.toJSON(req.combatExtras))
})

const updatePerson = asyncHandler(async (req, res) => {
    const person = await Person.findOneAndUpdate({id: $eq(req.params.id)}, req.body).populate()
    res.json({success: true, message: 'Person updated'})
})

const deletePerson = asyncHandler(async (req, res) => {
    const person = await Person.findOneAndDelete({id: $eq(req.params.id)})
    res.json({success: true, message: 'Person deleted'})
})

const deletePersonByMongoId = asyncHandler(async (req, res) => {
    const person = await Person.findByIdAndDelete(req.params.id)
    res.json({success: true, message: 'Person deleted'})
})

const rollback = asyncHandler(async (req, res) => {
    const person = await Person.findOne({id: $eq(req.params.id)})
    if (person) {
        await person.rollback()
        res.json({success: true, message: 'Person rolled back'})
    }
})

router.route('/').get(getPeople)
router.route('/').post(createPerson)
router.route('/:id').get(getPerson)
router.route('/_id/:id').get(getPersonByMongoId)
router.route('/:id').put(updatePerson)
router.route('/:id').delete(deletePerson)
router.route('/_id/:id').delete(deletePersonByMongoId)
router.route('/undo/:id/').post(rollback)

export default router