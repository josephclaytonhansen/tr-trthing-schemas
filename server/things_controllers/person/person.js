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
    const person = await Person.findById(req.params.id)
    res.json(person.toJSON(req.combatExtras))
})

const getPerson = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    const person = await Person.findOne({id: req.params.id})
    if (!person) {
        res.status(404)
        throw new Error('Person not found')
    }
    res.json(person.toJSON(req.combatExtras))
})

const updatePerson = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    try{const person = await Person.findOneAndUpdate({id: req.params.id}, req.body).populate()
    res.json({success: true, message: 'Person updated'})} catch (err) {
        res.json({success: false, message: 'Error updating person'})
    
    }
})

const deletePerson = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    try{const person = await Person.findOneAndDelete({id: req.params.id})
    res.json({success: true, message: 'Person deleted'})} catch (err) {
        res.json({success: false, message: 'Error deleting person'})
    
    }
})

const deletePersonByMongoId = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    try{const person = await Person.findByIdAndDelete(req.params.id)
    res.json({success: true, message: 'Person deleted'})} catch (err) {
        res.json({success: false, message: 'Error deleting person'})
    }
})

const rollback = asyncHandler(async (req, res) => {
    const Person = req.connection.model('Person', PersonSchema)
    try{const person = await Person.findOne({id: req.params.id})
    if (person) {
        await person.rollback()
        res.json({success: true, message: 'Person rolled back'})
    }} catch (err) {
        res.json({success: false, message: 'Error rolling back person'})
    }
})

const getDetails = asyncHandler(async (req, res) => {
    if (req.body.owner){
        let details = await Details.findOne({owner: req.body.owner})
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('Details not found')
        }
    } else if (req.body._id) {
        let details = await Details.findById(req.body._id)
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('Details not found')
        }
    } else {
        res.status(400)
        throw new Error('No owner or _id provided')
    }
})

const getAvatar = asyncHandler(async (req, res) => {
    if (req.body.owner){
        let details = await Avatar.findOne({owner: req.body.owner})
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('Avatar not found')
        }
    } else if (req.body._id) {
        let details = await Avatar.findById(req.body._id)
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('Avatar not found')
        }
    } else {
        res.status(400)
        throw new Error('No owner or _id provided')
    }
})

const getFriend = asyncHandler(async (req, res) => {
    if (req.body.owner){
        let details = await Friend.findOne({owner: req.body.owner})
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('Friend not found')
        }
    } else if (req.body._id) {
        let details = await Friend.findById(req.body._id)
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('Friend not found')
        }
    } else {
        res.status(400)
        throw new Error('No owner or _id provided')
    }
})

const getEnemy = asyncHandler(async (req, res) => {
    if (req.body.owner){
        let details = await Enemy.findOne({owner: req.body.owner})
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('Enemy not found')
        }
    } else if (req.body._id) {
        let details = await Enemy.findById(req.body._id)
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('Enemy not found')
        }
    } else {
        res.status(400)
        throw new Error('No owner or _id provided')
    }
})

const getNpc = asyncHandler(async (req, res) => {
    if (req.body.owner){
        let details = await Npc.findOne({owner: req.body.owner})
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('NPC not found')
        }
    } else if (req.body._id) {
        let details = await Npc.findById(req.body._id)
        if (details) {
            res.json(details)
        } else {
            res.status(404)
            throw new Error('NPC not found')
        }
    } else {
        res.status(400)
        throw new Error('No owner or _id provided')
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
    getDetails,
    getAvatar,
    getFriend,
    getEnemy,
    getNpc
}