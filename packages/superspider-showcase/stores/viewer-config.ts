import { defineStore } from 'pinia'

export const ViewerConfig = defineStore('ViewerConfig', {
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
    state: () => ({
        room: '21452505',
        showMarkNative: true,
        pageLimit: '100',
        startFetch: 0,
    }),
})

export const HistoryViewerConfig = defineStore('HistoryViewerConfig', {
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
    state: () => ({
        room: '21452505',
        showMarkNative: true,
        pageLimit: '100',
        startFetch: 0,
        startTS: 0,
        endTS: 0,
    }),
})
