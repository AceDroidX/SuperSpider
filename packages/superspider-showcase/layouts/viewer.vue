<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" width="400px" :clipped="clipped" fixed app>
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
          <v-list-item-subtitle> v2.0.0 </v-list-item-subtitle>
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
          <v-list-item-content> 每页显示数量 </v-list-item-content>
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
          <v-list-item-content> </v-list-item-content>
          <v-list-item-content>
            <v-btn @click="setStartFetch(startFetch + 1)">GO</v-btn>
          </v-list-item-content>
        </v-list-item>
        <p>
          如果获取成功，页面顶端将会显示蓝条并加载SC。<br />如果获取失败，页面顶端将会显示红条。<br />
          消息将会自动更新。可以将下面的链接(还未完工)放入OBS中显示。<br />
          如有问题请联系<a href="https://github.com/AceDroidX" target="_blank"
            >AceDroidX</a
          ><br />
          本网站在<a
            href="https://github.com/dd-center/SuperSpider"
            target="_blank"
            >原项目</a
          >的基础上稍作修改，特别感谢原作者
          <a href="https://github.com/Afanyiyu" target="_blank">Il Harper</a>
          的帮助。<br />
          由于服务器资源限制，本网站暂时只记录21452505、80397(510)直播间
        </p>
        <p>
          <a target="_blank" href="https://github.com/AceDroidX/SuperSpider"
            ><img
              alt="Star BiliSC! "
              src="https://img.shields.io/github/stars/AceDroidX/SuperSpider?color=brightgreen&label=github%20stars&style=flat-square"
          /></a>
        </p>
      </v-list>
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
    startFetch () {
      switch(this.$vuetify.breakpoint.name){
        case 'xs':
        case 'sm':
          this.drawer = false
          break
      }
    },
  },
  methods: {
    ...mapMutations({
      setStartFetch: 'ViewerConfig/setStartFetch',
    }),
    log(value) {
      console.log(value)
    },
  },
}
</script>
