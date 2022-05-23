<template>
  <div>
    <div align-center style="text-align: center">
      <img
        :src="
          require(`~/assets/${$vuetify.theme.dark ? 'Logo_Trans' : 'Logo'}.png`)
        "
        height="150px"
        width="150px"
        style="text-align: center"
      />
    </div>
    <v-list-item align-center style="text-align: center">
      <v-list-item-content>
        <v-list-item-title class="text-h6"> BiliSC </v-list-item-title>
        <v-list-item-subtitle>
          v{{ version }}{{ GIT_HASH }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    version: {
      type: String,
      default: 'null',
    },
  },
  data() {
    return {
      GIT_HASH: this.$config.GIT_HASH
        ? ' - ' + this.$config.GIT_HASH.slice(0, 7)
        : '',
    }
  },
}
</script>