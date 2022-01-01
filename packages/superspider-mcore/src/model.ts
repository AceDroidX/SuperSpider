import { Collection } from "mongodb";

interface IDBAppContext {
    amdb: Collection;
}
interface IDBAppState {
    // amdb: Collection;
}

export {
    IDBAppContext,
    IDBAppState
}