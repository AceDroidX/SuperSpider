<template>
  <img
    :src="`/GitHub-Mark${$vuetify.theme.current.dark ? '-Light-' : '-'}64px.png`"
  />
</template>

<script>
export default {
  name: 'GithubIcon',
}
</script>
