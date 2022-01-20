<template>
  <div>
    <SCList :rawscdata="rawSCData" :showmarknative="showMarkNative" />
    <v-snackbar v-model="snackbar"> {{ snackbarText }} </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'FullSCViewer',
  layout: 'viewer',
  data() {
    return {
      rawSCData: [],
      timer: false,
      addText: '',
      fontStyle: '',
      snackbar: false,
      snackbarText: 'Error',
    }
  },
  head() {
    return {
      title: 'BiliSC',
      titleTemplate: `${this.room} - %s`,
    }
  },
  computed: {
    ...mapState({
      room: (state) => state.ViewerConfig.room,
      pageLimit: (state) => state.ViewerConfig.pageLimit,
      showMarkNative: (state) => state.ViewerConfig.showMarkNative,
      startFetch: (state) => state.ViewerConfig.startFetch,
    }),
  },
  watch: {
    startFetch() {
      if (this.startFetch) {
        this.startFetchData()
      } else {
        this.stopFetchData()
      }
    },
    snackbarText(newval, oldval) {
      console.log(newval, oldval)
    },
    snackbar(newval, oldval) {
      console.log(newval, oldval)
    },
  },
  async mounted() {},
  beforeDestroy() {
    this.stopFetchData()
  },
  methods: {
    // copyText() {
    //   this.$copyText(this.addText).then(
    //     () => {
    //       this.$message(this.$t('common.copySucceed'))
    //     },
    //     () => {
    //       this.$message(this.$t('common.copyFailed'))
    //     }
    //   )
    // },
    async startFetchData() {
      if (!this.room) return
      console.log('startFetchData')
      await this.fetchData()
      if (this.timer) clearTimeout(this.timer)
      this.setTimeoutLoop()
    },
    setTimeoutLoop() {
      const fn = async () => {
        await this.fetchData()
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
    stopFetchData() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = false
      this.rawSCData = []
    },
  },
}
</script>
