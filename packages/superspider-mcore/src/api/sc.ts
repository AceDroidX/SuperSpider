import Router from 'koa-router'
import { logger } from 'superspider-shared'
import type { IDBAppContext, IDBAppState, URLParaGetData, URLParaGetDataByTS } from '../model.ts'

const mergeTime = 30000005

const sc = new Router<IDBAppState, IDBAppContext>()

export default sc

// /sc
sc.get('/', async (ctx, next) => {
    ctx.response.status = 404
    ctx.response.body = 'Simon Not Found'
    await next()
})

// /sc/getData
// 获取SC列表
// 参数：
//   roomid: 房间号
//   filter: 清除30以下价格的SC
//   limit: 返回的SC数量
sc.post('/getData', async (ctx, next) => {
    if (!ctx.maindb) {
        ctx.response.status = 500
        ctx.response.body = 'Internal Server Error: maindb ERR'
        logger.error('Internal Server Error: maindb ERR:\n' + JSON.stringify(ctx.maindb))
        await next()
        return
    }
    const maindb = ctx.maindb
    const body = ctx.request.body as URLParaGetData
    if (!body?.roomid || isNaN(Number(body.roomid))) {
        ctx.response.status = 404
        ctx.response.body = 'Bad Request Format'
        await next()
    } else {
        try {
            ctx.response.status = 200
            const roomid = Number(body.roomid)
            if (!body.limit || isNaN(Number(body.limit))) {
                var pageLimit = 100
            } else if (Number(body.limit) > 1000) {
                var pageLimit = 1000
            } else {
                var pageLimit = Number(body.limit)
            }
            const finded = await maindb
                .find({ roomid })
                .sort('ts', -1)
                .limit(pageLimit)
                .toArray()
            ctx.response.body = finded
            await next()
        } catch (e) {
            ctx.response.status = 500
            ctx.response.body = 'Internal Server Error'
            await next()
            logger.error(e)
        }
    }
})

// /sc/getDataByTS
// 通过时间戳获取SC列表
// 参数：
//   roomid: 房间号
//   start: 开始时间戳
//   end: 结束时间戳
sc.post('/getDataByTS', async (ctx, next) => {
    if (!ctx.maindb) {
        ctx.response.status = 500
        ctx.response.body = 'Internal Server Error: maindb ERR'
        await next()
        return
    }
    const maindb = ctx.maindb
    const body = ctx.request.body as URLParaGetDataByTS;
    switch (true) {
        case !body?.roomid || isNaN(Number(body.roomid)):
        case !body?.start || isNaN(Number(body.start)):
        case !body?.end || isNaN(Number(body.end)):
            ctx.response.status = 404
            ctx.response.body = 'Bad Request Format'
            await next()
            return
    }
    try {
        const roomid = Number(body?.roomid)
        const start = Number(body?.start)
        const end = Number(body?.end)
        const finded = await maindb
            .find({ roomid: roomid, ts: { $gte: start, $lte: end } })
            .sort('ts', -1)
            .limit(1000)
            .toArray()
        if (finded.length >= 1000) {
            logger.debug(`LOG maindb Too Many Results(>=1000)${start}-${end} ${roomid}`)
            ctx.response.status = 403
            ctx.response.body = 'Too Many Results(>=1000)'
            await next()
            return
        }
        ctx.response.status = 200
        ctx.response.body = finded
        await next()
    } catch (e) {
        ctx.response.status = 500
        ctx.response.body = 'Internal Server Error'
        await next()
        logger.error(e)
    }
})
