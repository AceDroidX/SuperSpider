// const fs = require('fs')
// import { exampleJson } from './test'
import axios from 'axios'
import { Collection, MongoClient, ObjectId } from 'mongodb'
// const athome = require('./athome')
const roomlist = [21452505, 80397]

const schList: any[] = []
const tsList: any[] = []

let exRate = 14.7

const log = process.env.NODE_ENV == 'development' ? console.log : () => { }

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
      console.log('ERR when rp room ' + rid + ' by code')
      return
    } else if (data.data.list == undefined) {
      // console.log(`LOG no data for room ${rid}`)
      return
    }
    data.data.list.reverse()
    for (const item of data.data.list) {
      try {
        console.log(`LOG rdb room ${rid} item ${item.id}`)
        await amdb.updateOne({ id: Number(item.id) }, {
          $set: {
            id: Number(item.id),
            roomid: Number(rid),
            ts: Number(item.start_time),
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
        }, { upsert: true })
      } catch (e) {
        console.log('ERR when writing data: ')
        console.log(data)
        console.log(e)
      }
    }
  } catch (e) {
    console.log('ERR when rp room ' + rid)
    console.log(e)
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
    console.log('ERR when fetch onLive')
    console.log(e)
  }
  exRate = Number((await axios.get('https://api.live.bilibili.com/userext/v1/Conf/getExchangeRate')).data.data.exchange_rate)
}
