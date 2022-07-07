<template>
  <v-container>
    <div align="center">
      <div v-for="item in scData" :key="item.id" style="margin-bottom: 20px">
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
          :uid="item.uid"
          :contentcolor="item.bcolor"
          :headercolor="item.pcolor"
          :hiderate="true"
          :ts="item.ts"
          :markstate="item.markstate"
          style="max-width: 700px"
          align="left"
          @click.native="changeMarkState(item.id)"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import { openDB } from 'idb'
export default {
  name: 'SCList',
  props: {
    rawscdata: {
      type: Array,
      default: () => [],
    },
    showmarknative: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scData: [],
      started: false,
      db: undefined,
    }
  },
  watch: {
    async rawscdata(newVal) {
      await this.updateData(newVal)
    },
  },
  async mounted() {
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
    async updateData(data) {
      try {
        const scData = data.slice()
        for (const [index, data] of scData.entries()) {
          if (data.hide) {
            scData.splice(index, 1)
          }
          if (this.showmarknative) {
            data.markstate = await this.getMarkState(data.id)
          } else {
            data.markstate = 0
          }
        }
        this.scData = scData
      } catch (e) {
        console.error(e)
      }
    },
    async changeMarkState(id) {
      if (!this.showmarknative) return
      console.log('change state:' + id)
      if (this.db === undefined) return
      if ((await this.getMarkState(id)) === 1) {
        await this.deleteMarkState(id)
      } else {
        await this.setMarkState(id, 1)
      }
      await this.updateData(this.rawscdata)
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
