import{M as f,S as ue,f as n,ay as g,B as ce,E as fe,y as b,ag as ve,ai as me,aA as A,am as D,a as ge,o as be,c as ye,w as r,h as k}from"./entry.2a47a7fd.js";import{V as _e}from"./VContainer.437fac32.js";import{u as I,m as x}from"./tag.3dcb0d75.js";import{m as ke,u as he,L as Ce,V as h}from"./VBtn.d4252c0a.js";import{V as C}from"./VIcon.a48c9915.js";import{c as O}from"./createSimpleFunctional.b344c267.js";import{a as R,R as Se,m as Ve,b as pe,u as Ae,c as Ie,d as xe}from"./index.4684c4b2.js";import{V as p,c as Pe,m as $e,h as Le,a as Ne,u as je,d as Be,b as Te,i as we,g as Ee}from"./router.ed83d862.js";import{V as T,a as De}from"./VAvatar.bf67fe17.js";import{V as Oe}from"./VCardText.69029f80.js";import{m as Re,a as Ge,u as Me,b as ze}from"./position.5af7921d.js";const Ue=f({name:"VCardActions",setup(e,l){let{slots:a}=l;return ue({VBtn:{variant:"text"}}),I(()=>{var t;return n("div",{class:"v-card-actions"},[(t=a.default)==null?void 0:t.call(a)])}),{}}}),Fe=O("v-card-subtitle"),Xe=O("v-card-title"),He=f({name:"VCardItem",props:{appendAvatar:String,appendIcon:g,prependAvatar:String,prependIcon:g,subtitle:String,title:String,...R()},setup(e,l){let{slots:a}=l;return I(()=>{var t,s,i,d,o;const u=!!(e.prependAvatar||e.prependIcon||a.prepend),c=!!(e.appendAvatar||e.appendIcon||a.append),y=!!(e.title||a.title),_=!!(e.subtitle||a.subtitle);return n("div",{class:"v-card-item"},[u&&n(p,{key:"prepend",defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},{default:()=>[n("div",{class:"v-card-item__prepend"},[((t=a.prepend)==null?void 0:t.call(a))??n(T,null,null)])]}),n("div",{class:"v-card-item__content"},[y&&n(Xe,{key:"title"},{default:()=>[((s=a.title)==null?void 0:s.call(a))??e.title]}),_&&n(Fe,{key:"subtitle"},{default:()=>[((i=a.subtitle)==null?void 0:i.call(a))??e.subtitle]}),(d=a.default)==null?void 0:d.call(a)]),c&&n(p,{key:"append",defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},{default:()=>[n("div",{class:"v-card-item__append"},[((o=a.append)==null?void 0:o.call(a))??n(T,null,null)])]})])}),{}}}),Je=f({name:"VCard",directives:{Ripple:Se},props:{appendAvatar:String,appendIcon:g,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:g,ripple:{type:Boolean,default:!0},subtitle:String,text:String,title:String,...ce(),...Ve(),...R(),...Pe(),...pe(),...ke(),...Re(),...Ge(),...$e(),...Le(),...x(),...Ne({variant:"elevated"})},setup(e,l){let{attrs:a,slots:t}=l;const{themeClasses:s}=fe(e),{borderClasses:i}=Ae(e),{colorClasses:d,colorStyles:o,variantClasses:u}=je(e),{densityClasses:c}=Ie(e),{dimensionStyles:y}=Be(e),{elevationClasses:_}=xe(e),{loaderClasses:q}=he(e),{locationStyles:K}=Me(e),{positionClasses:Q}=ze(e),{roundedClasses:Z}=Te(e),v=we(e,a),ee=b(()=>e.link!==!1&&v.isLink.value),m=b(()=>!e.disabled&&e.link!==!1&&(e.link||v.isClickable.value));return I(()=>{var N,j,B;const te=ee.value?"a":e.tag,ae=!!(t.title||e.title),ne=!!(t.subtitle||e.subtitle),le=ae||ne,se=!!(t.append||e.appendAvatar||e.appendIcon),ie=!!(t.prepend||e.prependAvatar||e.prependIcon),oe=!!(t.image||e.image),re=le||ie||se,de=!!(t.text||e.text);return ve(n(te,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":m.value},s.value,i.value,d.value,c.value,_.value,q.value,Q.value,Z.value,u.value],style:[o.value,y.value,K.value],href:v.href.value,onClick:m.value&&v.navigate,tabindex:e.disabled?-1:void 0},{default:()=>[oe&&n(p,{key:"image",defaults:{VImg:{cover:!0,src:e.image}}},{default:()=>[n("div",{class:"v-card__image"},[((N=t.image)==null?void 0:N.call(t))??n(De,null,null)])]}),n(Ce,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:t.loader}),re&&n(He,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:t.item,prepend:t.prepend,title:t.title,subtitle:t.subtitle,append:t.append}),de&&n(Oe,{key:"text"},{default:()=>[((j=t.text)==null?void 0:j.call(t))??e.text]}),(B=t.default)==null?void 0:B.call(t),t.actions&&n(Ue,null,{default:t.actions}),Ee(m.value,"v-card")]}),[[me("ripple"),m.value&&e.ripple]])}),{}}}),P=["sm","md","lg","xl","xxl"],G=(()=>P.reduce((e,l)=>(e[l]={type:[Boolean,String,Number],default:!1},e),{}))(),M=(()=>P.reduce((e,l)=>(e["offset"+A(l)]={type:[String,Number],default:null},e),{}))(),z=(()=>P.reduce((e,l)=>(e["order"+A(l)]={type:[String,Number],default:null},e),{}))(),w={col:Object.keys(G),offset:Object.keys(M),order:Object.keys(z)};function We(e,l,a){let t=e;if(!(a==null||a===!1)){if(l){const s=l.replace(e,"");t+=`-${s}`}return e==="col"&&(t="v-"+t),e==="col"&&(a===""||a===!0)||(t+=`-${a}`),t.toLowerCase()}}const Ye=["auto","start","end","center","baseline","stretch"],S=f({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...G,offset:{type:[String,Number],default:null},...M,order:{type:[String,Number],default:null},...z,alignSelf:{type:String,default:null,validator:e=>Ye.includes(e)},...x()},setup(e,l){let{slots:a}=l;const t=b(()=>{const s=[];let i;for(i in w)w[i].forEach(o=>{const u=e[o],c=We(i,o,u);c&&s.push(c)});const d=s.some(o=>o.startsWith("v-col-"));return s.push({"v-col":!d||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),s});return()=>{var s;return D(e.tag,{class:t.value},(s=a.default)==null?void 0:s.call(a))}}}),qe=["sm","md","lg","xl","xxl"],$=["start","end","center"],U=["space-between","space-around","space-evenly"];function L(e,l){return qe.reduce((a,t)=>(a[e+A(t)]=l(),a),{})}const Ke=[...$,"baseline","stretch"],F=e=>Ke.includes(e),X=L("align",()=>({type:String,default:null,validator:F})),Qe=[...$,...U],H=e=>Qe.includes(e),J=L("justify",()=>({type:String,default:null,validator:H})),Ze=[...$,...U,"stretch"],W=e=>Ze.includes(e),Y=L("alignContent",()=>({type:String,default:null,validator:W})),E={align:Object.keys(X),justify:Object.keys(J),alignContent:Object.keys(Y)},et={align:"align",justify:"justify",alignContent:"align-content"};function tt(e,l,a){let t=et[e];if(a!=null){if(l){const s=l.replace(e,"");t+=`-${s}`}return t+=`-${a}`,t.toLowerCase()}}const V=f({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:F},...X,justify:{type:String,default:null,validator:H},...J,alignContent:{type:String,default:null,validator:W},...Y,...x()},setup(e,l){let{slots:a}=l;const t=b(()=>{const s=[];let i;for(i in E)E[i].forEach(d=>{const o=e[d],u=tt(i,d,o);u&&s.push(u)});return s.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),s});return()=>{var s;return D(e.tag,{class:["v-row",t.value]},(s=a.default)==null?void 0:s.call(a))}}}),at={};function nt(e,l){return be(),ye(Je,{variant:"outlined"},{default:r(()=>[n(_e,{class:"pa-3"},{default:r(()=>[n(V,{"no-gutters":""},{default:r(()=>[n(S,null,{default:r(()=>[n(h,{rounded:"pill",variant:"text",class:"text-body-2",href:"https://github.com/AceDroidX/SuperSpider",target:"_blank"},{default:r(()=>[n(C,{size:"small",icon:"custom:github"}),k(" BiliSC")]),_:1})]),_:1})]),_:1}),n(V,{"no-gutters":""},{default:r(()=>[n(S,null,{default:r(()=>[n(h,{rounded:"pill",variant:"text",class:"text-body-2",href:"https://github.com/AceDroidX",target:"_blank"},{default:r(()=>[n(C,{size:"small",icon:"mdi-account-circle"}),k(" AceDroidX")]),_:1})]),_:1})]),_:1}),n(V,{"no-gutters":""},{default:r(()=>[n(S,null,{default:r(()=>[n(h,{rounded:"pill",variant:"text",class:"text-body-2",href:"https://github.com/Afanyiyu",target:"_blank"},{default:r(()=>[n(C,{size:"small",icon:"mdi-account-circle"}),k(" Il Harper (原作者)")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const lt=ge(at,[["render",nt],["__scopeId","data-v-3a2f3596"]]),bt=Object.freeze(Object.defineProperty({__proto__:null,default:lt},Symbol.toStringTag,{value:"Module"}));export{bt as A,V,lt as _,S as a,Je as b,Xe as c,Ue as d};