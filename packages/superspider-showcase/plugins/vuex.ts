import { store } from '../store/ViewerConfig'
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(store)
})
