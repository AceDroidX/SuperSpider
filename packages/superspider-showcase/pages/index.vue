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
      started: false,
      timer: false,
      addText: '',
      fontStyle: '',
      bgColor: '',
      bgColorList: ['#304156', '#473252', '#00463f'],
      snackbar: false,
      snackbarText: 'Error',
    }
  },
  head: {
    title: 'BiliSC',
  },
  computed: {
    showTime() {
      return this.$route.query.showTime
        ? this.$route.query.showTime === 'true'
        : false // This controls the default value
    },
    showKana() {
      return this.$route.query.showKana
        ? this.$route.query.showKana === 'true'
        : true
    },
    showGift() {
      return this.$route.query.showGift
        ? this.$route.query.showGift === 'true'
        : true
    },
    giftFilter() {
      return this.$route.query.giftFilter
        ? this.$route.query.giftFilter === 'true'
        : true
    },
    ...mapState({
      room: (state) => state.ViewerConfig.room,
      pageLimit: (state) => state.ViewerConfig.pageLimit,
      showMarkNative: (state) => state.ViewerConfig.showMarkNative,
      startFetch: (state) => state.ViewerConfig.startFetch,
    }),
  },
  watch: {
    showTimeNative() {
      this.fetchAdd()
    },
    showKanaNative() {
      this.fetchAdd()
    },
    showGiftNative() {
      this.fetchAdd()
    },
    giftFilterNative() {
      this.fetchAdd()
    },
    room() {
      this.fetchAdd()
    },
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
