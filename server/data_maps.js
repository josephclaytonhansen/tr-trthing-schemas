import {
    getPeople,
    createPerson,
    getPersonByMongoId,
    getPerson,
    updatePerson,
    deletePerson,
    deletePersonByMongoId,
    rollback
} from './things_controllers/person/person.js'

import {
    getUnitClasses,
    getUnitClassByMongoId,
    getUnitClass,
    createUnitClass,
    updateUnitClass,
    deleteUnitClass
} from './things_controllers/person_adjacents/classes/unitclasses.js'

import {
    getSkills,
    getSkillByMongoId,
    GetSkill,
    createSkill,
    updateSkill,
    deleteSkill
} from './things_controllers/person_adjacents/skills/skill.js'

import {
    getGlobalExperiences,
    updateGlobalExperiences,
    AddNewWeaponType,
    RemoveWeaponType
} from './things_controllers/globalSettings/experiences.js'

import {
    getExtraStats,
    updateExtraStats
} from './things_controllers/globalSettings/extrastats.js'

import {
    getGlobalWeaponTypes,
    updateGlobalWeaponTypes
} from './things_controllers/globalSettings/weapontypes.js'

import {
    getGlobalMagicTypes,
    updateGlobalMagicTypes
} from './things_controllers/globalSettings/magictypes.js'

import {
    getObjectConsumable,
    createObjectConsumable,
    updateObjectConsumable,
    deleteObjectConsumable
} from './things_controllers/object/objectconsumable.js'

import {
    getObjectWeapon,
    createObjectWeapon,
    updateObjectWeapon,
    deleteObjectWeapon
} from './things_controllers/object/objectweapon.js'

import {
    getObjectGift,
    createObjectGift,
    updateObjectGift,
    deleteObjectGift
} from './things_controllers/object/objectgift.js'

import {
    getObjectEquipable,
    createObjectEquipable,
    updateObjectEquipable,
    deleteObjectEquipable
} from './things_controllers/object/objectequipable.js'

import {getObjects} from './things_controllers/object/object.js'

const Map = async (model, method, req, res, index) => {
    req.body.index = index
    switch (model) {
        case 'globalWeaponsTypes':
            switch (method) {
                case 'update':
                    await updateGlobalWeaponTypes(req, res)
                    break
                case 'get':
                    await getGlobalWeaponTypes(req, res)
                    break
            }
            break
        case 'globalMagicTypes':
            switch (method) {
                case 'update':
                    await updateGlobalMagicTypes(req, res)
                    break
                case 'get':
                    await getGlobalMagicTypes(req, res)
                    break
            }
            break
        case 'objectConsumable':
            switch (method) {
                case 'get':
                    await getObjectConsumable(req, res)
                    break
                case 'create':
                    await createObjectConsumable(req, res)
                    break
                case 'update':
                    await updateObjectConsumable(req, res)
                    break
                case 'delete':
                    await deleteObjectConsumable(req, res)
                    break
            }
            break
        case 'objectWeapon':
            switch (method) {
                case 'get':
                    await getObjectWeapon(req, res)
                    break
                case 'create':
                    await createObjectWeapon(req, res)
                    break
                case 'update':
                    await updateObjectWeapon(req, res)
                    break
                case 'delete':
                    await deleteObjectWeapon(req, res)
                    break
            }
            break
        case 'objectGift':
            switch (method) {
                case 'get':
                    await getObjectGift(req, res)
                    break
                case 'create':
                    await createObjectGift(req, res)
                    break
                case 'update':
                    await updateObjectGift(req, res)
                    break
                case 'delete':
                    await deleteObjectGift(req, res)
                    break
            }
            break
        case 'objectEquipable':
            switch (method) {
                case 'get':
                    await getObjectEquipable(req, res)
                    break
                case 'create':
                    await createObjectEquipable(req, res)
                    break
                case 'update':
                    await updateObjectEquipable(req, res)
                    break
                case 'delete':
                    await deleteObjectEquipable(req, res)
                    break
            }
            break
        case 'Object':
            switch (method) {
                case 'getObjects':
                    await getObjects(req, res)
                    break
            }
            break
        case 'Person':
            switch (method) {
                case 'getPeople':
                    await getPeople(req, res)
                    break
                case 'createPerson':
                    await createPerson(req, res)
                    break
                case 'getPersonByMongoId':
                    await getPersonByMongoId(req, res)
                    break
                case 'getPerson':
                    await getPerson(req, res)
                    break
                case 'updatePerson':
                    await updatePerson(req, res)
                    break
                case 'deletePerson':
                    await deletePerson(req, res)
                    break
                case 'deletePersonByMongoId':
                    await deletePersonByMongoId(req, res)
                    break
                case 'rollback':
                    await rollback(req, res)
                    break
                default:
                    res.status(400).send('Invalid method for model Person')
            }
            break
        case 'UnitClass':
            switch (method) {
                case 'getUnitClasses':
                    await getUnitClasses(req, res)
                    break
                case 'getUnitClassByMongoId':
                    await getUnitClassByMongoId(req, res)
                    break
                case 'getUnitClass':
                    await getUnitClass(req, res)
                    break
                case 'createUnitClass':
                    await createUnitClass(req, res)
                    break
                case 'updateUnitClass':
                    await updateUnitClass(req, res)
                    break
                case 'deleteUnitClass':
                    await deleteUnitClass(req, res)
                    break
                default:
                    res.status(400).send('Invalid method for model UnitClass')
            }
            break
        case 'Skill':
            switch (method) {
                case 'getSkills':
                    await getSkills(req, res)
                    break
                case 'getSkillByMongoId':
                    await getSkillByMongoId(req, res)
                    break
                case 'GetSkill':
                    await GetSkill(req, res)
                    break
                case 'createSkill':
                    await createSkill(req, res)
                    break
                case 'updateSkill':
                    await updateSkill(req, res)
                    break
                case 'deleteSkill':
                    await deleteSkill(req, res)
                    break
                default:
                    res.status(400).send('Invalid method for model Skill')
            }
            break
        case 'CombatExtras':
            switch (method) {
                case 'getCombatExtras':
                    await getCombatExtras(req, res)
                    break
                case 'updateCombatExtras':
                    await updateCombatExtras(req, res)
                    break
                default:
                    res.status(400).send('Invalid method for model CombatExtras')
            }
            break
        case 'GlobalExperiences':
            switch (method) {
                case 'getGlobalExperiences':
                    await getGlobalExperiences(req, res)
                    break
                case 'updateGlobalExperiences':
                    await updateGlobalExperiences(req, res)
                    break
                case 'AddNewWeaponType':
                    await AddNewWeaponType(req, res)
                    break
                case 'RemoveWeaponType':
                    await RemoveWeaponType(req, res)
                    break
                default:
                    res.status(400).send('Invalid method for model GlobalExperiences')
            }
            break
        case 'ExtraStats':
            switch (method) {
                case 'getExtraStats':
                    await getExtraStats(req, res)
                    break
                case 'updateExtraStats':
                    await updateExtraStats(req, res)
                    break
                default:
                    res.status(400).send('Invalid method for model ExtraStats')
            }
            break
        case 'GlobalWeaponTypes':
            switch (method) {
                case 'getGlobalWeaponTypes':
                    await getGlobalWeaponTypes(req, res)
                    break
                case 'updateGlobalWeaponTypes':
                    await updateGlobalWeaponTypes(req, res)
                    break
                default:
                    res.status(400).send('Invalid method for model GlobalWeaponTypes')
            }
            break
        default:
            res.status(400).send('Invalid model')
    }
}

export default Map