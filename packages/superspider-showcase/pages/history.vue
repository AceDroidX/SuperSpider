<template>
  <div>
    <SCList :rawscdata="rawSCData" :showmarknative="showMarkNative" />
    <v-snackbar v-model="snackbar"> {{ snackbarText }} </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HistorySCViewer',
  layout: 'historyViewer',
  data() {
    return {
      rawSCData: [],
      started: false,
      timer: false,
      addText: '',
      fontStyle: '',
      bgColor: '',
      bgColorList: ['#304156', '#473252', '#00463f'],
      snackbar: false,
      snackbarText: '',
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
      room: (state) => state.HistoryViewerConfig.room,
      showMarkNative: (state) => state.HistoryViewerConfig.showMarkNative,
      startFetch: (state) => state.HistoryViewerConfig.startFetch,
      startTS: (state) => state.HistoryViewerConfig.startTS,
      endTS: (state) => state.HistoryViewerConfig.endTS,
    }),
  },
  watch: {
    startFetch() {
      if (this.startFetch) {
        this.startFetchData()
      }
    },
  },
  async mounted() {
    this.bgColor = this.bgColorList[Math.floor(Math.random() * 3)]
    if (this.$route.query.roomid) {
      if (this.room && this.room !== '') await this.startFetchData()
    }
    this.fetchAdd()
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer)
  },
  methods: {
    fetchAdd() {
      this.addText =
        'https://bilisc.com/sc/obs?roomid=' +
        this.room +
        '&showTime=' +
        this.showTimeNative +
        '&showKana=' +
        this.showKanaNative +
        '&showGift=' +
        this.showGiftNative +
        '&giftFilter=' +
        this.giftFilterNative
    },
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
          url: this.$config.BASE_API_URL + '/sc/getDataByTS',
          method: 'POST',
          data: `roomid=${this.room}&start=${this.startTS}&end=${this.endTS}`,
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
    openLink(link, extra) {
      if (extra)
        window.open(
          link,
          'BiliSC for OBS',
          'menubar=0,location=0,scrollbars=0,toolbar=0,width=600,height=600'
        )
      else window.open(link)
    },
  },
}
</script>
