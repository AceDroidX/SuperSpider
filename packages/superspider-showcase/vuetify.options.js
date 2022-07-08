import colors from 'vuetify/es5/util/colors'
import GithubIcon from '@/components/GithubIcon.vue'

export default {
  customVariables: ['~/assets/variables.scss'],
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
    },
  },
  icons: {
    values: {
      github: { // name of our custom icon
        component: GithubIcon, // our custom component
      },
    },
  },
}
