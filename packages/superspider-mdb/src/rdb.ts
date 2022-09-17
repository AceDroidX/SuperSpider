// const fs = require('fs')
// import { exampleJson } from './test'
import axios from 'axios'
import { Collection } from 'mongodb'
import { logger, SuperChat } from 'superspider-shared'
// const athome = require('./athome')

const roomid_str = process.env['room_id']
if (!roomid_str) {
    logger.error('请设置room_id')
    process.exit(1)
}
const roomlist = roomid_str.split(',').map(x => parseInt(x))

const schList: any[] = []
const tsList: any[] = []

// let exRate = 14.7

async function rdbCore(rid: number, amdb: Collection) {
    if (!amdb) return
    if (!tsList[rid]) {
        tsList[rid] = new Date().getTime()
    }
    // log(`LOG start rdb room ${rid}`)
    try {
        // if (global.usingAtHome)
        //   // data = JSON.parse(
        //   //   await athome.execute(
        //   //     'https://api.live.bilibili.com/av/v1/SuperChat/getMessageList?room_id=' +
        //   //       rid
        //   //   )
        //   // )
        // else
        let data = (await axios.get('https://api.live.bilibili.com/av/v1/SuperChat/getMessageList?room_id=' + rid)).data
        // let data
        // if (rid == 21452505) {
        //   data = exampleJson
        // } else {
        //   data = (await axios.get('https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom?room_id=' + rid)).data
        // }
        if (data.code !== 0) {
            logger.error(`ERR when rp room ${rid} by code ${data.code}`)
            return
        } else if (data.data.list == undefined) {
            // logger.info(`LOG no data for room ${rid}`)
            return
        }
        data.data.list.reverse()
        for (const item of data.data.list) {
            try {
                const sc: SuperChat = {
                    id: Number(item.id),
                    roomid: Number(rid),
                    ts: Number(item.start_time),
                    uid: Number(item.uid),
                    uname: item.user_info.uname,
                    avatar: item.user_info.face,
                    price: Number(item.price),
                    // msg: item.message.replace(/\s*/g, '').replace(/[\r\n]/g, ''),
                    msg: item.message,
                    // msgjpn: item.message_trans.replace(/\s*/g, '').replace(/[\r\n]/g, ''),
                    msgjpn: item.message_trans,
                    bcolor: item.background_bottom_color,
                    pcolor: item.background_price_color,
                }
                try {
                    const result = await amdb.updateOne({ id: Number(item.id) }, { $set: sc }, { upsert: true })
                    logger.info(`${item.id} upsert result:${JSON.stringify(result)}`)
                } catch (e) {
                    logger.warn(`WARN when upsert`)
                    logger.warn(e)
                    const result = await amdb.updateOne({ id: Number(item.id) }, { $set: sc }, { upsert: true })
                    logger.info(`${item.id} upsert result:${JSON.stringify(result)}`)
                }
            } catch (e) {
                logger.error(`ERR when writing data:\n${JSON.stringify(data)}\n${JSON.stringify(e)}`)
            }
        }
    } catch (e) {
        logger.error(`ERR when rp room ${rid}:\n` + JSON.stringify(e))
    }
}

function rdbClose(rid: number) {
    if (!schList[rid]) return
    schList[rid].cancel()
    schList[rid] = false
    tsList[rid] = false
}

export default async function main(amdb: Collection) {
    try {
        for (const item of roomlist) {
            schList[Number(item)] = setInterval(rdbCore, 1000, Number(item), amdb)
        }
    } catch (e) {
        logger.error('ERR when fetch onLive:\n' + JSON.stringify(e))
    }
    // exRate = Number((await axios.get('https://api.live.bilibili.com/userext/v1/Conf/getExchangeRate')).data.data.exchange_rate)
}
