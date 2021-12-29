
import fs from 'fs'
import rdb from './rdb'
import { Collection, MongoClient } from 'mongodb'
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// global.adbRunning = false
var amdb: Collection
// global.rmdb = false
// global.umdb = false

// global.usingAtHome = process.env.USINGATHOME

process.on('uncaughtException', (err) => {
    console.log('ERR unc expt')
    console.log(err)
})

// schedule.scheduleJob('*/5 * * * *', adb)
async function main() {
    // DB Init
    const client = new MongoClient(
        process.env.NODE_ENV == 'development'
            ? 'mongodb://localhost:27017/amdb'
            : 'mongodb://admin:' +
            process.env.MONGODB_PASS +
            '@' +
            process.env.MONGODB_IP +
            ':27017/admin?authMechanism=DEFAULT'
    )

    try {
        await client.connect()
        amdb = client.db('amdb').collection('maindb')
    } catch (err) {
        console.log('ERR when connect to AMDB')
        console.log(err)
        process.exit(1)
    }
    amdb.createIndex({ roomid: -1, livets: -1, })
    amdb.createIndex({ roomid: -1, })
    amdb.createIndex({ ts: -1, })
    await delay(5000)
    console.log('RDB STARTED')
    await rdb(amdb)
}
main()
