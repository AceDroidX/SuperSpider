// plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import type { IconSet, IconAliases, IconProps } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { GithubIcon } from '#components'
const custom: IconSet = {
    component: (props: IconProps) => h(GithubIcon),
}

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        // components,
        // directives,
        icons: {
            defaultSet: 'mdi',
            sets: {
                mdi,
                custom,
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
