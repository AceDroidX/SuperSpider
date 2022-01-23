<template>
  <div>
    <SCList :rawscdata="rawSCData" :showmarknative="showMarkNative" />
    <v-snackbar v-model="snackbar"> {{ snackbarText }} </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'MiniSCViewer',
  layout: 'miniViewer',
  data() {
    return {
      rawSCData: [],
      started: false,
      timer: false,
      addText: '',
      fontStyle: '',
      snackbar: false,
      snackbarText: 'Error',
    }
  },
  head() {
    return {
      title: 'BiliSC(mini)',
      titleTemplate: `${this.room} - %s`,
    }
  },
  computed: {
    room() {
      return isNaN(parseFloat(this.$route.query.room))
        ? 21452505 // This controls the default value
        : parseFloat(this.$route.query.room)
    },
    showMarkNative() {
      return this.$route.query.mark
        ? this.$route.query.mark === 'true'
        : true // This controls the default value
    },
    pageLimit() {
      return isNaN(parseFloat(this.$route.query.limit))
        ? 100
        : parseFloat(this.$route.query.limit)
    },
  },
  watch: {
    startFetch() {
      if (this.startFetch) {
        this.startFetchData()
      }
    },
    snackbarText(newval, oldval) {
      console.log(newval, oldval)
    },
    snackbar(newval, oldval) {
      console.log(newval, oldval)
    },
  },
  async mounted() {
      if (this.room && this.room !== '') await this.startFetchData()
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer)
  },
  methods: {
    async startFetchData() {
      if (!this.room) return
      console.log('startFetchData')
      await this.fetchData().catch(() => {})
      if (this.started === this.room) return
      if (this.timer) clearTimeout(this.timer)
      this.setTimeoutLoop()
      this.started = this.room
    },
    setTimeoutLoop() {
      const fn = async () => {
        await this.fetchData().catch(() => {})
        this.timer = setTimeout(fn, 8000)
      }
      this.timer = setTimeout(fn, 8000)
    },
    async fetchData() {
      if (!this.room || isNaN(Number(this.room)) || this.room === '') return
      try {
        const scData = await this.$axios({
          url: process.env.baseApiUrl + '/sc/getData',
          method: 'POST',
          data: `roomid=${this.room}&limit=${this.pageLimit}${
            this.giftFilterNative ? '&filter=on' : ''
          }`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        this.rawSCData = scData.data
      } catch (e) {
        this.snackbar = true
        if (e.response !== undefined) {
          if (e.response.data !== undefined)
            this.snackbarText = e.message + '\n' + e.response.data
          else this.snackbarText = e.name + ': ' + e.message
        } else {
          this.snackbarText = e.name + ': ' + e.message
        }
        console.warn(e)
      }
    },
  },
}
</script>
