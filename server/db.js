import mongoose from 'mongoose'
import dotenv from 'dotenv'
import generateDbName from './functions/database_management/projectdb.js'
dotenv.config()

const MONGO_STRING = process.env.MONGO_STRING

let failureCount = 0

const connectWithRetry = async (failureCount) => {
    console.log('MongoDB connection with retry')
    return mongoose.connect(MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true,retryReads:true, retryWrites:true, dbName: generateDbName() }).catch((err) => {
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

export default db