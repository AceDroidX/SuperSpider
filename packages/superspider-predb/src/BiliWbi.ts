import axios from 'axios'
import md5 from 'md5'

const mixinKeyEncTab = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
    33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
    61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
    36, 20, 34, 44, 52
]

// 对 imgKey 和 subKey 进行字符顺序打乱编码
const getMixinKey = (orig: string) =>
    mixinKeyEncTab
        .map((n) => orig[n])
        .join("")
        .slice(0, 32);

// 为请求参数进行 wbi 签名
function encWbi(
    params: { [key: string]: string | number | object },
    img_key: string,
    sub_key: string
) {
    const mixin_key = getMixinKey(img_key + sub_key),
        curr_time = Math.round(Date.now() / 1000),
        chr_filter = /[!'()*]/g;

    Object.assign(params, { wts: curr_time }); // 添加 wts 字段
    // 按照 key 重排参数
    const query = Object.keys(params)
        .sort()
        .map((key) => {
            // 过滤 value 中的 "!'()*" 字符
            const value = params[key].toString().replace(chr_filter, "");
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join("&");

    const wbi_sign = md5(query + mixin_key); // 计算 w_rid

    return query + "&w_rid=" + wbi_sign;
}

// 获取最新的 img_key 和 sub_key
async function getWbiKeys() {
    const res = await axios.get('https://api.bilibili.com/x/web-interface/nav', { headers })
    const {
        data: {
            wbi_img: { img_url, sub_url },
        },
    } = res.data as {
        data: {
            wbi_img: { img_url: string; sub_url: string };
        };
    };

    return {
        img_key: img_url.slice(
            img_url.lastIndexOf('/') + 1,
            img_url.lastIndexOf('.')
        ),
        sub_key: sub_url.slice(
            sub_url.lastIndexOf('/') + 1,
            sub_url.lastIndexOf('.')
        )
    }
}

const UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Trailer/93.3.3570.29'
const cookie = process.env['cookie'] ?? 'buvid3=12345678-1234-1234-1234-123456789123infoc'
export const headers = { 'user-agent': UserAgent, 'referer': 'https://space.bilibili.com/', cookie }

var wbi_keys = {
    img_key: "",
    sub_key: "",
}
var wbi_keys_timestamp = 0
const roll_keys_interval = 1 * 60 * 60 * 1000

async function calculateSignQuery(params: any) {
    if (new Date().getTime() - wbi_keys_timestamp > roll_keys_interval) {
        wbi_keys = await getWbiKeys()
        wbi_keys_timestamp = new Date().getTime()
    }
    return encWbi(
        params,
        wbi_keys.img_key,
        wbi_keys.sub_key,
    )
}

export async function BiliGet<T = any>(baseUrl: string, params: any) {
    const query = await calculateSignQuery(params)
    const url = baseUrl + "?" + query
    // console.log(url, headers)
    return axios.get<T>(url, { headers })
}

var w_webid: string | undefined
var w_webid_timestamp = 0
const roll_w_webid_interval = 12 * 60 * 60 * 1000 // 12 hours

/**
 * **风控升级后可能需要修改代码 使对应的url获取对应的access_id**
 *
 * 此处的access_id实质为jwt字符串 此处将所有url使用同一个access_id
 *
{
  "spm_id": "0.0",
  "buvid": "...",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "buvid_fp": "...",
  "bili_ticket": "...",
  "created_at": 1733836924,
  "ttl": 86400,
  "url": "/434334701",
  "result": "normal",
  "iss": "gaia",
  "iat": 1733836924
}
 */
async function fetch_w_webid(): Promise<string | undefined> {
    const resp = await axios.get<string>('https://space.bilibili.com/434334701', { headers })
    const regex = /<script id="__RENDER_DATA__" type="application\/json">(.*?)<\/script>/;
    const match = resp.data.match(regex);
    if (!match) {
        console.error('fetch_w_webid: no match');
        return
    }
    const content = JSON.parse(decodeURIComponent(match[1])) as { access_id: string };
    // console.log(content)
    return content.access_id
}

export async function get_w_webid() {
    if (w_webid && new Date().getTime() - w_webid_timestamp < roll_w_webid_interval) return w_webid
    w_webid = await fetch_w_webid()
    w_webid_timestamp = new Date().getTime()
    return w_webid
}
