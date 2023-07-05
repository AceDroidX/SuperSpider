import{N as c,O as h,y as u,P as k,f,F as S,u as m,Q as y,R as b,S as R,T as l,U as _,V as $,W as g,X as x,Y as C,Z as N,$ as p}from"./entry.2a47a7fd.js";import{u as B}from"./color.21b10d14.js";const V=c({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded");function W(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:h();return{roundedClasses:u(()=>{const a=k(e)?e.value:e.rounded,i=[];if(a===!0||a==="")i.push(`${n}--rounded`);else if(typeof a=="string"||a===0)for(const t of String(a).split(" "))i.push(`rounded-${t}`);return i})}}const w=["elevated","flat","tonal","outlined","text","plain"];function A(e,n){return f(S,null,[e&&f("span",{key:"overlay",class:`${n}__overlay`},null),f("span",{key:"underlay",class:`${n}__underlay`},null)])}const D=c({color:String,variant:{type:String,default:"elevated",validator:e=>w.includes(e)}},"variant");function L(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:h();const r=u(()=>{const{variant:t}=m(e);return`${n}--variant-${t}`}),{colorClasses:a,colorStyles:i}=B(u(()=>{const{variant:t,color:o}=m(e);return{[["elevated","flat"].includes(t)?"background":"text"]:o}}));return{colorClasses:a,colorStyles:i,variantClasses:r}}const H=y({name:"VDefaultsProvider",props:{defaults:Object,reset:[Number,String],root:Boolean,scoped:Boolean},setup(e,n){let{slots:r}=n;const{defaults:a,reset:i,root:t,scoped:o}=b(e);return R(a,{reset:i,root:t,scoped:o}),()=>{var s;return(s=r.default)==null?void 0:s.call(r)}}}),T=c({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function I(e){return{dimensionStyles:u(()=>({height:l(e.height),maxHeight:l(e.maxHeight),maxWidth:l(e.maxWidth),minHeight:l(e.minHeight),minWidth:l(e.minWidth),width:l(e.width)}))}}function O(){var e,n;return(e=_("useRouter"))==null||(n=e.proxy)==null?void 0:n.$router}function F(e,n){const r=$("RouterLink"),a=u(()=>!!(e.href||e.to)),i=u(()=>(a==null?void 0:a.value)||g(n,"click")||g(e,"click"));if(typeof r=="string")return{isLink:a,isClickable:i,href:x(e,"href")};const t=e.to?r.useLink(e):void 0;return{isLink:a,isClickable:i,route:t==null?void 0:t.route,navigate:t==null?void 0:t.navigate,isActive:t&&u(()=>{var o,s;return e.exact?(o=t.isExactActive)==null?void 0:o.value:(s=t.isActive)==null?void 0:s.value}),href:u(()=>e.to?t==null?void 0:t.route.value.href:e.href)}}const j=c({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let v=!1;function U(e,n){let r=!1,a,i;C&&(N(()=>{window.addEventListener("popstate",t),a=e==null?void 0:e.beforeEach((o,s,d)=>{v?r?n(d):d():setTimeout(()=>r?n(d):d()),v=!0}),i=e==null?void 0:e.afterEach(()=>{v=!1})}),p(()=>{var o,s;window.removeEventListener("popstate",t),(o=a)==null||o(),(s=i)==null||s()}));function t(o){var s;(s=o.state)!=null&&s.replaced||(r=!0,setTimeout(()=>r=!1))}}export{H as V,D as a,W as b,T as c,I as d,O as e,U as f,A as g,j as h,F as i,V as m,L as u};