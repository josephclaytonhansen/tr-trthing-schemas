import asyncHandler from '../../../middleware/asyncHandler.js'
import Skill from '../../../../things/person_adjacents/skills/skill.js'

const getSkills = asyncHandler(async (req, res) => {
    const skills = await Skill.find().populate()
    res.json(skills)
})

const getSkillByMongoId = asyncHandler(async (req, res) => {
    const skill = await Skill.findById(req.params.id).populate()
})

const GetSkill = asyncHandler(async (req, res) => {
    const skill = await Skill.findOne({id: req.params.id}).populate()
})

const createSkill = asyncHandler(async (req, res) => {
    const skill = await Skill.create(req.body)
    res.json({success: true, message: "Skill created"})
})

const updateSkill = asyncHandler(async (req, res) => {
    const skill = await Skill.findOneAndUpdate({id: req.params.id}, req.body)
    res.json({success: true, message: "Skill updated"})
})

const deleteSkill = asyncHandler(async (req, res) => {
    const skill = await Skill.findOneAndDelete({id: req.params.id})
    res.json({success: true, message: "Skill deleted"})
})

export {
    getSkills,
    getSkillByMongoId,
    GetSkill,
    createSkill,
    updateSkill,
    deleteSkill
}