import { createStore } from 'vuex'

const ViewerConfig = {
    namespaced: true,
    state: {
        room: '21452505',
        showMarkNative: true,
        pageLimit: '100',
        startFetch: 0,
    },
    mutations: {
        setRoom(state, room) {
            state.room = room
        },
        setShowMarkNative(state, showMarkNative) {
            state.showMarkNative = showMarkNative
        },
        setPageLimit(state, pageLimit) {
            state.pageLimit = pageLimit
        },
        setStartFetch(state, startFetch) {
            state.startFetch = startFetch
        }
    }
}

const HistoryViewerConfig = {
    namespaced: true,
    state: {
        room: '21452505',
        showMarkNative: true,
        pageLimit: '100',
        startFetch: 0,
        startTS: 0,
        endTS: 0,
    },
    mutations: {
        setRoom(state, room) {
            state.room = room
        },
        setShowMarkNative(state, showMarkNative) {
            state.showMarkNative = showMarkNative
        },
        setPageLimit(state, pageLimit) {
            state.pageLimit = pageLimit
        },
        setStartFetch(state, startFetch) {
            state.startFetch = startFetch
        },
        setStartTS(state, startTS) {
            state.startTS = startTS
        },
        setEndTS(state, endTS) {
            state.endTS = endTS
        },
    }
}

export const store = createStore({
    modules: {
        ViewerConfig: ViewerConfig,
        HistoryViewerConfig: HistoryViewerConfig
    }
})
