<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      width="400px"
      :clipped="clipped"
      fixed
      app
    >
      <div align-center style="text-align: center">
        <img
          :src="
            require(`~/assets/${
              $vuetify.theme.dark ? 'Logo_Trans' : 'Logo'
            }.png`)
          "
          height="150px"
          width="150px"
          style="text-align: center"
        />
      </div>
      <v-list-item align-center style="text-align: center">
        <v-list-item-content>
          <v-list-item-title class="text-h6"> BiliSC </v-list-item-title>
          <v-list-item-subtitle> v{{ version }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
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
          <v-list-item-content> 显示数量 </v-list-item-content>
          <v-list-item-content>
            <v-text-field
              v-model="pageLimit"
              hide-details
              class="ma-0 pa-0"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content> 房间号 </v-list-item-content>
          <v-list-item-content>
            <v-select
              v-model="room"
              :items="['21452505', '80397']"
              hide-details
              class="ma-0 pa-0"
            ></v-select>
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
          <v-list-item-content><v-btn @click="newVersionDialog = true">更新日志</v-btn></v-list-item-content>
          <v-list-item-content><v-btn nuxt to="/history">历史SC</v-btn></v-list-item-content>
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
      <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon v-text="`mdi-brightness-${$vuetify.theme.dark ? '4' : '6'}`" />
      </v-btn>
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
  name: 'SCViewerLayout',
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
    }
  },
  computed: {
    room: {
      get() {
        return this.$store.state.ViewerConfig.room
      },
      set(value) {
        this.$store.commit('ViewerConfig/setRoom', value)
      },
    },
    pageLimit: {
      get() {
        return this.$store.state.ViewerConfig.pageLimit
      },
      set(value) {
        this.$store.commit('ViewerConfig/setPageLimit', value)
      },
    },
    showMarkNative: {
      get() {
        return this.$store.state.ViewerConfig.showMarkNative
      },
      set(value) {
        this.$store.commit('ViewerConfig/setShowMarkNative', value)
      },
    },
    ...mapState({
      startFetch: (state) => state.ViewerConfig.startFetch,
    }),
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
  },
  mounted() {
    this.version = process.env.version
    const version = localStorage.getItem('version')
    if (process.env.version !== version) {
      console.log('version changed')
      this.newVersionDialog = true
    }
  },
  methods: {
    ...mapMutations({
      setStartFetch: 'ViewerConfig/setStartFetch',
    }),
    log(value) {
      console.log(value)
    },
    setVersion() {
      localStorage.setItem('version', process.env.version)
      this.newVersionDialog = false
    },
  },
}
</script>
