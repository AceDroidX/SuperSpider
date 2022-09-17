if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({ debug: true })
}
import { TCPOptions } from 'bilibili-live-ws'
import { Collection, MongoClient } from 'mongodb'
import { addMongoTrans, logger, mClient as client, MedalInfo, SuperChat } from 'superspider-shared'
import { GetConfTask } from './GetConfTask'
import { KeepLiveTCPWithConf } from './KeepLiveTCPWithConf'

async function main() {
    addMongoTrans('log-predb')
    try {
        await client.connect()
    } catch (err) {
        logger.error('ERR when connect to PREDB:\n' + JSON.stringify(err))
        process.exit(1)
    }
    logger.info('PREDB STARTED')
    const roomid_str = process.env['room_id']
    if (!roomid_str) {
        logger.error('请设置room_id')
        process.exit(1)
    }
    const roomid = roomid_str.split(',').map(x => parseInt(x))
    let fullmsg_id_str = process.env['fullmsg_id']
    if (!fullmsg_id_str) {
        fullmsg_id_str = ""
    }
    const fullmsg_id = fullmsg_id_str.split(',').map(x => parseInt(x))
    const confTask = new GetConfTask()
    roomid.forEach((value: number) => {
        openRoom(value, client, confTask, fullmsg_id.includes(value))
    })
}

async function onMsg(data: any, maindb: Collection, predb: Collection, isfullmsg: boolean) {
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
                try {
                    const result = await maindb.updateOne({ id: Number(item.id) }, { $set: sc }, { upsert: true })
                    logger.info(`${item.id} upsert result:${JSON.stringify(result)}`)
                } catch (e) {
                    logger.warn(`WARN when upsert`)
                    logger.warn(e)
                    const result = await maindb.updateOne({ id: Number(item.id) }, { $set: sc }, { upsert: true })
                    logger.info(`${item.id} upsert result:${JSON.stringify(result)}`)
                }
            } catch (error) {
                logger.error('ERR on SUPER_CHAT_MESSAGE')
                logger.error(error)
            }
            break
        case 'SUPER_CHAT_MESSAGE_JPN':
            try {
                const result2 = await maindb.updateOne({ id: Number(data.data.id) }, { $set: { msgjpn: data.data.message_jpn } })
                logger.info(`${data.data.id} JPN update result:${JSON.stringify(result2)}`)
            } catch (error) {
                logger.error('ERR on SUPER_CHAT_MESSAGE_JPN')
                logger.error(error)
            }
            break
    }
    if (isfullmsg) {
        try {
            data.ts = new Date()
            await predb.insertOne(data)
        } catch (error) {
            logger.error('ERR on fullmsg')
            logger.error(error)
        }
    }
}

async function openRoom(roomid: number, client: MongoClient, confTask: GetConfTask, isfullmsg: boolean) {
    // logger.info(`OPEN: ${roomid}`)
    const maindb = client.db('amdb').collection('maindb')
    let predb: Collection
    if (isfullmsg) {
        predb = client.db('fullmsg').collection(roomid.toString())
        await predb.createIndex({ ts: -1, })
    }
    const liveconf = await confTask.getConf(roomid) as TCPOptions
    logger.info(liveconf)
    const live = new KeepLiveTCPWithConf(roomid, confTask, liveconf)
    live.on('open', () => { })
    live.on('live', () => logger.info(`live<${roomid}>isfullmsg:${isfullmsg}`))
    live.on('heartbeat', () => { })
    live.on('msg', async (data) => onMsg(data, maindb, predb, isfullmsg))
    live.on('close', () => { logger.info(`close<${roomid}>`) })
    live.on('error', (e) => { logger.info(`error<${roomid}>:${e.message}`) })
}

process.on('uncaughtException', (err) => {
    logger.error('ERR unc expt:\n' + JSON.stringify(err))
    process.exit(1)
})

main()
