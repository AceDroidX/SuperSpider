export const state = () => ({
    room: '21452505',
    showMarkNative: true,
    startFetch: 0,
    startTS: 0,
    endTS: 0,
})

export const mutations = {
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