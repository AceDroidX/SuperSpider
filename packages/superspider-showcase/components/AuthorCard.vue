<template>
  <v-card
    class="mx-auto"
    :style="{ 'background-color': $vuetify.theme.dark ? '#363636' : '#ffffff' }"
    outlined
  >
    <v-list dense nav>
      <v-list-item class="ma-0 pa-0">
        <v-list-item-title>
          <v-btn
            rounded
            text
            small
            class="text-body-2"
            href="https://github.com/AceDroidX/SuperSpider"
            target="_blank"
          >
            <v-icon small>custom:github</v-icon>
            BiliSC</v-btn
          >
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="ma-0 pa-0">
        <v-list-item-title>
          <v-btn
            rounded
            text
            small
            class="text-body-2"
            href="https://github.com/AceDroidX"
            target="_blank"
          >
            <v-icon small> mdi-account-circle </v-icon> AceDroidX</v-btn
          >
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="ma-0 pa-0">
        <v-list-item-title>
          <v-btn
            rounded
            text
            small
            class="text-body-2"
            href="https://github.com/Afanyiyu"
            target="_blank"
          >
            <v-icon small> mdi-account-circle </v-icon> Il Harper
            (原作者)</v-btn
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
