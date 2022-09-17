if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({ debug: true })
}
import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { addMongoTrans, logger, mClient as client } from 'superspider-shared'
import sc from './api/sc'
import { IDBAppContext, IDBAppState } from './model'

const app = new Koa<IDBAppState, IDBAppContext>();
const router = new Router<IDBAppState, IDBAppContext>()

process.on('uncaughtException', (err) => {
    logger.error('ERR unc expt:\n' + JSON.stringify(err))
    process.exit(1)
})

async function main() {
    addMongoTrans('log-mcore')
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
    try {
        await client.connect()
        logger.info('数据库已连接')
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
        logger.error('ERR when connect to DB:\n' + JSON.stringify(err))
        process.exit(1)
    }
}

main()
