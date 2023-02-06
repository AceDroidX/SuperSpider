// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
    // https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html
    css: ['vuetify/lib/styles/main.sass'],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        // https://next.vuetifyjs.com/en/features/treeshaking/
        // https://nuxt.com/docs/api/advanced/hooks
        async (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (viteInlineConfig, env) => { viteInlineConfig.plugins ? viteInlineConfig.plugins.push(vuetify()) : viteInlineConfig.plugins = [vuetify()] })
        }
    ],
    runtimeConfig: {
        public: {
            NODE_ENV: process.env.NODE_ENV,
            BASE_API_URL:
                process.env.NODE_ENV === 'production' ? process.env.BASE_API_URL : 'http://localhost:2162',
            version: process.env.npm_package_version,
            GIT_HASH: process.env.GITHUB_SHA,
            ROOM_ID: process.env.room_id ? process.env.room_id.split(',') : ['21452505', '80397'],
        }
    },
    app: {
        head: {
            titleTemplate: '%s - superspider-showcase',
            title: 'superspider-showcase',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'referrer', content: 'never' },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    }
})
