(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{108:function(t,e,n){"use strict";var r={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(n(371),n(42)),c=n(51),l=n.n(c),v=n(515),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[404===t.error.statusCode?n("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):n("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),n("NuxtLink",{attrs:{to:"/"}},[t._v(" Home page ")])],1)}),[],!1,null,"6ffeedc3",null);e.a=component.exports;l()(component,{VApp:v.a})},247:function(t,e,n){"use strict";n(4),n(71),n(299),n(24);e.a=function(t,e){e("getTime",(function(t){return function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,n=!0;void 0===e?t=new Date:(10===e.toString().length&&(e*=1e3,n=!1),t=new Date(e));var time,r=t.getFullYear(),o=(t.getMonth()+1).toString().padStart(2,"0"),c=t.getDate().toString().padStart(2,"0"),l=t.getHours().toString().padStart(2,"0"),v=t.getMinutes().toString().padStart(2,"0"),d=t.getSeconds().toString().padStart(2,"0"),f=t.getMilliseconds().toString().padStart(3,"0");time=n?"".concat(r,"-").concat(o,"-").concat(c," ").concat(l,":").concat(v,":").concat(d,".").concat(f):"".concat(r,"-").concat(o,"-").concat(c," ").concat(l,":").concat(v,":").concat(d);return time}(t)}))}},285:function(t,e,n){var content=n(372);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("714e1fbb",content,!0,{sourceMap:!1})},309:function(t,e,n){"use strict";n.r(e);n(33);var r={props:{version:{type:String,default:"null"}},data:function(){return{GIT_HASH:this.$config.GIT_HASH?" - "+this.$config.GIT_HASH.slice(0,7):""}}},o=n(42),c=n(51),l=n.n(c),v=n(161),d=n(30),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticStyle:{"text-align":"center"},attrs:{"align-center":""}},[r("img",{staticStyle:{"text-align":"center"},attrs:{src:n(432)("./"+(t.$vuetify.theme.dark?"Logo_Trans":"Logo")+".png"),height:"150px",width:"150px"}})]),t._v(" "),r("v-list-item",{staticStyle:{"text-align":"center"},attrs:{"align-center":""}},[r("v-list-item-content",[r("v-list-item-title",{staticClass:"text-h6"},[t._v(" BiliSC ")]),t._v(" "),r("v-list-item-subtitle",[t._v("\n        v"+t._s(t.version)+t._s(t.GIT_HASH)+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VListItem:v.a,VListItemContent:d.a,VListItemSubtitle:d.b,VListItemTitle:d.c})},310:function(t,e,n){"use strict";n.r(e);var r=n(42),component=Object(r.a)({},(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("\n  如果获取成功，页面顶端将会显示蓝条并加载SC。"),n("br"),t._v("如果获取失败，页面顶端将会显示红条。"),n("br"),t._v("\n  消息将会自动更新。可以复制链接并放入OBS中显示。"),n("br"),t._v("\n  如有问题请联系"),n("a",{attrs:{href:"https://github.com/AceDroidX",target:"_blank"}},[t._v("AceDroidX")]),n("br"),t._v("\n  本网站在"),n("a",{attrs:{href:"https://github.com/dd-center/SuperSpider",target:"_blank"}},[t._v("原项目")]),t._v("的基础上稍作修改，特别感谢原作者\n  "),n("a",{attrs:{href:"https://github.com/Afanyiyu",target:"_blank"}},[t._v("Il Harper")]),t._v("\n  的帮助。"),n("br"),t._v("\n  由于服务器资源限制，本网站暂时只记录21452505、80397(510)直播间\n  "),n("a",{attrs:{target:"_blank",href:"https://github.com/AceDroidX/SuperSpider"}},[n("br"),n("img",{attrs:{alt:"Star BiliSC! ",src:"https://img.shields.io/github/stars/AceDroidX/SuperSpider?color=brightgreen&label=Github%20Stars&style=flat-square"}})])])}],!1,null,null,null);e.default=component.exports},311:function(t,e,n){"use strict";n.r(e);var r=n(42),o=n(51),c=n.n(o),l=n(79),component=Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card-text",[t._v("\n  BiliSC v2.1.2 (2022.1.20 2cb353d) "),n("br"),t._v("\n  1.添加小窗模式/OBS链接"),n("br"),t._v(" "),n("br"),t._v("\n  BiliSC v2.1.1 (2021.12.30 77a9044) "),n("br"),t._v("\n  1.使用TS重写SC爬虫 "),n("br"),t._v("\n  2.优化网页组件复用"),n("br"),t._v(" "),n("br"),t._v("\n  BiliSC v2.1.0 (2021.12.26 8926c3a) "),n("br"),t._v("\n  1.新增按时间筛选功能 "),n("br"),t._v("\n  2.一些性能优化"),n("br"),t._v(" "),n("br"),t._v("\n  BiliSC v2.0.0 (2021.12.18 8c85f6f) "),n("br"),t._v("\n  1.使用Vuetify重构，删除无用功能"),n("br"),t._v("\n  2.增加暗色模式 "),n("br"),t._v("\n  3.动态自适应各种屏幕大小 "),n("br"),t._v("\n  4.静态构建并托管在Github Pages"),n("br"),t._v(" "),n("font",{attrs:{color:"red"}},[t._v("注意：网站地址已变更，旧地址将会重定向至新页面")]),n("br"),t._v("\n  https://bsc.acedroidx.top/\n")],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VCardText:l.b})},317:function(t,e,n){"use strict";var r={name:"DefaultLayout",data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[{icon:"mdi-apps",title:"Welcome",to:"/"},{icon:"mdi-chart-bubble",title:"Inspire",to:"/inspire"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Vuetify.js"}}},o=n(42),c=n(51),l=n.n(c),v=n(515),d=n(524),f=n(516),m=n(162),h=n(526),_=n(517),w=n(236),V=n(237),k=n(161),x=n(238),S=n(30),T=n(518),D=n(527),y=n(519),C=n(138),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[n("v-navigation-drawer",{attrs:{"mini-variant":t.miniVariant,clipped:t.clipped,fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",t._l(t.items,(function(e,i){return n("v-list-item",{key:i,attrs:{to:e.to,router:"",exact:""}},[n("v-list-item-action",[n("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)],1)})),1)],1),t._v(" "),n("v-app-bar",{attrs:{"clipped-left":t.clipped,fixed:"",app:""}},[n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.miniVariant=!t.miniVariant}}},[n("v-icon",[t._v("mdi-"+t._s("chevron-"+(t.miniVariant?"right":"left")))])],1),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.clipped=!t.clipped}}},[n("v-icon",[t._v("mdi-application")])],1),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.fixed=!t.fixed}}},[n("v-icon",[t._v("mdi-minus")])],1),t._v(" "),n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.rightDrawer=!t.rightDrawer}}},[n("v-icon",[t._v("mdi-menu")])],1)],1),t._v(" "),n("v-main",[n("v-container",[n("Nuxt")],1)],1),t._v(" "),n("v-navigation-drawer",{attrs:{right:t.right,temporary:"",fixed:""},model:{value:t.rightDrawer,callback:function(e){t.rightDrawer=e},expression:"rightDrawer"}},[n("v-list",[n("v-list-item",{nativeOn:{click:function(e){t.right=!t.right}}},[n("v-list-item-action",[n("v-icon",{attrs:{light:""}},[t._v(" mdi-repeat ")])],1),t._v(" "),n("v-list-item-title",[t._v("Switch drawer (click me)")])],1)],1)],1),t._v(" "),n("v-footer",{attrs:{absolute:!t.fixed,app:""}},[n("span",[t._v("© "+t._s((new Date).getFullYear()))])])],1)}),[],!1,null,null,null);e.a=component.exports;l()(component,{VApp:v.a,VAppBar:d.a,VAppBarNavIcon:f.a,VBtn:m.a,VContainer:h.a,VFooter:_.a,VIcon:w.a,VList:V.a,VListItem:k.a,VListItemAction:x.a,VListItemContent:S.a,VListItemTitle:S.c,VMain:T.a,VNavigationDrawer:D.a,VSpacer:y.a,VToolbarTitle:C.a})},318:function(t,e,n){"use strict";n(7),n(6),n(9),n(4),n(14),n(8),n(15);var r=n(1),o=(n(29),n(81));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={name:"HistorySCViewerLayout",data:function(){return{clipped:!0,drawer:!0,right:!0,rightDrawer:!1,title:"BiliSC",collapseOnScroll:!0,newVersionDialog:!1,version:"null",startDate:this.$getTime().substring(0,10),startTime:"00:00",endDate:this.$getTime().substring(0,10),endTime:"00:00",startDateMenu:!1,startTimeMenu:!1,endDateMenu:!1,endTimeMenu:!1}},computed:l(l({room:{get:function(){return this.$store.state.HistoryViewerConfig.room},set:function(t){this.$store.commit("HistoryViewerConfig/setRoom",t)}},pageLimit:{get:function(){return this.$store.state.HistoryViewerConfig.pageLimit},set:function(t){this.$store.commit("HistoryViewerConfig/setPageLimit",t)}},showMarkNative:{get:function(){return this.$store.state.HistoryViewerConfig.showMarkNative},set:function(t){this.$store.commit("HistoryViewerConfig/setShowMarkNative",t)}}},Object(o.c)({startFetch:function(t){return t.HistoryViewerConfig.startFetch},startTS:function(t){return t.HistoryViewerConfig.startTS},endTS:function(t){return t.HistoryViewerConfig.endTS}})),{},{timeChanged:function(){return this.startDate+" "+this.startTime+":00 - "+this.endDate+" "+this.endTime+":00"}}),watch:{startFetch:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":this.drawer=!1}},timeChanged:function(){this.setStartTS(Date.parse(this.startDate+" "+this.startTime)/1e3),this.setEndTS(Date.parse(this.endDate+" "+this.endTime)/1e3)}},mounted:function(){this.version=this.$config.version;var t=localStorage.getItem("version");this.$config.version!==t&&(console.log("version changed"),this.newVersionDialog=!0)},methods:l(l({},Object(o.b)({setStartFetch:"HistoryViewerConfig/setStartFetch",setStartTS:"HistoryViewerConfig/setStartTS",setEndTS:"HistoryViewerConfig/setEndTS"})),{},{log:function(t){console.log(t)},setVersion:function(){localStorage.setItem("version",this.$config.version),this.newVersionDialog=!1}})},d=n(42),f=n(51),m=n.n(f),h=n(515),_=n(524),w=n(516),V=n(162),k=n(239),x=n(79),S=n(526),T=n(521),D=n(520),y=n(240),C=n(236),O=n(237),M=n(161),L=n(30),$=n(518),P=n(242),j=n(527),N=n(522),I=n(519),F=n(525),B=n(118),A=n(523),H=n(138),component=Object(d.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[n("v-navigation-drawer",{attrs:{width:"400px",clipped:t.clipped,fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("BiliSCLogo",{attrs:{version:t.version}}),t._v(" "),n("v-divider"),t._v(" "),n("v-list",{attrs:{dense:"",nav:""}},[n("v-list-item",[n("v-list-item-content",[t._v(" 标记显示 ")]),t._v(" "),n("v-list-item-content",[n("v-switch",{staticClass:"ma-0 pa-0",attrs:{"hide-details":""},model:{value:t.showMarkNative,callback:function(e){t.showMarkNative=e},expression:"showMarkNative"}})],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[t._v(" 房间号 ")]),t._v(" "),n("v-list-item-content",[n("v-select",{staticClass:"ma-0 pa-0",attrs:{items:["21452505","80397"],"hide-details":""},model:{value:t.room,callback:function(e){t.room=e},expression:"room"}})],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-menu",{ref:"startDateMenu",attrs:{"close-on-content-click":!1,"return-value":t.startDate,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){t.startDate=e},"update:return-value":function(e){t.startDate=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-text-field",t._g(t._b({attrs:{label:"开始日期","prepend-icon":"mdi-calendar",readonly:"","hide-details":""},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}},"v-text-field",o,!1),r))]}}]),model:{value:t.startDateMenu,callback:function(e){t.startDateMenu=e},expression:"startDateMenu"}},[t._v(" "),n("v-date-picker",{attrs:{"no-title":"",scrollable:"",locale:"zh-cn"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){t.startDateMenu=!1}}},[t._v(" 取消 ")]),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){return t.$refs.startDateMenu.save(t.startDate)}}},[t._v("\n                确定\n              ")])],1)],1)],1),t._v(" "),n("v-list-item-content",[n("v-menu",{ref:"startTimeMenu",attrs:{"close-on-content-click":!1,"return-value":t.startTime,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){t.startTime=e},"update:return-value":function(e){t.startTime=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-text-field",t._g(t._b({attrs:{label:"开始时间","prepend-icon":"mdi-clock-time-four-outline",readonly:"","hide-details":""},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}},"v-text-field",o,!1),r))]}}]),model:{value:t.startTimeMenu,callback:function(e){t.startTimeMenu=e},expression:"startTimeMenu"}},[t._v(" "),n("v-time-picker",{attrs:{format:"24hr",scrollable:""},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){t.startTimeMenu=!1}}},[t._v(" 取消 ")]),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){return t.$refs.startTimeMenu.save(t.startTime)}}},[t._v("\n                确定\n              ")])],1)],1)],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-menu",{ref:"endDateMenu",attrs:{"close-on-content-click":!1,"return-value":t.endDate,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){t.endDate=e},"update:return-value":function(e){t.endDate=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-text-field",t._g(t._b({attrs:{label:"截止日期","prepend-icon":"mdi-calendar",readonly:"","hide-details":""},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}},"v-text-field",o,!1),r))]}}]),model:{value:t.endDateMenu,callback:function(e){t.endDateMenu=e},expression:"endDateMenu"}},[t._v(" "),n("v-date-picker",{attrs:{"no-title":"",scrollable:"",locale:"zh-cn"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){t.endDateMenu=!1}}},[t._v(" 取消 ")]),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){return t.$refs.endDateMenu.save(t.endDate)}}},[t._v("\n                确定\n              ")])],1)],1)],1),t._v(" "),n("v-list-item-content",[n("v-menu",{ref:"endTimeMenu",attrs:{"close-on-content-click":!1,"return-value":t.endTime,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){t.endTime=e},"update:return-value":function(e){t.endTime=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-text-field",t._g(t._b({attrs:{label:"截止时间","prepend-icon":"mdi-clock-time-four-outline",readonly:"","hide-details":""},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}},"v-text-field",o,!1),r))]}}]),model:{value:t.endTimeMenu,callback:function(e){t.endTimeMenu=e},expression:"endTimeMenu"}},[t._v(" "),n("v-time-picker",{attrs:{format:"24hr",scrollable:""},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){t.endTimeMenu=!1}}},[t._v(" 取消 ")]),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){return t.$refs.endTimeMenu.save(t.endTime)}}},[t._v("\n                确定\n              ")])],1)],1)],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-spacer")],1),t._v(" "),n("v-list-item-content",[n("v-btn",{on:{click:function(e){return t.setStartFetch(t.startFetch+1)}}},[t._v("GO")])],1)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-btn",{on:{click:function(e){t.newVersionDialog=!0}}},[t._v("更新日志")])],1),t._v(" "),n("v-list-item-content",[n("v-btn",{attrs:{nuxt:"",to:"/"}},[t._v("实时SC")])],1)],1),t._v(" "),n("v-list-item",[n("IntroText")],1)],1),t._v(" "),n("v-dialog",{attrs:{width:"500"},on:{"click:outside":t.setVersion},model:{value:t.newVersionDialog,callback:function(e){t.newVersionDialog=e},expression:"newVersionDialog"}},[n("v-card",[n("v-card-title",{staticClass:"text-h5"},[t._v(" 更新日志 ")]),t._v(" "),n("ChangelogText"),t._v(" "),n("v-divider"),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"primary",text:""},on:{click:t.setVersion}},[t._v(" OK ")])],1)],1)],1)],1),t._v(" "),n("v-app-bar",{attrs:{collapse:!t.drawer,"collapse-on-scroll":!1,"scroll-target":"#scrolling-techniques-6","clipped-left":t.clipped,fixed:"",app:""}},[n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.$vuetify.theme.dark=!t.$vuetify.theme.dark}}},[n("v-icon",{domProps:{textContent:t._s("mdi-brightness-"+(t.$vuetify.theme.dark?"4":"6"))}})],1),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.clipped=!t.clipped}}},[n("v-icon",{domProps:{textContent:t._s("mdi-application")}})],1)],1),t._v(" "),n("v-main",{attrs:{id:"scrolling-techniques-6"}},[n("v-container",[n("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;m()(component,{BiliSCLogo:n(309).default,IntroText:n(310).default,ChangelogText:n(311).default}),m()(component,{VApp:h.a,VAppBar:_.a,VAppBarNavIcon:w.a,VBtn:V.a,VCard:k.a,VCardActions:x.a,VCardTitle:x.c,VContainer:S.a,VDatePicker:T.a,VDialog:D.a,VDivider:y.a,VIcon:C.a,VList:O.a,VListItem:M.a,VListItemContent:L.a,VMain:$.a,VMenu:P.a,VNavigationDrawer:j.a,VSelect:N.a,VSpacer:I.a,VSwitch:F.a,VTextField:B.a,VTimePicker:A.a,VToolbarTitle:H.a})},319:function(t,e,n){"use strict";var r={name:"MiniViewerLayout",data:function(){return{title:"BiliSC"}}},o=n(42),c=n(51),l=n.n(c),v=n(515),d=n(526),f=n(518),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",{attrs:{dark:""}},[e("v-main",[e("v-container",[e("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;l()(component,{VApp:v.a,VContainer:d.a,VMain:f.a})},320:function(t,e,n){"use strict";n(7),n(6),n(9),n(4),n(14),n(8),n(15);var r=n(1),o=(n(24),n(29),n(81));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={name:"SCViewerLayout",data:function(){return{clipped:!0,drawer:!0,right:!0,rightDrawer:!1,title:"BiliSC",collapseOnScroll:!0,newVersionDialog:!1,version:"null"}},computed:l({room:{get:function(){return this.$store.state.ViewerConfig.room},set:function(t){this.$store.commit("ViewerConfig/setRoom",t)}},pageLimit:{get:function(){return this.$store.state.ViewerConfig.pageLimit},set:function(t){this.$store.commit("ViewerConfig/setPageLimit",t)}},showMarkNative:{get:function(){return this.$store.state.ViewerConfig.showMarkNative},set:function(t){this.$store.commit("ViewerConfig/setShowMarkNative",t)}},miniViewerURL:function(){return"/mini?room=".concat(this.room,"&limit=").concat(this.pageLimit,"&mark=").concat(this.showMarkNative)}},Object(o.c)({startFetch:function(t){return t.ViewerConfig.startFetch}})),watch:{startFetch:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":this.drawer=!1}}},mounted:function(){this.version=this.$config.version;var t=localStorage.getItem("version");this.$config.version!==t&&(console.log("version changed"),this.newVersionDialog=!0)},methods:l(l({},Object(o.b)({setStartFetch:"ViewerConfig/setStartFetch"})),{},{log:function(t){console.log(t)},setVersion:function(){localStorage.setItem("version",this.$config.version),this.newVersionDialog=!1},openLink:function(link,t){t?window.open(link,"BiliSC for OBS","menubar=0,location=0,scrollbars=0,toolbar=0,width=500,height=700"):window.open(link)},openMiniViewer:function(){this.setStartFetch(0),this.openLink(this.miniViewerURL,!0)},copyURL:function(){this.copyText(window.location.origin+this.miniViewerURL)},copyText:function(text){navigator.clipboard.writeText(text)}})},d=n(42),f=n(51),m=n.n(f),h=n(515),_=n(524),w=n(516),V=n(162),k=n(239),x=n(79),S=n(526),T=n(520),D=n(240),y=n(236),C=n(237),O=n(161),M=n(30),L=n(518),$=n(527),P=n(522),j=n(519),N=n(525),I=n(118),F=n(138),component=Object(d.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[n("v-navigation-drawer",{attrs:{width:"400px",clipped:t.clipped,fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("BiliSCLogo",{attrs:{version:t.version}}),t._v(" "),n("v-divider"),t._v(" "),n("v-list",{attrs:{dense:"",nav:""}},[n("v-list-item",[n("v-list-item-content",[t._v(" 标记显示 ")]),t._v(" "),n("v-list-item-content",[n("v-switch",{staticClass:"ma-0 pa-0",attrs:{"hide-details":""},model:{value:t.showMarkNative,callback:function(e){t.showMarkNative=e},expression:"showMarkNative"}})],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[t._v(" 显示数量 ")]),t._v(" "),n("v-list-item-content",[n("v-text-field",{staticClass:"ma-0 pa-0",attrs:{"hide-details":""},model:{value:t.pageLimit,callback:function(e){t.pageLimit=e},expression:"pageLimit"}})],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[t._v(" 房间号 ")]),t._v(" "),n("v-list-item-content",[n("v-select",{staticClass:"ma-0 pa-0",attrs:{items:["21452505","80397"],"hide-details":""},model:{value:t.room,callback:function(e){t.room=e},expression:"room"}})],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-spacer")],1),t._v(" "),n("v-list-item-content",[n("v-btn",{on:{click:function(e){return t.setStartFetch(t.startFetch+1)}}},[t._v("GO")])],1)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-list-item",[n("v-list-item-content",{on:{click:function(e){return t.openMiniViewer()}}},[n("v-btn",[t._v("小窗模式")])],1),t._v(" "),n("v-list-item-content",{on:{click:function(e){return t.copyURL()}}},[n("v-btn",[t._v("复制链接")])],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-btn",{on:{click:function(e){t.newVersionDialog=!0}}},[t._v("更新日志")])],1),t._v(" "),n("v-list-item-content",[n("v-btn",{attrs:{nuxt:"",to:"/history"}},[t._v("历史SC")])],1)],1),t._v(" "),n("v-list-item",[n("IntroText")],1)],1),t._v(" "),n("v-dialog",{attrs:{width:"500"},on:{"click:outside":t.setVersion},model:{value:t.newVersionDialog,callback:function(e){t.newVersionDialog=e},expression:"newVersionDialog"}},[n("v-card",[n("v-card-title",{staticClass:"text-h5"},[t._v(" 更新日志 ")]),t._v(" "),n("ChangelogText"),t._v(" "),n("v-divider"),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"primary",text:""},on:{click:t.setVersion}},[t._v(" OK ")])],1)],1)],1)],1),t._v(" "),n("v-app-bar",{attrs:{collapse:!t.drawer,"collapse-on-scroll":!1,"scroll-target":"#scrolling-techniques-6","clipped-left":t.clipped,fixed:"",app:""}},[n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.$vuetify.theme.dark=!t.$vuetify.theme.dark}}},[n("v-icon",{domProps:{textContent:t._s("mdi-brightness-"+(t.$vuetify.theme.dark?"4":"6"))}})],1),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.clipped=!t.clipped}}},[n("v-icon",{domProps:{textContent:t._s("mdi-application")}})],1)],1),t._v(" "),n("v-main",{attrs:{id:"scrolling-techniques-6"}},[n("v-container",[n("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;m()(component,{BiliSCLogo:n(309).default,IntroText:n(310).default,ChangelogText:n(311).default}),m()(component,{VApp:h.a,VAppBar:_.a,VAppBarNavIcon:w.a,VBtn:V.a,VCard:k.a,VCardActions:x.a,VCardTitle:x.c,VContainer:S.a,VDialog:T.a,VDivider:D.a,VIcon:y.a,VList:C.a,VListItem:O.a,VListItemContent:M.a,VMain:L.a,VNavigationDrawer:$.a,VSelect:P.a,VSpacer:j.a,VSwitch:N.a,VTextField:I.a,VToolbarTitle:F.a})},341:function(t,e,n){n(342),t.exports=n(343)},371:function(t,e,n){"use strict";n(285)},372:function(t,e,n){var r=n(16)(!1);r.push([t.i,"h1[data-v-6ffeedc3]{font-size:20px}",""]),t.exports=r},432:function(t,e,n){var map={"./Logo.png":433,"./Logo_Trans.png":434};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=432},433:function(t,e,n){t.exports=n.p+"img/Logo.45bf1f9.png"},434:function(t,e,n){t.exports=n.p+"img/Logo_Trans.3463110.png"},487:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return r})),n.d(e,"mutations",(function(){return o}));var r=function(){return{room:"21452505",showMarkNative:!0,startFetch:0,startTS:0,endTS:0}},o={setRoom:function(t,e){t.room=e},setShowMarkNative:function(t,e){t.showMarkNative=e},setPageLimit:function(t,e){t.pageLimit=e},setStartFetch:function(t,e){t.startFetch=e},setStartTS:function(t,e){t.startTS=e},setEndTS:function(t,e){t.endTS=e}}},488:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return r})),n.d(e,"mutations",(function(){return o}));var r=function(){return{room:"21452505",showMarkNative:!0,pageLimit:"100",startFetch:0}},o={setRoom:function(t,e){t.room=e},setShowMarkNative:function(t,e){t.showMarkNative=e},setPageLimit:function(t,e){t.pageLimit=e},setStartFetch:function(t,e){t.startFetch=e}}}},[[341,14,2,15]]]);