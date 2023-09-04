import axios from "axios";
import { cookieStrToMap } from "superspider-shared";
import { AsyncQueue } from "./AsyncQueue";

const sleep = (t: number) => new Promise((r) => setTimeout(r, t));

export class GetConfTask {
    queue = GetConfTaskQueue.create("ConfTask");
    async getConf(roomid: number, cookie?: string) {
        return await this.queue.push(async () => {
            const cookieMap = cookie
                ? (cookieStrToMap(cookie) as {
                    buvid3?: string;
                    SESSDATA?: string;
                    DedeUserID?: string;
                })
                : undefined;
            return {
                ...(await getConf(roomid, cookie)),
                protover: 3,
                uid: Number(cookieMap?.DedeUserID),
                buvid: cookieMap?.buvid3,
            };
        });
    }
}

class GetConfTaskQueue extends AsyncQueue {
    async funcBetweenTasks(): Promise<void> {
        await sleep(1000);
    }
}

async function getConf(
    roomid: number,
    cookie?: string
): Promise<{ key: string; host: string; address: string }> {
    const {
        data: {
            token: key,
            host_list: [{ host }],
        },
    } = (
        await axios.get(
            `https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=${roomid}`,
            { headers: { cookie } }
        )
    ).data;
    const address = `wss://${host}/sub`;
    return { key, host, address };
}
