import { getConf } from "bilibili-live-ws";
import { AsyncQueue } from "./AsyncQueue";

const sleep = (t: number) => new Promise((r) => setTimeout(r, t));

export class GetConfTask {
    queue = GetConfTaskQueue.create('ConfTask');
    async getConf(roomid: number) {
        return await this.queue.push(async () => {
            return await getConf(roomid);
        });
    }
}

class GetConfTaskQueue extends AsyncQueue {
    async funcBetweenTasks(): Promise<void> {
        await sleep(1000);
    }
}