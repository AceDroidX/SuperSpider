<template>
  <v-container>
    <div align="center">
      <div v-for="item in scData" :key="item._id" style="margin: 20px">
        <!--
                              :title="
                  item.uname +
                    ($i18n.locale !== 'ja'
                      ? ''
                      : item.unamejpn
                      ? ' (' + item.unamejpn + ')'
                      : '')
                "
            -->
        <SuperChat
          :title="item.uname"
          :price="Number(item.price)"
          :message="item.msg"
          :messagejpn="''"
          :avatar="item.avatar"
          :contentcolor="item.bcolor"
          :headercolor="item.pcolor"
          :exrate="item.exRate"
          :hiderate="true"
          :ts="item.ts"
          :markstate="item.markstate"
          style="max-width: 700px"
          align="left"
          @click.native="changeMarkState(item._id)"
        />
      </div>
    </div>
    <v-snackbar v-model="snackbar"> {{ snackbarText }} </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { openDB } from 'idb'
export default {
  name: 'HistorySCViewer',
  layout: 'historyViewer',
  data() {
    return {
      scData: [],
      started: false,
      timer: false,
      addText: '',
      fontStyle: '',
      bgColor: '',
      bgColorList: ['#304156', '#473252', '#00463f'],
      db: undefined,
      dbReq: undefined,
      snackbar: false,
      snackbarText: '',
    }
  },
  head: {
    title: 'BiliSC',
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

    this.db = await openDB('BiliSC', undefined, {
      upgrade(db) {
        console.log('upgrade')
        const objectStore = db.createObjectStore('MarkState', {
          keyPath: 'id',
        })
        objectStore.createIndex('id', 'id', { unique: true })
      },
    })
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
          url: process.env.baseApiUrl + '/sc/getDataByTS',
          method: 'POST',
          data: `roomid=${this.room}&start=${this.startTS}&end=${this.endTS}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        await this.updateData(scData.data)
      } catch (e) {
        this.snackbar = true
        console.error(e)
        console.error(e.response)
        if (e.response.data)
          this.snackbarText = e.message + '\n' + e.response.data
        else this.snackbarText = e.message
      }
    },
    async updateData(scData) {
      try {
        for (const data of scData) {
          if (this.showMarkNative)
            data.markstate = await this.getMarkState(data._id)
          else data.markstate = 0
        }
        this.scData = scData
      } catch (e) {
        console.error(e)
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
    async changeMarkState(id) {
      if (!this.showMarkNative) return
      console.log('change state:' + id)
      if (this.db === undefined) return
      if ((await this.getMarkState(id)) === 1) {
        await this.deleteMarkState(id)
      } else {
        await this.setMarkState(id, 1)
      }
      await this.updateData(this.scData)
    },
    async getMarkState(id) {
      if (this.db === undefined) return
      const res = await this.db.get('MarkState', id)
      if (res) return res.state
      return 0
    },
    async deleteMarkState(id) {
      if (this.db === undefined) return
      await this.db.delete('MarkState', id)
    },
    async setMarkState(id, state) {
      if (this.db === undefined) return
      await this.db.put('MarkState', { id, state })
    },
  },
}
</script>
