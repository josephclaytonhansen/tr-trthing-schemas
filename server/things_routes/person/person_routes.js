import asyncHandler from '../../middleware/asyncHandler.js'
import Person from '../../../things/person/person.js'
import {uid} from '../../functions/hexuids.js' 

import express from 'express'
const router = express.Router()

const getPeople = asyncHandler(async (req, res) => {
    const people = await Person.find({}).populate(['_details', '_avatar', '_npc', '_enemy', '_friend'])
    const peopleJson = people.map(person => person.toJSON(req.combatExtras))
    res.json(peopleJson)
})

const createPerson = asyncHandler(async (req, res) => {
    if (req.body.which === 'avatar'){
        let numberOfExistingAvatars = await Person.countDocuments( { _avatar: { $exists: true } } )
        if (numberOfExistingAvatars !== 0) {
            res.status(400)
            throw new Error('An avatar unit already exists, you cannot create another one.')
        }
    }
    let value = req.highest + 1
    req.body.id = await uid(value)
    const person = await Person.create(req.body)
    await person.addSubs(req)
    res.json(person.toJSON(req.combatExtras))
})

const getPersonByMongoId = asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id).populate(['_details', '_avatar', '_npc', '_enemy', '_friend'])
    res.json(person.toJSON(req.combatExtras))
})

const getPerson = asyncHandler(async (req, res) => {
    const person = await Person.findOne({id: req.params.id}).populate(['_details', '_avatar', '_npc', '_enemy', '_friend'])
    if (!person) {
        res.status(404)
        throw new Error('Person not found')
    }
    res.json(person.toJSON(req.combatExtras))
})

const updatePerson = asyncHandler(async (req, res) => {
    try{const person = await Person.findOneAndUpdate({id: req.params.id}, req.body).populate()
    res.json({success: true, message: 'Person updated'})} catch (err) {
        res.json({success: false, message: 'Error updating person'})
    
    }
})

const deletePerson = asyncHandler(async (req, res) => {
    try{const person = await Person.findOneAndDelete({id: req.params.id})
    res.json({success: true, message: 'Person deleted'})} catch (err) {
        res.json({success: false, message: 'Error deleting person'})
    
    }
})

const deletePersonByMongoId = asyncHandler(async (req, res) => {
    try{const person = await Person.findByIdAndDelete(req.params.id)
    res.json({success: true, message: 'Person deleted'})} catch (err) {
        res.json({success: false, message: 'Error deleting person'})
    }
})

const rollback = asyncHandler(async (req, res) => {
    try{const person = await Person.findOne({id: req.params.id})
    if (person) {
        await person.rollback()
        res.json({success: true, message: 'Person rolled back'})
    }} catch (err) {
        res.json({success: false, message: 'Error rolling back person'})
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