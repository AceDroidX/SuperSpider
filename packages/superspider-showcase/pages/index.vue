<template>
  <v-container>
    <div v-for="liveItem in scData" :key="liveItem.ts" align="center">
      <div v-for="item in liveItem.data" :key="item._id" style="margin: 20px">
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
          v-if="
            Number(item.hide) == 0 &&
            (Number(item.sc) == 1 || (Number(item.sc) == 0 && showGiftNative))
          "
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { openDB } from 'idb'
export default {
  name: 'FullSCViewer',
  layout: 'viewer',
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
    showMarkNative() {
      // this.fetchAdd()
      this.updateData(this.scData)
    },
    room() {
      this.fetchAdd()
    },
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
    beforeDestroy() {
      if (this.timer) clearTimeout(this.timer)
    },
    async startFetchData() {
      if (!this.room) return
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
      let err = false
      const scData = await this.$axios({
        url: process.env.baseApiUrl + '/sc/getData',
        method: 'POST',
        data: `roomid=${this.room}&limit=${this.pageLimit}${
          this.giftFilterNative ? '&filter=on' : ''
        }`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).catch(() => {
        err = true
      })
      if (err) return
      await this.updateData(scData.data)
    },
    async updateData(scData) {
      try {
        // this.$nuxt.$loading.start()
        // this.scData = scData.data
        for (const item of scData) {
          item.data.sort((a, b) => Number(b.ts) - Number(a.ts))
        }
        scData.sort((a, b) => Number(b.ts) - Number(a.ts))
        const newSCData = []
        let his = 0
        for (const item of scData) {
          for (const data of item.data) {
            if (this.showMarkNative)
              data.markstate = await this.getMarkState(data._id)
            else data.markstate = 0
            // data.markstate = 0
          }
          his++
          if (his === 2) newSCData.push({ ...item, history: true })
          else newSCData.push(item)
        }
        this.scData = newSCData
      } catch (e) {
        console.error(e)
      } finally {
        // this.$nuxt.$loading.finish()
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
