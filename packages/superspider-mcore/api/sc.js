const Router = require('koa-router')
const sc = new Router()

const giftConv = require('../utils/giftConv')

const log = process.env.NODE_ENV == 'development' ? console.log : () => {}

const mergeTime = 30000005

// /sc
sc.get('/', async (ctx, next) => {
  ctx.response.status = 404
  ctx.response.body = 'Simon Not Found'
  await next()
})

// /sc/getData
sc.post('/getData', async (ctx, next) => {
  if (!global.amdb) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error: AMDB ERR'
    await next()
    return
  }
  if (!global.predb) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error: PreDB ERR'
    await next()
    return
  }
  const amdb = global.amdb
  const predb = global.predb
  if (!ctx.request.body.roomid || isNaN(Number(ctx.request.body.roomid))) {
    ctx.response.status = 404
    ctx.response.body = 'Bad Request Format'
    await next()
  } else {
    try {
      ctx.response.status = 200
      const roomid = Number(ctx.request.body.roomid)
      log(`LOG req in rid ${roomid}`)
      const finded = await amdb
        .find({ roomid })
        .sort('ts', -1)
        .limit(200)
        .toArray()
      log(`LOG amdb complete ${roomid}`)
      const preFinded = await predb
        .find({ roomid })
        .sort('ts', -1)
        .limit(200)
        .toArray()
      log(`LOG predb complete ${roomid}`)
      const tsList = []
      const rList = {}
      for (const item of finded) {
        if (!item.livets) continue
        if (Number(item.hide) > 0) continue
        let lts = Number(item.livets)
        let ltstmp = lts
        let deltaLeft = lts - mergeTime
        let deltaRight = lts + mergeTime
        for (let num of tsList) {
          ltstmp = deltaRight > num && num >= lts ? num : ltstmp
          ltstmp = deltaLeft < num && num <= lts ? num : ltstmp
        }
        lts = ltstmp
        if (!tsList.includes(lts)) tsList.push(lts)
        if (!rList[lts]) rList[lts] = []
        rList[lts].push({ ...item, ts: Number(item.ts * 1000), sc: 1 })
      }
      for (const item of preFinded) {
        if (
          ctx.request.body.filter &&
          (isNaN(Number(item.price)) || Number(item.price) < 30)
        )
          continue
        if (!item.livets) continue
        if (Number(item.hide) > 0) continue
        let lts = Number(item.livets)
        let ltstmp = lts
        let deltaLeft = lts - mergeTime
        let deltaRight = lts + mergeTime
        for (let num of tsList) {
          ltstmp = deltaRight > num && num >= lts ? num : ltstmp
          ltstmp = deltaLeft < num && num <= lts ? num : ltstmp
        }
        lts = ltstmp
        if (!tsList.includes(lts)) tsList.push(lts)
        if (!rList[lts]) rList[lts] = new Array()
        rList[lts].push({ ...item, ...giftConv(item), sc: 0 })
      }
      // for (const tl of rList) {
      //   tl.sort((a, b) => Number(b.ts) - Number(a.ts))
      // }
      log(`LOG local sort ${roomid}`)
      const output = []
      for (const ts of tsList) {
        rList[ts].sort((a, b) => Number(b.ts) - Number(a.ts))
        output.push({
          ts,
          data: rList[ts],
        })
      }
      // output.sort((a, b) => Number(b.ts) - Number(a.ts))
      log(`LOG output ${roomid}`)
      ctx.response.body = output
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

// /sc/submit
sc.post('/submit', async (ctx, next) => {
  if (!global.amdb) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error: AMDB ERR'
    await next()
    return
  }
  if (!global.udb) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error: UDB ERR'
    await next()
    return
  }
  const amdb = global.amdb
  const udb = global.udb
  if (
    !ctx.request.body.username ||
    !ctx.request.body.password ||
    !ctx.request.body.id ||
    !ctx.request.body.tr
  ) {
    ctx.response.status = 404
    ctx.response.body = 'Bad Request Format'
    await next()
    return
  }
  try {
    const u = await udb
      .find({
        username: ctx.request.body.username,
        password: ctx.request.body.password,
      })
      .limit(1)
      .toArray()
    if (u.length < 1) {
      ctx.response.status = 403
      ctx.response.body = 'Forbidden'
      await next()
      return
    }
    const ust = u[0].trstatus
    const item = await amdb
      .find({ _id: Number(ctx.request.body.id) })
      .limit(1)
      .toArray()
    if (Number(item.trstatus) > Number(ust)) {
      ctx.response.status = 200
      ctx.response.body = 1
      await next()
      return
    }
    await amdb.updateOne(
      { _id: Number(ctx.request.body.id) },
      { $set: { msgtr: ctx.request.body.tr } }
    )
    ctx.response.status = 200
    ctx.response.body = 0
    await next()
  } catch (e) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error'
    await next()
    console.log(e)
  }
})

// /sc/hide
sc.post('/hide', async (ctx, next) => {
  if (!global.amdb) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error: AMDB ERR'
    await next()
    return
  }
  if (!global.udb) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error: UDB ERR'
    await next()
    return
  }
  const amdb = global.amdb
  const udb = global.udb
  if (
    !ctx.request.body.username ||
    !ctx.request.body.password ||
    !ctx.request.body.id
  ) {
    ctx.response.status = 404
    ctx.response.body = 'Bad Request Format'
    await next()
    return
  }
  try {
    const u = await udb
      .find({
        username: ctx.request.body.username,
        password: ctx.request.body.password,
      })
      .limit(1)
      .toArray()
    if (u.length < 1) {
      ctx.response.status = 403
      ctx.response.body = 'Forbidden'
      await next()
      return
    }
    const ust = u[0].trstatus
    const item = await amdb
      .find({ _id: Number(ctx.request.body.id) })
      .limit(1)
      .toArray()
    if (Number(item.trstatus) > Number(ust)) {
      ctx.response.status = 200
      ctx.response.body = 1
      await next()
      return
    }
    await amdb.updateOne(
      { _id: Number(ctx.request.body.id) },
      { $set: { hide: 1 } }
    )
    ctx.response.status = 200
    ctx.response.body = 0
    await next()
  } catch (e) {
    ctx.response.status = 500
    ctx.response.body = 'Internal Server Error'
    await next()
    console.log(e)
  }
})

module.exports = sc
