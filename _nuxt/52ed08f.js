(window.webpackJsonp=window.webpackJsonp||[]).push([[9,3,6],{555:function(t,e,n){var content=n(560);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("11d8a120",content,!0,{sourceMap:!1})},556:function(t,e,n){var content=n(562);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("180999dc",content,!0,{sourceMap:!1})},559:function(t,e,n){"use strict";n(555)},560:function(t,e,n){var r=n(16)(!1);r.push([t.i,".nuxt-logo{height:180px}",""]),t.exports=r},561:function(t,e,n){"use strict";n(556)},562:function(t,e,n){var r=n(16)(!1);r.push([t.i,".vuetify-logo{height:180px;width:180px;transform:rotateY(560deg);-webkit-animation:turn 3.5s ease-out 1s forwards;animation:turn 3.5s ease-out 1s forwards}@-webkit-keyframes turn{to{transform:rotateY(0deg)}}@keyframes turn{to{transform:rotateY(0deg)}}",""]),t.exports=r},567:function(t,e,n){"use strict";n.r(e);n(559);var r=n(44),component=Object(r.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"nuxt-logo",attrs:{viewBox:"0 0 45 30",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M24.7203 29.704H41.1008C41.6211 29.7041 42.1322 29.5669 42.5828 29.3061C43.0334 29.0454 43.4075 28.6704 43.6675 28.2188C43.9275 27.7672 44.0643 27.2549 44.0641 26.7335C44.0639 26.2121 43.9266 25.6999 43.6662 25.2485L32.6655 6.15312C32.4055 5.70162 32.0315 5.32667 31.581 5.06598C31.1305 4.8053 30.6195 4.66805 30.0994 4.66805C29.5792 4.66805 29.0682 4.8053 28.6177 5.06598C28.1672 5.32667 27.7932 5.70162 27.5332 6.15312L24.7203 11.039L19.2208 1.48485C18.9606 1.03338 18.5864 0.658493 18.1358 0.397853C17.6852 0.137213 17.1741 0 16.6538 0C16.1336 0 15.6225 0.137213 15.1719 0.397853C14.7213 0.658493 14.3471 1.03338 14.0868 1.48485L0.397874 25.2485C0.137452 25.6999 0.000226653 26.2121 2.8053e-07 26.7335C-0.000226092 27.2549 0.136554 27.7672 0.396584 28.2188C0.656614 28.6704 1.03072 29.0454 1.48129 29.3061C1.93185 29.5669 2.44298 29.7041 2.96326 29.704H13.2456C17.3195 29.704 20.3239 27.9106 22.3912 24.4118L27.4102 15.7008L30.0986 11.039L38.1667 25.0422H27.4102L24.7203 29.704ZM13.0779 25.0374L5.9022 25.0358L16.6586 6.36589L22.0257 15.7008L18.4322 21.9401C17.0593 24.2103 15.4996 25.0374 13.0779 25.0374Z",fill:"#00DC82"}})])}),[],!1,null,null,null);e.default=component.exports},568:function(t,e,n){"use strict";n.r(e);n(561);var r=n(44),component=Object(r.a)({},(function(){var t=this.$createElement;return(this._self._c||t)("img",{staticClass:"vuetify-logo",attrs:{alt:"Vuetify Logo",src:"/vuetify-logo.svg"}})}),[],!1,null,null,null);e.default=component.exports},569:function(t,e,n){"use strict";n(6),n(9),n(13),n(14);var r=n(1),o=(n(4),n(19),n(7),n(24),n(81),n(327),n(43),n(328),n(329),n(330),n(331),n(332),n(333),n(334),n(335),n(336),n(337),n(338),n(339),n(340),n(50),n(33),n(8),n(84),n(326),n(2)),c=n(47),l=n(0);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=["sm","md","lg","xl"],y=v.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{}),h=v.reduce((function(t,e){return t["offset"+Object(l.z)(e)]={type:[String,Number],default:null},t}),{}),j=v.reduce((function(t,e){return t["order"+Object(l.z)(e)]={type:[String,Number],default:null},t}),{}),O={col:Object.keys(y),offset:Object.keys(h),order:Object.keys(j)};function m(t,e,n){var r=t;if(null!=n&&!1!==n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return"col"!==t||""!==n&&!0!==n?(r+="-".concat(n)).toLowerCase():r.toLowerCase()}}var w=new Map;e.a=o.a.extend({name:"v-col",functional:!0,props:d(d(d(d({cols:{type:[Boolean,String,Number],default:!1}},y),{},{offset:{type:[String,Number],default:null}},h),{},{order:{type:[String,Number],default:null}},j),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var n=e.props,data=e.data,o=e.children,l=(e.parent,"");for(var f in n)l+=String(n[f]);var d=w.get(l);return d||function(){var t,e;for(e in d=[],O)O[e].forEach((function(t){var r=n[t],o=m(e,t,r);o&&d.push(o)}));var o=d.some((function(t){return t.startsWith("col-")}));d.push((t={col:!o||!n.cols},Object(r.a)(t,"col-".concat(n.cols),n.cols),Object(r.a)(t,"offset-".concat(n.offset),n.offset),Object(r.a)(t,"order-".concat(n.order),n.order),Object(r.a)(t,"align-self-".concat(n.alignSelf),n.alignSelf),t)),w.set(l,d)}(),t(n.tag,Object(c.a)(data,{class:d}),o)}})},570:function(t,e,n){"use strict";n(6),n(9),n(13),n(14);var r=n(1),o=(n(4),n(33),n(57),n(23),n(7),n(24),n(81),n(327),n(43),n(328),n(329),n(330),n(331),n(332),n(333),n(334),n(335),n(336),n(337),n(338),n(339),n(340),n(50),n(8),n(326),n(2)),c=n(47),l=n(0);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=["sm","md","lg","xl"],y=["start","end","center"];function h(t,e){return v.reduce((function(n,r){return n[t+Object(l.z)(r)]=e(),n}),{})}var j=function(t){return[].concat(y,["baseline","stretch"]).includes(t)},O=h("align",(function(){return{type:String,default:null,validator:j}})),m=function(t){return[].concat(y,["space-between","space-around"]).includes(t)},w=h("justify",(function(){return{type:String,default:null,validator:m}})),_=function(t){return[].concat(y,["space-between","space-around","stretch"]).includes(t)},C=h("alignContent",(function(){return{type:String,default:null,validator:_}})),x={align:Object.keys(O),justify:Object.keys(w),alignContent:Object.keys(C)},S={align:"align",justify:"justify",alignContent:"align-content"};function k(t,e,n){var r=S[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var L=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:j}},O),{},{justify:{type:String,default:null,validator:m}},w),{},{alignContent:{type:String,default:null,validator:_}},C),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var f in n)l+=String(n[f]);var d=L.get(l);return d||function(){var t,e;for(e in d=[],x)x[e].forEach((function(t){var r=n[t],o=k(e,t,r);o&&d.push(o)}));d.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),L.set(l,d)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},572:function(t,e,n){"use strict";n.r(e);var r={name:"IndexPage"},o=n(44),c=n(54),l=n.n(c),f=n(168),d=n(242),v=n(80),y=n(569),h=n(570),j=n(543),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"12",sm:"8",md:"6"}},[n("v-card",{staticClass:"logo py-4 d-flex justify-center"},[n("NuxtLogo"),t._v(" "),n("VuetifyLogo")],1),t._v(" "),n("v-card",[n("v-card-title",{staticClass:"headline"},[t._v("\n        Welcome to the Vuetify + Nuxt.js template\n      ")]),t._v(" "),n("v-card-text",[n("p",[t._v("\n          Vuetify is a progressive Material Design component framework for\n          Vue.js. It was designed to empower developers to create amazing\n          applications.\n        ")]),t._v(" "),n("p",[t._v("\n          For more information on Vuetify, check out the\n          "),n("a",{attrs:{href:"https://vuetifyjs.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("\n            documentation ")]),t._v(".\n        ")]),t._v(" "),n("p",[t._v("\n          If you have questions, please join the official\n          "),n("a",{attrs:{href:"https://chat.vuetifyjs.com/",target:"_blank",rel:"noopener noreferrer",title:"chat"}},[t._v("\n            discord ")]),t._v(".\n        ")]),t._v(" "),n("p",[t._v("\n          Find a bug? Report it on the github\n          "),n("a",{attrs:{href:"https://github.com/vuetifyjs/vuetify/issues",target:"_blank",rel:"noopener noreferrer",title:"contribute"}},[t._v("\n            issue board ")]),t._v(".\n        ")]),t._v(" "),n("p",[t._v("\n          Thank you for developing with Vuetify and I look forward to bringing\n          more exciting features in the future.\n        ")]),t._v(" "),n("div",{staticClass:"text-xs-right"},[n("em",[n("small",[t._v("— John Leider")])])]),t._v(" "),n("hr",{staticClass:"my-3"}),t._v(" "),n("a",{attrs:{href:"https://nuxtjs.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("\n          Nuxt Documentation\n        ")]),t._v(" "),n("br"),t._v(" "),n("a",{attrs:{href:"https://github.com/nuxt/nuxt.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("\n          Nuxt GitHub\n        ")])]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"primary",nuxt:"",to:"/inspire"}},[t._v(" Continue ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{NuxtLogo:n(567).default,VuetifyLogo:n(568).default}),l()(component,{VBtn:f.a,VCard:d.a,VCardActions:v.a,VCardText:v.b,VCardTitle:v.c,VCol:y.a,VRow:h.a,VSpacer:j.a})}}]);