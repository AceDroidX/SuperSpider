if (process.env.NODE_ENV != 'production') {
  require('dotenv').config({ debug: true })
}
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { Collection, MongoClient } from 'mongodb'
import { IDBAppContext, IDBAppState } from './model'
import sc from './api/sc'


const app = new Koa<IDBAppState, IDBAppContext>();
const router = new Router<IDBAppState, IDBAppContext>()

process.on('uncaughtException', (err) => {
  console.log('ERR unc expt')
  console.log(err)
})

async function main() {
  app.use(bodyParser())
  app.use(
    cors({
      origin: (ctx) => '*',
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
  )

  // DB Init

  const client = new MongoClient(
    process.env.NODE_ENV == 'production'
        ? `mongodb://admin:${process.env.MONGODB_PASS}@${process.env.MONGODB_IP}:27017/?authMechanism=DEFAULT`
        : 'mongodb://admin:admin@localhost:27017/'
)

  try {
    await client.connect()
    console.log('数据库已连接')
    const db = client.db('amdb')
    const maindb = db.collection('maindb')
    const livedb = db.collection('livedb')
    // const predb = db.collection('predb')
    // app.context.amdb = amdb
    app.context.maindb = maindb
    app.context.livedb = livedb
    router.use('/sc', sc.routes(), sc.allowedMethods())
    app.use(router.routes())
    app.listen(2162)
  } catch (err) {
    console.log('ERR when connect to AMDB/UDB/PreDB')
    console.log(err)
    process.exit(1)
  }
}

main()
