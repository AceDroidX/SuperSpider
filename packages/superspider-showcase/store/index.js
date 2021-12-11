export const state = () => ({
  // locales: ['ja', 'zh'],
  // locale: 'ja',
  locales: ['zh', 'ja'],
  locale: 'zh',
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
}
