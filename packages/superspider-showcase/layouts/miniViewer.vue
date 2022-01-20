<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'MiniViewerLayout',
  data() {
    return {
      title: 'BiliSC',
    }
  },
}
</script>
