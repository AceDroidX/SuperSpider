
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({ debug: true })
}
import { Collection } from 'mongodb'
import { addMongoTrans, logger, mClient as client } from 'superspider-shared'
import rdb from './rdb'
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// global.adbRunning = false
var amdb: Collection
// global.rmdb = false
// global.umdb = false

// global.usingAtHome = process.env.USINGATHOME

process.on('uncaughtException', (err) => {
    logger.error('ERR unc expt:\n' + JSON.stringify(err))
    process.exit(1)
})

// schedule.scheduleJob('*/5 * * * *', adb)
async function main() {
    addMongoTrans('log-mdb')
    try {
        await client.connect()
        amdb = client.db('amdb').collection('maindb')
    } catch (err) {
        logger.error('ERR when connect to DB:\n' + JSON.stringify(err))
        process.exit(1)
    }
    amdb.createIndex({ roomid: -1, livets: -1, })
    amdb.createIndex({ roomid: -1, ts: -1, })
    amdb.createIndex({ id: -1, }, { unique: true })
    amdb.createIndex({ ts: -1, })
    await delay(5000)
    logger.info('RDB STARTED')
    await rdb(amdb)
}
main()
