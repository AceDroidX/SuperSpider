import { Collection } from "mongodb";

interface IDBAppContext {
    maindb: Collection;
    livedb: Collection;
}
interface IDBAppState {
    // amdb: Collection;
}

export {
    IDBAppContext,
    IDBAppState
}