import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import type { AddressInfo } from 'node:net'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from '@koa/router'
import sc from '../src/api/sc.ts'

// Exercise the real middleware and nested router without a database connection.
const calls: { filter: unknown; limit?: number; sort?: unknown[] }[] = []
let results: unknown[] = []
const app = new Koa()
app.context.maindb = {
    find(filter: unknown) {
        const call = { filter } as (typeof calls)[number]
        calls.push(call)
        return {
            sort(...args: unknown[]) { call.sort = args; return this },
            limit(limit: number) { call.limit = limit; return this },
            async toArray() { return results },
        }
    },
}
const router = new Router()
router.use('/sc', sc.routes(), sc.allowedMethods())
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())
const server = app.listen(0, '127.0.0.1')
let baseURL: string
before(async () => {
    if (!server.listening) await new Promise<void>(resolve => server.once('listening', resolve))
    baseURL = `http://127.0.0.1:${(server.address() as AddressInfo).port}/sc`
})
after(() => new Promise<void>((resolve, reject) => server.close(err => err ? reject(err) : resolve())))

function post(path: string, body: Record<string, string>) {
    return fetch(baseURL + path, {
        method: 'POST',
        body: new URLSearchParams(body),
    })
}

test('nested routes and form parser preserve numeric filters, sorting and limit', async () => {
    results = [{ id: 1, roomid: 80397, ts: 123 }]
    const response = await post('/getData', { roomid: '80397', limit: '10' })
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), results)
    assert.deepEqual(calls.at(-1), { filter: { roomid: 80397 }, sort: ['ts', -1], limit: 10 })
})

test('default limit and upper bound are preserved', async () => {
    await post('/getData', { roomid: '80397' })
    assert.equal(calls.at(-1)?.limit, 100)
    await post('/getData', { roomid: '80397', limit: '5000' })
    assert.equal(calls.at(-1)?.limit, 1000)
})

test('invalid room and time parameters do not reach the database', async () => {
    const count = calls.length
    assert.equal((await post('/getData', { roomid: 'invalid' })).status, 404)
    assert.equal((await post('/getDataByTS', { roomid: '80397', start: 'invalid', end: '200' })).status, 404)
    assert.equal(calls.length, count)
})

test('history endpoint retains timestamp bounds and result ceiling', async () => {
    results = []
    const body = { roomid: '80397', start: '100', end: '200' }
    assert.equal((await post('/getDataByTS', body)).status, 200)
    assert.deepEqual(calls.at(-1), {
        filter: { roomid: 80397, ts: { $gte: 100, $lte: 200 } },
        sort: ['ts', -1], limit: 1000,
    })
    results = Array.from({ length: 1000 }, (_, id) => ({ id }))
    assert.equal((await post('/getDataByTS', body)).status, 403)
})

test('base route and unsupported methods retain their HTTP status', async () => {
    assert.equal((await fetch(baseURL + '/')).status, 404)
    assert.equal((await fetch(baseURL + '/getData')).status, 405)
})
