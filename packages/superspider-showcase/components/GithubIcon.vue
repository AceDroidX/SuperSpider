<template>
  <img
    :src="
      require(`~/assets/GitHub-Mark${
        $vuetify.theme.dark ? '-Light-' : '-'
      }64px.png`)
    "
  />
</template>

<script>
export default {
  name: 'GithubIcon',
}
</script>
