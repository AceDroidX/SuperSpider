<template>
  <v-img
    :src="
      require(`~/assets/GitHub-Mark${
        $vuetify.theme.dark ? '-Light-' : '-'
      }64px.png`)
    "
  ></v-img>
</template>

<script>
export default {
  name: 'GithubIcon',
}
</script>
