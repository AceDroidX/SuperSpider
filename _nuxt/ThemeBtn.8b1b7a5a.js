import{a as r,o as s,c as i,w as m,f as h,I as l}from"./entry.2cf9485d.js";import{V as n}from"./VIcon.bc6126ba.js";import{V as c}from"./VBtn.f28c6d8c.js";import"./tag.7f81d670.js";import"./color.f22f3f2e.js";import"./index.d7643f03.js";import"./router.295f1ffd.js";import"./position.9ad51159.js";const g={name:"ThemeBtn",data(){return{iconText:"mdi-brightness-auto",themeList:["auto","true","false"]}},mounted(){this.setVuetifyTheme(),this.setIconText(),this.addBrowserDarkListener()},methods:{changeStorageTheme(){localStorage.theme==null&&localStorage.setItem("theme","auto"),console.log(localStorage.theme),console.log(this.themeList.indexOf(localStorage.theme)),console.log(this.themeList[this.themeList.indexOf(localStorage.theme)+1]),localStorage.setItem("theme",this.themeList[(this.themeList.indexOf(localStorage.theme)+1)%this.themeList.length]),this.setVuetifyTheme(),this.setIconText()},setVuetifyTheme(){localStorage.theme!=="true"&&localStorage.theme!=="false"?this.$vuetify.theme.global.name=this.getDarkValueFromBrowser()?"dark":"light":this.$vuetify.theme.global.name=localStorage.theme==="true"?"dark":"light"},setIconText(){this.iconText=localStorage.theme!=="true"&&localStorage.theme!=="false"?"mdi-brightness-auto":`mdi-brightness-${localStorage.theme==="true"?"4":"6"}`},getDarkValueFromBrowser(){return window.matchMedia("(prefers-color-scheme: dark)").matches},addBrowserDarkListener(){window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{localStorage.theme==="true"||localStorage.theme==="false"||(this.$vuetify.theme.global.name=e.matches?"dark":"light")})}}};function d(t,e,u,f,o,a){return s(),i(c,{icon:"",onClick:e[0]||(e[0]=l(p=>a.changeStorageTheme(),["stop"]))},{default:m(()=>[h(n,{icon:o.iconText},null,8,["icon"])]),_:1})}const V=r(g,[["render",d]]);export{V as default};
