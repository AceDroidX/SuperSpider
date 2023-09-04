<template>
  <div>
    <h1 />
  </div>
</template>

<script lang="ts">
export default {
  head: {
    title: 'BiliSC',
  },
  mounted() {
    this.$router.push({
      path: '/',
      query: {
        ...this.$route.query,
        // roomid: this.$route.query.roomid || '',
        // lang: this.$route.query.lang || 'ja'
      },
    })
  },
}
</script>

<style></style>
