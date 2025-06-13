export * from './utils.ts'

export type SuperChat = {
    id: number,
    roomid: number,
    ts: number,
    uid?: number,
    uname: string,
    avatar: string,
    medal_info?: MedalInfo,
    price: number,
    msg: string,
    msgjpn: string,
    bcolor: string,
    pcolor: string,
    hide?: number,
}

export type MedalInfo = {
    anchor_roomid: number,
    anchor_uname: string,
    guard_level: number,
    is_lighted: number,
    medal_color: string,
    medal_color_border: number,
    medal_color_end: number,
    medal_color_start: number,
    medal_level: number,
    medal_name: string,
    target_id: number,
}

import logger from './logger.ts'
import { MongoClient } from 'mongodb'
import winston from 'winston';
import 'winston-mongodb'

const mClient = new MongoClient(`mongodb://admin:${process.env.MONGODB_PASS ?? 'admin'}@${process.env.MONGODB_IP ?? 'localhost'}:27017/?authMechanism=DEFAULT`)

export function addMongoTrans(collName: string) {
    logger.add(new winston.transports.MongoDB({
        level: 'debug', db: mClient.connect(), collection: collName, tryReconnect: true
    }))
}

export { logger, mClient }
