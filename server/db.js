import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_STRING = process.env.MONGO_STRING

let failureCount = 0

const connectWithRetry = async () => {
    console.log('MongoDB connection with retry')
    return mongoose.connect(MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "hansenstudios",retryReads:true, retryWrites:true }).catch((err) => {
        console.log('MongoDB connection unsuccessful, retry after 1 seconds.')
        setTimeout(connectWithRetry, 1000)
        failureCount++
        if (failureCount < 20){
            console.log('Database connection failed too many times')
            mongoose.disconnect()
        }
    })
}

if (failureCount < 20){
    connectWithRetry()
} else {
    console.log('Database connection failed too many times')
    mongoose.disconnect()
}


const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
    mongoose.disconnect().then(() => {
        console.log('Database disconnected')
        if (failureCount < 20){
        connectWithRetry()
        failureCount++
        } else {
            console.log('Database connection failed too many times')
            mongoose.disconnect()
        }
    })
})

db.on('connected', () => {
    console.log('Database Connected')
    failureCount = 0
})

db.on('disconnected', () => {
    if (failureCount < 20){
    if (db.readyState === 0) {connectWithRetry()}} else {
        console.log('Database connection failed too many times')
        mongoose.disconnect()
    
    }
})

db.ObjectId = mongoose.Types.ObjectId

//create a session store
db.sessionStorage = {
    sessions: {},
    get: function (sid, cb) {
        cb(null, this.sessions[sid])
    },
    set: function (sid, session, cb) {
        this.sessions[sid] = session
        cb(null, session)
    },
    destroy: function (sid, cb) {
        delete this.sessions[sid]
        cb(null)
    }
}

export default db