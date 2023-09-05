import{a as A,b as R,c as v,d as I,e as V,f as r,g as a,h as O,u as F,i as j,j as _,k as q,l as z,m as E,n as G,o as K,p as H,V as J,_ as P,q as Q,r as W,s as X,t as Y}from"./VSwitch.d7599003.js";import{d as Z,ae as ee,E as te,r as c,o as le,z as ae,k as oe,N as ne,s as t,q as e,L as se,t as ue,A as n,v as u,B as C,a1 as ie,C as re,_ as de}from"./entry.027c8510.js";import{V as fe}from"./viewer-config.1cf8ab12.js";import{V as k}from"./variant.e807b8c9.js";const _e=Z({__name:"viewer",setup(ce){const{name:x}=ee(),{current:b}=te(),s=fe(),p=re(),y=c(p.public.ROOM_ID.split(",")),d=c(!0),S=c("BiliSC"),f=c(!1),m=c("null");le(()=>{m.value=p.public.version;const i=localStorage.getItem("version");m.value!==i&&(console.log("version changed"),f.value=!0)}),ae(()=>s.startFetch,i=>{switch(x.value){case"xs":case"sm":d.value=!1;break}});function g(){return`/mini?room=${s.room}&limit=${s.pageLimit}&mark=${s.showMarkNative}&dark=${b.value.dark}`}function w(){localStorage.setItem("version",p.public.version),f.value=!1}function T(i,l){l?window.open(i,"BiliSC for OBS","menubar=0,location=0,scrollbars=0,toolbar=0,width=500,height=700"):window.open(i)}function B(){s.startFetch=0,T(g(),!0)}function h(){$(window.location.origin+g())}function $(i){navigator.clipboard.writeText(i)}return(i,l)=>{const N=P,L=Q,M=W,U=X,D=Y;return oe(),ne(J,{dark:""},{default:t(()=>[e(I,{collapse:!n(d)},{default:t(()=>[e(A,{onClick:l[0]||(l[0]=se(o=>d.value=!n(d),["stop"]))}),e(R,{textContent:ue(n(S))},null,8,["textContent"]),e(v),e(N)]),_:1},8,["collapse"]),e(K,{modelValue:n(d),"onUpdate:modelValue":l[9]||(l[9]=o=>C(d)?d.value=o:null),width:"400"},{default:t(()=>[e(L,{class:"pb-4",version:n(m)},null,8,["version"]),e(V),e(k,null,{default:t(()=>[e(r,{"no-gutters":"",align:"center"},{default:t(()=>[e(a,null,{default:t(()=>[u(" 标记显示 ")]),_:1}),e(a,null,{default:t(()=>[e(O,{modelValue:n(s).showMarkNative,"onUpdate:modelValue":l[1]||(l[1]=o=>n(s).showMarkNative=o),"hide-details":"auto",flat:"",density:"compact"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{"no-gutters":"",align:"center"},{default:t(()=>[e(a,null,{default:t(()=>[u(" 显示数量 ")]),_:1}),e(a,null,{default:t(()=>[e(F,{modelValue:n(s).pageLimit,"onUpdate:modelValue":l[2]||(l[2]=o=>n(s).pageLimit=o),variant:"underlined","hide-details":"auto",density:"compact",class:"pb-3"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{"no-gutters":"",align:"center"},{default:t(()=>[e(a,null,{default:t(()=>[u(" 房间号 ")]),_:1}),e(a,null,{default:t(()=>[e(j,{modelValue:n(s).room,"onUpdate:modelValue":l[3]||(l[3]=o=>n(s).room=o),items:n(y),variant:"underlined","hide-details":"auto",density:"compact",class:"pb-3"},null,8,["modelValue","items"])]),_:1})]),_:1}),e(r,{"no-gutters":""},{default:t(()=>[e(a,null,{default:t(()=>[e(v)]),_:1}),e(a,{cols:"6"},{default:t(()=>[e(_,{block:"",variant:"outlined",onClick:l[4]||(l[4]=o=>n(s).startFetch+=1)},{default:t(()=>[u("GO")]),_:1})]),_:1})]),_:1}),e(r,null,{default:t(()=>[e(a,null,{default:t(()=>[e(V)]),_:1})]),_:1}),e(r,{justify:"space-around"},{default:t(()=>[e(a,{cols:"4"},{default:t(()=>[e(_,{block:"",variant:"outlined",onClick:l[5]||(l[5]=o=>B())},{default:t(()=>[u("小窗模式")]),_:1})]),_:1}),e(a,{cols:"4"},{default:t(()=>[e(_,{block:"",variant:"outlined",onClick:l[6]||(l[6]=o=>h())},{default:t(()=>[u("复制链接")]),_:1})]),_:1})]),_:1}),e(r,{justify:"space-around"},{default:t(()=>[e(a,{cols:"4"},{default:t(()=>[e(_,{block:"",variant:"outlined",onClick:l[7]||(l[7]=o=>f.value=!0)},{default:t(()=>[u("更新日志")]),_:1})]),_:1}),e(a,{cols:"4"},{default:t(()=>[e(_,{block:"",variant:"outlined",nuxt:"",to:"/history"},{default:t(()=>[u("历史SC")]),_:1})]),_:1})]),_:1}),e(r,null,{default:t(()=>[e(a,null,{default:t(()=>[e(M,{class:"pb-3"})]),_:1})]),_:1}),e(r,{"no-gutters":""},{default:t(()=>[e(a,null,{default:t(()=>[e(U)]),_:1})]),_:1})]),_:1}),e(q,{modelValue:n(f),"onUpdate:modelValue":l[8]||(l[8]=o=>C(f)?f.value=o:null),width:"500","onClick:outside":w},{default:t(()=>[e(z,null,{default:t(()=>[e(E,{class:"text-h5"},{default:t(()=>[u(" 更新日志 ")]),_:1}),e(D),e(V),e(G,null,{default:t(()=>[e(v),e(_,{color:"primary",variant:"text",onClick:w},{default:t(()=>[u(" OK ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),e(H,{id:"scrolling-techniques-6"},{default:t(()=>[e(k,null,{default:t(()=>[ie(i.$slots,"default",{},void 0,!0)]),_:3})]),_:3})]),_:3})}}});const ge=de(_e,[["__scopeId","data-v-60e5f625"]]);export{ge as default};
