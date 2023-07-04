import { getConf } from "bilibili-live-ws";
import { AsyncQueue } from "./AsyncQueue";

const sleep = (t: number) => new Promise((r) => setTimeout(r, t));

export class GetConfTask {
    queue = GetConfTaskQueue.create("ConfTask");
    async getConf(roomid: number, uid: number) {
        return await this.queue.push(async () => {
            return {
                ...(await getConf(roomid)),
                uid,
                buvid: "12345678-1234-1234-1234-123456789123infoc",
            };
        });
    }
}

class GetConfTaskQueue extends AsyncQueue {
    async funcBetweenTasks(): Promise<void> {
        await sleep(1000);
    }
}
