import{N as f,O as g,a8 as h,a0 as C,T as n,ay as y,B as S,M as k,y as I,aR as x,E as T,aS as V,X as $,f as b}from"./entry.2a47a7fd.js";import{m as N,u as P}from"./tag.3dcb0d75.js";import{b as B}from"./color.21b10d14.js";const R=["x-small","small","default","large","x-large"],_=f({size:{type:[String,Number],default:"default"}},"size");function w(e){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:g();return h(()=>{let a,t;return C(R,e.size)?a=`${l}--size-${e.size}`:e.size&&(t={width:n(e.size),height:n(e.size)}),{sizeClasses:a,sizeStyles:t}})}const D=f({color:String,start:Boolean,end:Boolean,icon:y,..._(),...N({tag:"i"}),...S()},"v-icon"),O=k({name:"VIcon",props:D(),setup(e,l){let{attrs:a,slots:t}=l,i;t.default&&(i=I(()=>{var s,u;const d=(s=t.default)==null?void 0:s.call(t);if(d)return(u=d.filter(o=>o.type===x&&o.children&&typeof o.children=="string")[0])==null?void 0:u.children}));const{themeClasses:m}=T(e),{iconData:r}=V(i||e),{sizeClasses:c}=w(e),{textColorClasses:v,textColorStyles:z}=B($(e,"color"));return P(()=>{var s;return b(r.value.component,{tag:e.tag,icon:r.value.icon,class:["v-icon","notranslate",m.value,c.value,v.value,{"v-icon--clickable":!!a.onClick,"v-icon--start":e.start,"v-icon--end":e.end}],style:[c.value?void 0:{fontSize:n(e.size),height:n(e.size),width:n(e.size)},z.value],role:a.onClick?"button":void 0,"aria-hidden":!a.onClick},{default:()=>[(s=t.default)==null?void 0:s.call(t)]})}),{}}});export{O as V,_ as m,w as u};