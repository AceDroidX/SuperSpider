<template>
  <v-card
    class="mx-auto"
    :style="{ 'background-color': $vuetify.theme.dark ? '#363636' : '#ffffff' }"
    outlined
  >
    <v-list dense>
      <v-list-item>
        <v-list-item-title>
          <v-btn
            rounded
            text
            href="https://github.com/AceDroidX/SuperSpider"
            target="_blank"
          >
            <v-icon>$github</v-icon>
            SuperSpider</v-btn
          >
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <v-btn
            rounded
            text
            href="https://github.com/AceDroidX"
            target="_blank"
          >
            <v-icon> mdi-account-circle </v-icon> AceDroidX</v-btn
          >
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <v-btn
            rounded
            text
            href="https://github.com/Afanyiyu"
            target="_blank"
          >
            <v-icon> mdi-account-circle </v-icon> Il Harper (原作者)</v-btn
          >
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AuthorCard',
}
</script>

<style>
.v-btn {
  text-transform: none;
}
.v-icon {
  margin-right: 4px;
}
</style>>
