# BiliSC

由[原项目](https://github.com/dd-center/SuperSpider)修改而来  
相比原项目使用pnpm、TypeScript、Vue3、Vuetify3重构并删除了不需要的功能

推荐使用`docker compose`部署，示例请参考`docker-compose.example.yml`

superspider-showcase todo:  

- [x] [useFetch](https://nuxt.com/docs/getting-started/data-fetching)
- [x] vuex persist
- [x] UI修复
- [x] 其他页面修复
- [x] 字体修复
- [x] 更新日志+提交正式版v2.3
- [x] 迁移至Pinia
- [ ] pinia persist
- [ ] 使用TypeScript重构
- [ ] 使用组合式api重构
- [x] 优化侧边栏按钮间隔
- [ ] html2canvas生成SC截图

待上游修复的问题:  

- [ ] v-app-bar collapse-on-scroll (Will fix in Vuetify v3.2.0)

References:  
Vuetify3 in Nuxt3:  
<https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html>  
<https://next.vuetifyjs.com/en/features/treeshaking/>  
<https://nuxt.com/docs/api/advanced/hooks>  
