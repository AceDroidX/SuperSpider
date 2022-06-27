if (process.env.NODE_ENV != 'production') {
  require('dotenv').config({ debug: true })
}
import { Collection, MongoClient } from 'mongodb'
import { KeepLiveWS } from 'bilibili-live-ws'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
    // DB Init
    const client = new MongoClient(
      process.env.NODE_ENV == 'production'
          ? `mongodb://admin:${process.env.MONGODB_PASS}@${process.env.MONGODB_IP}:27017/?authMechanism=DEFAULT`
          : 'mongodb://admin:admin@localhost:27017/'
  )
    try {
        await client.connect()
    } catch (err) {
        console.log('ERR when connect to PREDB')
        console.log(err)
        process.exit(1)
    }
    await delay(5000)
    console.log('PREDB STARTED')
    await openRoom(21452505, 434334701, client)
}

async function onMsg(data: any, db: Collection) {
    switch(data.cmd){
        case 'STOP_LIVE_ROOM_LIST':
        case 'NOTICE_MSG':
        case 'WIDGET_BANNER':
            return
    }
    data.ts = new Date()
    await db.insertOne(data)
}

async function openRoom(roomid: number, mid: number, client: MongoClient) {
    // console.log(`OPEN: ${roomid}`)
    const db = client.db('fullmsg').collection(roomid.toString())
    await db.createIndex({ ts: -1, })
    const live = new KeepLiveWS(roomid)
    live.on('open', () => { })
    live.on('live', () => console.log(`live<${roomid}>`))
    live.on('heartbeat', () => { })
    live.on('msg', async (data) => onMsg(data, db))
    live.on('close', () => { console.log(`close<${roomid}>`) })
    live.on('error', (e) => { console.log(`error<${roomid}>:${e.message}`) })
}

process.on('uncaughtException', (err) => {
    console.log('ERR unc expt')
    console.log(err)
})

main()
