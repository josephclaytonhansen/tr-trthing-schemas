import asyncHandler from '../../middleware/asyncHandler.js'

import PersonSchema from '../../../things/person/person.js'

import {uid} from '../../functions/data_management/hexuids.js' 

const getPeople = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    const people = await Person.find({})
    const peopleJson = people.map(person => person.toJSON(req.combatExtras))
    res.json(peopleJson)
})

const createPerson = asyncHandler(async (req, res) => {
    console.log(req.body.which)
    const Person = req.connection.model('Person', PersonSchema)
    req.body.which = req.body.which || req.body.subtype
    if (req.body.which === 'avatar'){
        let numberOfExistingAvatars = await Person.countDocuments( { _avatar: { $exists: true } } )
        if (numberOfExistingAvatars !== 0) {
            req.body.which = 'enemy'
        }
    }
    req.highest++
    req.body.id = await uid(req.highest)
    const person = await Person.create(req.body)
    await person.addSubs(req)

    res.json(person.toJSON(req.combatExtras))
})

const getPersonByMongoId = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    const person = await Person.findById(req.body.id)
    res.json(person.toJSON(req.combatExtras))
})

const getPerson = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    const person = await Person.findOne({id: req.body.id})
    if (!person) {
        res.status(404)
        throw new Error('Person not found')
    }
    res.json(person.toJSON(req.combatExtras))
})

const updatePerson = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    let body = req.body.actions.actions[req.body.index].body
    console.log(body)
    await Person.findOneAndUpdate({id: body.id}, body).then( async(person) => {
        await person.save()
        res.json({success: true, message: 'Person updated'})} ).catch( (err) => {
        res.json({success: false, message: 'Error updating person'})    
    })
})

const deletePerson = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    let body = req.body.actions.actions[req.body.index].body
    console.log(body)
    try{const person = await Person.findOneAndDelete({id: body.id})
    res.json({success: true, message: 'Person deleted'})} catch (err) {
        res.json({success: false, message: 'Error deleting person'})
    
    }
})

const deletePersonByMongoId = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    let body = req.body.actions.actions[req.body.index].body
    console.log(body)
    try{const person = await Person.findByIdAndDelete(body.id)
    res.json({success: true, message: 'Person deleted'})} catch (err) {
        res.json({success: false, message: 'Error deleting person'})
    }
})

const rollback = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    let body = req.body.actions.actions[req.body.index].body
    console.log(body)
    try{const person = await Person.findOne({id: body.id})
    if (person) {
        await person.rollback()
        res.json({success: true, message: 'Person rolled back'})
    }} catch (err) {
        res.json({success: false, message: 'Error rolling back person'})
    }
})


export {
    getPeople,
    createPerson,
    getPersonByMongoId,
    getPerson,
    updatePerson,
    deletePerson,
    deletePersonByMongoId,
    rollback,
}