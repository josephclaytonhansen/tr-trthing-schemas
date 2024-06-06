import Uid from '../../../things/abstracts/_meta/uid.js'

const checkHighest = async () => {
    let all = await Uid.find({})
    if (!all || all.length === 0) return '00000'
    let highest = all.sort((a, b) => parseInt(a.value, 16) - parseInt(b.value, 16))
    highest = highest[highest.length - 1]
    return highest.value
}

const uid = async (value) => {
    let newUidHex = await Uid.create({value: value.toString(16).padStart(5, '0')})
    await Uid.deleteMany({
        _id: {$ne: newUidHex._id},
    })
    return newUidHex.value
}

export { uid, checkHighest }