if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({ debug: true })
}
import { Collection, MongoClient } from 'mongodb'
import { TCPOptions } from 'bilibili-live-ws'
import { MedalInfo, SuperChat } from 'superspider-shared'
import { GetConfTask } from './GetConfTask'
import { KeepLiveTCPWithConf } from './KeepLiveTCPWithConf'

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
    const roomid_str = process.env['room_id']
    if (!roomid_str) {
        console.error('请设置room_id')
        process.exit(1)
    }
    const roomid = roomid_str.split(',').map(x => parseInt(x))
    const confTask = new GetConfTask()
    roomid.forEach((value: number) => {
        openRoom(value, client, confTask)
    })
}

async function onMsg(data: any, maindb: Collection, predb: Collection) {
    switch (data.cmd) {
        case 'STOP_LIVE_ROOM_LIST':
        case 'NOTICE_MSG':
        case 'WIDGET_BANNER':
            return
        case 'SUPER_CHAT_MESSAGE':
            try {
                const item = data.data
                let medal: MedalInfo | undefined
                if (item.medal_info) {
                    medal = {
                        anchor_roomid: Number(item.medal_info.anchor_roomid),
                        anchor_uname: item.medal_info.anchor_uname,
                        guard_level: Number(item.medal_info.guard_level),
                        is_lighted: Number(item.medal_info.is_lighted),
                        medal_color: item.medal_info.medal_color,
                        medal_color_border: Number(item.medal_info.medal_color_border),
                        medal_color_end: Number(item.medal_info.medal_color_end),
                        medal_color_start: Number(item.medal_info.medal_color_start),
                        medal_level: Number(item.medal_info.medal_level),
                        medal_name: item.medal_info.medal_name,
                        target_id: Number(item.medal_info.target_id),
                    }
                } else {
                    medal = undefined
                }
                const sc: SuperChat = {
                    id: Number(item.id),
                    roomid: Number(data.roomid),
                    ts: Number(item.start_time),
                    uid: Number(item.uid),
                    uname: item.user_info.uname,
                    avatar: item.user_info.face,
                    medal_info: medal,
                    price: Number(item.price),
                    // msg: item.message.replace(/\s*/g, '').replace(/[\r\n]/g, ''),
                    msg: item.message,
                    // msgjpn: item.message_trans.replace(/\s*/g, '').replace(/[\r\n]/g, ''),
                    msgjpn: item.message_trans,
                    bcolor: item.background_bottom_color,
                    pcolor: item.background_price_color,
                }
                const result = await maindb.updateOne({ id: Number(item.id) }, { $set: sc }, { upsert: true })
                console.log(`${item.id} update result:${JSON.stringify(result)}`)
            } catch (error) {
                console.error('ERR on SUPER_CHAT_MESSAGE')
                console.error(error)
            }
            break
        case 'SUPER_CHAT_MESSAGE_JPN':
            try {
                const result2 = await maindb.updateOne({ id: Number(data.data.id) }, { $set: { msgjpn: data.data.message_jpn } })
                console.log(`${data.data.id} JPN update result:${JSON.stringify(result2)}`)
            } catch (error) {
                console.error('ERR on SUPER_CHAT_MESSAGE_JPN')
                console.error(error)
            }
            break
    }
    data.ts = new Date()
    await predb.insertOne(data)
}

async function openRoom(roomid: number, client: MongoClient, confTask: GetConfTask) {
    // console.log(`OPEN: ${roomid}`)
    const maindb = client.db('amdb').collection('maindb')
    const predb = client.db('fullmsg').collection(roomid.toString())
    await predb.createIndex({ ts: -1, })
    const liveconf = await confTask.getConf(roomid) as TCPOptions
    const live = new KeepLiveTCPWithConf(roomid, confTask, liveconf)
    live.on('open', () => { })
    live.on('live', () => console.log(`live<${roomid}>`))
    live.on('heartbeat', () => { })
    live.on('msg', async (data) => onMsg(data, maindb, predb))
    live.on('close', () => { console.log(`close<${roomid}>`) })
    live.on('error', (e) => { console.log(`error<${roomid}>:${e.message}`) })
}

process.on('uncaughtException', (err) => {
    console.log('ERR unc expt')
    console.log(err)
})

main()
