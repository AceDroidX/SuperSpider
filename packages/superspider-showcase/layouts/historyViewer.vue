<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      width="400px"
      :clipped="clipped"
      fixed
      app
    >
      <BiliSCLogo :version="version"/>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-content> 标记显示 </v-list-item-content>
          <v-list-item-content>
            <v-switch
              v-model="showMarkNative"
              hide-details
              class="ma-0 pa-0"
            ></v-switch>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content> 房间号 </v-list-item-content>
          <v-list-item-content>
            <v-select
              v-model="room"
              :items="$config.ROOM_ID"
              hide-details
              class="ma-0 pa-0"
            ></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-menu
              ref="startDateMenu"
              v-model="startDateMenu"
              :close-on-content-click="false"
              :return-value.sync="startDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  label="开始日期"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                no-title
                scrollable
                locale="zh-cn"
                ><v-spacer></v-spacer>
                <v-btn text @click="startDateMenu = false"> 取消 </v-btn>
                <v-btn text @click="$refs.startDateMenu.save(startDate)">
                  确定
                </v-btn></v-date-picker
              >
            </v-menu></v-list-item-content
          >
          <v-list-item-content>
            <v-menu
              ref="startTimeMenu"
              v-model="startTimeMenu"
              :close-on-content-click="false"
              :return-value.sync="startTime"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="startTime"
                  label="开始时间"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-model="startTime" format="24hr" scrollable
                ><v-spacer></v-spacer>
                <v-btn text @click="startTimeMenu = false"> 取消 </v-btn>
                <v-btn text @click="$refs.startTimeMenu.save(startTime)">
                  确定
                </v-btn></v-time-picker
              >
            </v-menu>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-menu
              ref="endDateMenu"
              v-model="endDateMenu"
              :close-on-content-click="false"
              :return-value.sync="endDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="截止日期"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                no-title
                scrollable
                locale="zh-cn"
                ><v-spacer></v-spacer>
                <v-btn text @click="endDateMenu = false"> 取消 </v-btn>
                <v-btn text @click="$refs.endDateMenu.save(endDate)">
                  确定
                </v-btn></v-date-picker
              >
            </v-menu></v-list-item-content
          >
          <v-list-item-content>
            <v-menu
              ref="endTimeMenu"
              v-model="endTimeMenu"
              :close-on-content-click="false"
              :return-value.sync="endTime"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="endTime"
                  label="截止时间"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-model="endTime" format="24hr" scrollable
                ><v-spacer></v-spacer>
                <v-btn text @click="endTimeMenu = false"> 取消 </v-btn>
                <v-btn text @click="$refs.endTimeMenu.save(endTime)">
                  确定
                </v-btn></v-time-picker
              >
            </v-menu>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content><v-spacer /></v-list-item-content>
          <v-list-item-content>
            <v-btn @click="setStartFetch(startFetch + 1)">GO</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content
            ><v-btn @click="newVersionDialog = true"
              >更新日志</v-btn
            ></v-list-item-content
          >
          <v-list-item-content
            ><v-btn nuxt to="/">实时SC</v-btn></v-list-item-content
          >
        </v-list-item>
        <v-list-item>
          <IntroText />
        </v-list-item>
      </v-list>
      <v-dialog
        v-model="newVersionDialog"
        width="500"
        @click:outside="setVersion"
      >
        <v-card>
          <v-card-title class="text-h5"> 更新日志 </v-card-title>
          <ChangelogText/>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="setVersion"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>
    <v-app-bar
      :collapse="!drawer"
      :collapse-on-scroll="false"
      scroll-target="#scrolling-techniques-6"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <ThemeBtn />
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon v-text="'mdi-application'"></v-icon>
      </v-btn>
    </v-app-bar>
    <v-main id="scrolling-techniques-6">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'HistorySCViewerLayout',
  data() {
    return {
      clipped: true,
      drawer: true,
      right: true,
      rightDrawer: false,
      title: 'BiliSC',
      collapseOnScroll: true,
      newVersionDialog: false,
      version: 'null',
      startDate: this.$getTime().substring(0, 10),
      startTime: '00:00',
      endDate: this.$getTime().substring(0, 10),
      endTime: '00:00',
      startDateMenu: false,
      startTimeMenu: false,
      endDateMenu: false,
      endTimeMenu: false,
    }
  },
  computed: {
    room: {
      get() {
        return this.$store.state.HistoryViewerConfig.room
      },
      set(value) {
        this.$store.commit('HistoryViewerConfig/setRoom', value)
      },
    },
    pageLimit: {
      get() {
        return this.$store.state.HistoryViewerConfig.pageLimit
      },
      set(value) {
        this.$store.commit('HistoryViewerConfig/setPageLimit', value)
      },
    },
    showMarkNative: {
      get() {
        return this.$store.state.HistoryViewerConfig.showMarkNative
      },
      set(value) {
        this.$store.commit('HistoryViewerConfig/setShowMarkNative', value)
      },
    },
    ...mapState({
      startFetch: (state) => state.HistoryViewerConfig.startFetch,
      startTS: (state) => state.HistoryViewerConfig.startTS,
      endTS: (state) => state.HistoryViewerConfig.endTS,
    }),
    timeChanged() {
      return (
        this.startDate +
        ' ' +
        this.startTime +
        ':00' +
        ' - ' +
        this.endDate +
        ' ' +
        this.endTime +
        ':00'
      )
    },
  },
  watch: {
    startFetch() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          this.drawer = false
          break
      }
    },
    timeChanged() {
      this.setStartTS(Date.parse(this.startDate + ' ' + this.startTime) / 1000)
      this.setEndTS(Date.parse(this.endDate + ' ' + this.endTime) / 1000)
    },
  },
  mounted() {
    this.version = this.$config.version
    const version = localStorage.getItem('version')
    if (this.$config.version !== version) {
      console.log('version changed')
      this.newVersionDialog = true
    }
  },
  methods: {
    ...mapMutations({
      setStartFetch: 'HistoryViewerConfig/setStartFetch',
      setStartTS: 'HistoryViewerConfig/setStartTS',
      setEndTS: 'HistoryViewerConfig/setEndTS',
    }),
    log(value) {
      console.log(value)
    },
    setVersion() {
      localStorage.setItem('version', this.$config.version)
      this.newVersionDialog = false
    },
  },
}
</script>
