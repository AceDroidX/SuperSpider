import { Collection } from "mongodb";

interface IDBAppContext {
    maindb: Collection;
    livedb: Collection;
}
interface IDBAppState {
    // amdb: Collection;
}

interface URLParaGetData {
    roomid: string
    limit: string
}

interface URLParaGetDataByTS {
    roomid: string
    start: string
    end: string
}

export {
    IDBAppContext,
    IDBAppState,
    URLParaGetData,
    URLParaGetDataByTS,
}
