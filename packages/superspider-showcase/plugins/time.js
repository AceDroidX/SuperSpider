export default (context, inject) => {
    const getTime = (timestamp) => getTimeF(timestamp)
    // Inject $hello(msg) in Vue, context and store.
    inject('getTime', getTime)
}

function getTimeF(timestamp = undefined) {
    let hasMilliSeconds = true
    let now
    if (timestamp === undefined) {
        now = new Date()
    } else {
        if (timestamp.toString().length === 10) {
            timestamp = timestamp * 1000
            hasMilliSeconds = false
        }
        now = new Date(timestamp)
    }
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    const hour = now.getHours().toString().padStart(2, '0')
    const minute = now.getMinutes().toString().padStart(2, '0')
    const second = now.getSeconds().toString().padStart(2, '0')
    const milli = now.getMilliseconds().toString().padStart(3, '0')
    let time
    if (hasMilliSeconds) {
        time = `${year}-${month}-${day} ${hour}:${minute}:${second}.${milli}`
    } else {
        time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
    return time
}