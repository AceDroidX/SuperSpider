<template>
  <div>
    <div align-center style="text-align: center">
      <img
        :src="`/${$vuetify.theme.current.dark ? 'Logo_Trans' : 'Logo_Trans_Dark'}.png`"
        height="150"
        width="150"
        style="text-align: center"
      />
    </div>
    <v-list-item align-center style="text-align: center">
      <div>
        <v-list-item-title class="text-h6"> BiliSC </v-list-item-title>
        <v-list-item-subtitle>
          v{{ version }}{{ GIT_HASH }}
        </v-list-item-subtitle>
      </div>
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
