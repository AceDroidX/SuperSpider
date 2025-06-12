import { cookieStrToMap } from "superspider-shared";
import { AsyncQueue } from "./AsyncQueue";
import { BiliGet } from "./BiliWbi";

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
                ...(await getConf(roomid)),
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
): Promise<{ key: string; host: string; address: string }> {
    const {
        data: {
            token: key,
            host_list: [{ host }],
        },
    } = (
        await BiliGet('https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo', {
            id: roomid,
            type: 0,
            web_location: '0.0',
        })
    ).data;
    const address = `wss://${host}/sub`;
    return { key, host, address };
}
