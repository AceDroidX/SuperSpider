import Router from 'koa-router'
import { IDBAppContext, IDBAppState } from '../model'

const log = process.env.NODE_ENV == 'development' ? console.log : () => { }

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
  if (!ctx.amdb) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error: AMDB ERR'
    console.log('Internal Server Error: AMDB ERR')
    console.log(ctx.amdb)
    await next()
    return
  }
  const amdb = ctx.amdb
  if (!ctx.request.body.roomid || isNaN(Number(ctx.request.body.roomid))) {
    ctx.response.status = 404
    ctx.response.body = 'Bad Request Format'
    await next()
  } else {
    try {
      ctx.response.status = 200
      const roomid = Number(ctx.request.body.roomid)
      if (!ctx.request.body.limit || isNaN(Number(ctx.request.body.limit))) {
        var pageLimit = 100
      } else if (Number(ctx.request.body.limit) > 1000) {
        var pageLimit = 1000
      } else {
        var pageLimit = Number(ctx.request.body.limit)
      }
      log(`LOG req in rid ${roomid}`)
      const finded = await amdb
        .find({ roomid })
        .sort('ts', -1)
        .limit(pageLimit)
        .toArray()
      log(`LOG amdb complete ${roomid}`)
      log(`LOG output ${roomid}`)
      ctx.response.body = finded
      log(`LOG next start ${roomid}`)
      await next()
      log(`LOG next end ${roomid}`)
    } catch (e) {
      ctx.response.status = 500
      ctx.response.body = 'Internal Server Error'
      await next()
      console.log(e)
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
  if (!ctx.amdb) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error: AMDB ERR'
    await next()
    return
  }
  const amdb = ctx.amdb
  switch (true) {
    case !ctx.request.body.roomid || isNaN(Number(ctx.request.body.roomid)):
    case !ctx.request.body.start || isNaN(Number(ctx.request.body.start)):
    case !ctx.request.body.end || isNaN(Number(ctx.request.body.end)):
      ctx.response.status = 404
      ctx.response.body = 'Bad Request Format'
      await next()
      return
  }
  try {
    const roomid = Number(ctx.request.body.roomid)
    const start = Number(ctx.request.body.start)
    const end = Number(ctx.request.body.end)
    log(`LOG req in rid ${roomid}`)
    const finded = await amdb
      .find({ roomid: roomid, ts: { $gte: start, $lte: end } })
      .sort('ts', -1)
      .limit(1000)
      .toArray()
    log(`LOG amdb complete ${roomid}`)
    if (finded.length >= 1000) {
      log(`LOG amdb Too Many Results(>=1000)${start}-${end} ${roomid}`)
      ctx.response.status = 403
      ctx.response.body = 'Too Many Results(>=1000)'
      await next()
      return
    }
    ctx.response.status = 200
    ctx.response.body = finded
    log(`LOG next start ${roomid}`)
    await next()
    log(`LOG next end ${roomid}`)
  } catch (e) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error'
    await next()
    console.log(e)
  }
})
