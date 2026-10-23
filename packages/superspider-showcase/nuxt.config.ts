// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
    // Keep the existing root-level pages, layouts, plugins and stores in Nuxt 4.
    srcDir: '.',
    // https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html
    // css: ['vuetify/lib/styles/main.sass'],
    // build: {
    //     transpile: ['vuetify'],
    // },
    modules: [
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        // https://next.vuetifyjs.com/en/features/treeshaking/
        // https://nuxt.com/docs/api/advanced/hooks
        async (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (viteInlineConfig) => {
                viteInlineConfig.plugins?.push(vuetify())
            })
        }
    ],
    runtimeConfig: {
        public: {
            NODE_ENV: process.env.NODE_ENV,
            version: process.env.npm_package_version,
            GIT_HASH: process.env.GIT_HASH,
            BASE_API_URL: process.env.BASE_API_URL ?? 'http://localhost:2162',
            ROOM_ID: process.env.room_id ?? '21452505,80397',
        }
    },
    app: {
        head: {
            titleTemplate: '%s - superspider-showcase',
            title: 'superspider-showcase',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'referrer', content: 'never' },
            ],
            link: [
                // 在捆绑样式之前确定 Vuetify 的级联层顺序，避免 reset 覆盖组件字体。
                // 保持为 public 静态文件并通过 link 加载，不要改成 JS/SCSS import：
                // Vite 拆包后可能改变样式顺序。详细原因与上游链接见 public/layers.css。
                { rel: 'stylesheet', href: '/layers.css' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        },
    },
    ssr: false,
    compatibilityDate: '2025-06-13',
})
