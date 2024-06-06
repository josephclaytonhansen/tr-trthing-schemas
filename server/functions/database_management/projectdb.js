const used = []

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const length = 17

const randomString = () => {
    let str = ""
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str
}

const randomStringUnique = () => {
    let str = randomString()
    while (used.includes(str)) {
        str = randomString()
    }
    used.push(str)
    return str
}

const randomStringReset = () => {
    used = []
}

const generateDbName = () => {return "_trdb_" + randomStringUnique()}

export default generateDbName
