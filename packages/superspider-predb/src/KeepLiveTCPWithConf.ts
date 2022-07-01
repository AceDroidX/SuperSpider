import { KeepLiveTCP, relayEvent, TCPOptions } from 'bilibili-live-ws'
import { GetConfTask } from './GetConfTask';

export class KeepLiveTCPWithConf extends KeepLiveTCP {
    confTask: GetConfTask;
    constructor(roomid: number, confTask: GetConfTask, opts?: TCPOptions) {
        super(roomid, opts)
        this.confTask = confTask
    }
    async connect(reconnect = true) {
        if (reconnect) {
            this.connection.close()
            const conf = await this.confTask.getConf(this.roomid)
            this.connection = new (this.Base as any)(this.roomid, conf)
        }
        const connection = this.connection

        let timeout = setTimeout(() => {
            connection.close()
            connection.emit('timeout')
        }, this.timeout)

        connection.on(relayEvent, (eventName: string, ...params: any[]) => {
            if (eventName !== 'error') {
                this.emit(eventName, ...params)
            }
        })

        connection.on('error', (e: any) => this.emit('e', e))
        connection.on('close', () => {
            if (!this.closed) {
                setTimeout(() => this.connect(), this.interval)
            }
        })

        connection.on('heartbeat', () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                connection.close()
                connection.emit('timeout')
            }, this.timeout)
        })

        connection.on('close', () => {
            clearTimeout(timeout)
        })
    }
}