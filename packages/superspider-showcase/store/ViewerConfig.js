export const state = () => ({
    room: '21452505',
    showMarkNative: true,
    pageLimit: '100',
    startFetch: 0,
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
    }
}