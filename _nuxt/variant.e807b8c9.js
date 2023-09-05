import{az as ce,a_ as De,b4 as Ne,Q as O,al as U,T as ve,aG as me,q as T,b5 as Qe,av as Ze,r as j,ah as W,aT as ge,z as B,ac as M,ay as _e,c as y,a7 as J,as as k,aS as Se,aF as he,b6 as Ve,ak as We,ai as et,W as V,aX as tt,B as ye,b7 as pe,b8 as nt,am as q,ae as ot,o as at,a3 as rt,b9 as Ee,F as He,K as $e,an as it,aL as st,aj as lt,e as ct,a6 as Ie,R as ut,U as ft,V as dt,$ as vt,a8 as mt,a9 as gt,aJ as ht,O as je,au as be,A as Ce}from"./entry.027c8510.js";const ze=["top","bottom"],yt=["start","end","left","right"];function ue(e,t){let[n,o]=e.split(" ");return o||(o=ce(ze,n)?"start":ce(yt,n)?"top":"center"),{side:Oe(n,t),align:Oe(o,t)}}function Oe(e,t){return e==="start"?t?"right":"left":e==="end"?t?"left":"right":e}function ne(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function oe(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function Pe(e){return{side:e.align,align:e.side}}function ke(e){return ce(ze,e.side)?"y":"x"}class Y{constructor(t){let{x:n,y:o,width:r,height:a}=t;this.x=n,this.y=o,this.width=r,this.height=a}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function Re(e,t){return{x:{before:Math.max(0,t.left-e.left),after:Math.max(0,e.right-t.right)},y:{before:Math.max(0,t.top-e.top),after:Math.max(0,e.bottom-t.bottom)}}}function bt(e){const t=e.getBoundingClientRect(),n=getComputedStyle(e),o=n.transform;if(o){let r,a,i,s,l;if(o.startsWith("matrix3d("))r=o.slice(9,-1).split(/, /),a=+r[0],i=+r[5],s=+r[12],l=+r[13];else if(o.startsWith("matrix("))r=o.slice(7,-1).split(/, /),a=+r[0],i=+r[3],s=+r[4],l=+r[5];else return new Y(t);const u=n.transformOrigin,f=t.x-s-(1-a)*parseFloat(u),v=t.y-l-(1-i)*parseFloat(u.slice(u.indexOf(" ")+1)),m=a?t.width/a:e.offsetWidth+1,p=i?t.height/i:e.offsetHeight+1;return new Y({x:f,y:v,width:m,height:p})}else return new Y(t)}function wt(e,t,n){if(typeof e.animate>"u")return{finished:Promise.resolve()};let o;try{o=e.animate(t,n)}catch{return{finished:Promise.resolve()}}return typeof o.finished>"u"&&(o.finished=new Promise(r=>{o.onfinish=()=>{r(o)}})),o}const Q=new WeakMap;function xt(e,t){Object.keys(t).forEach(n=>{if(De(n)){const o=Ne(n),r=Q.get(e);if(t[n]==null)r==null||r.forEach(a=>{const[i,s]=a;i===o&&(e.removeEventListener(o,s),r.delete(a))});else if(!r||![...r].some(a=>a[0]===o&&a[1]===t[n])){e.addEventListener(o,t[n]);const a=r||new Set;a.add([o,t[n]]),Q.has(e)||Q.set(e,a)}}else t[n]==null?e.removeAttribute(n):e.setAttribute(n,t[n])})}function St(e,t){Object.keys(t).forEach(n=>{if(De(n)){const o=Ne(n),r=Q.get(e);r==null||r.forEach(a=>{const[i,s]=a;i===o&&(e.removeEventListener(o,s),r.delete(a))})}else e.removeAttribute(n)})}const qe=O({class:[String,Array],style:{type:[String,Array,Object],default:null}},"component");function Ye(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const t=e.getRootNode();return t!==document&&t.getRootNode({composed:!0})!==document?null:t}const pt="cubic-bezier(0.4, 0, 0.2, 1)",gn="cubic-bezier(0.0, 0, 0.2, 1)",hn="cubic-bezier(0.4, 0, 1, 1)";function Et(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(t?Ct(e):we(e))return e;e=e.parentElement}return document.scrollingElement}function ee(e,t){const n=[];if(t&&e&&!t.contains(e))return n;for(;e&&(we(e)&&n.push(e),e!==t);)e=e.parentElement;return n}function we(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return t.overflowY==="scroll"||t.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function Ct(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return["scroll","auto"].includes(t.overflowY)}function Ot(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}function Ge(e){const t=U("useRender");t.render=e}const Pt=O({tag:{type:String,default:"div"}},"tag"),kt=O({fluid:{type:Boolean,default:!1},...qe(),...Pt()},"VContainer"),yn=ve()({name:"VContainer",props:kt(),setup(e,t){let{slots:n}=t;const{rtlClasses:o}=me();return Ge(()=>T(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},o.value,e.class],style:e.style},n)),{}}}),Rt=O({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),bn=ve(!1)({name:"VDefaultsProvider",props:Rt(),setup(e,t){let{slots:n}=t;const{defaults:o,disabled:r,reset:a,root:i,scoped:s}=Qe(e);return Ze(o,{reset:a,root:i,scoped:s,disabled:r}),()=>{var l;return(l=n.default)==null?void 0:l.call(n)}}});function ae(e,t){return{x:e.x+t.x,y:e.y+t.y}}function At(e,t){return{x:e.x-t.x,y:e.y-t.y}}function Ae(e,t){if(e.side==="top"||e.side==="bottom"){const{side:n,align:o}=e,r=o==="left"?0:o==="center"?t.width/2:o==="right"?t.width:o,a=n==="top"?0:n==="bottom"?t.height:n;return ae({x:r,y:a},t)}else if(e.side==="left"||e.side==="right"){const{side:n,align:o}=e,r=n==="left"?0:n==="right"?t.width:n,a=o==="top"?0:o==="center"?t.height/2:o==="bottom"?t.height:o;return ae({x:r,y:a},t)}return ae({x:t.width/2,y:t.height/2},t)}const Xe={static:Ft,connected:Mt},Tt=O({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in Xe},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function Lt(e,t){const n=j({}),o=j();W&&(ge(()=>!!(t.isActive.value&&e.locationStrategy),a=>{var i,s;B(()=>e.locationStrategy,a),M(()=>{o.value=void 0}),typeof e.locationStrategy=="function"?o.value=(i=e.locationStrategy(t,e,n))==null?void 0:i.updateLocation:o.value=(s=Xe[e.locationStrategy](t,e,n))==null?void 0:s.updateLocation}),window.addEventListener("resize",r,{passive:!0}),M(()=>{window.removeEventListener("resize",r),o.value=void 0}));function r(a){var i;(i=o.value)==null||i.call(o,a)}return{contentStyles:n,updateLocation:o}}function Ft(){}function Bt(e,t){t?e.style.removeProperty("left"):e.style.removeProperty("right");const n=bt(e);return t?n.x+=parseFloat(e.style.right||0):n.x-=parseFloat(e.style.left||0),n.y-=parseFloat(e.style.top||0),n}function Mt(e,t,n){Ot(e.activatorEl.value)&&Object.assign(n.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:r,preferredOrigin:a}=_e(()=>{const g=ue(t.location,e.isRtl.value),d=t.origin==="overlap"?g:t.origin==="auto"?ne(g):ue(t.origin,e.isRtl.value);return g.side===d.side&&g.align===oe(d).align?{preferredAnchor:Pe(g),preferredOrigin:Pe(d)}:{preferredAnchor:g,preferredOrigin:d}}),[i,s,l,u]=["minWidth","minHeight","maxWidth","maxHeight"].map(g=>y(()=>{const d=parseFloat(t[g]);return isNaN(d)?1/0:d})),f=y(()=>{if(Array.isArray(t.offset))return t.offset;if(typeof t.offset=="string"){const g=t.offset.split(" ").map(parseFloat);return g.length<2&&g.push(0),g}return typeof t.offset=="number"?[t.offset,0]:[0,0]});let v=!1;const m=new ResizeObserver(()=>{v&&p()});B([e.activatorEl,e.contentEl],(g,d)=>{let[R,P]=g,[x,c]=d;x&&m.unobserve(x),R&&m.observe(R),c&&m.unobserve(c),P&&m.observe(P)},{immediate:!0}),M(()=>{m.disconnect()});function p(){if(v=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>v=!0)}),!e.activatorEl.value||!e.contentEl.value)return;const g=e.activatorEl.value.getBoundingClientRect(),d=Bt(e.contentEl.value,e.isRtl.value),R=ee(e.contentEl.value),P=12;R.length||(R.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(d.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),d.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const x=R.reduce((E,S)=>{const h=S.getBoundingClientRect(),w=new Y({x:S===document.documentElement?0:h.x,y:S===document.documentElement?0:h.y,width:S.clientWidth,height:S.clientHeight});return E?new Y({x:Math.max(E.left,w.left),y:Math.max(E.top,w.top),width:Math.min(E.right,w.right)-Math.max(E.left,w.left),height:Math.min(E.bottom,w.bottom)-Math.max(E.top,w.top)}):w},void 0);x.x+=P,x.y+=P,x.width-=P*2,x.height-=P*2;let c={anchor:r.value,origin:a.value};function L(E){const S=new Y(d),h=Ae(E.anchor,g),w=Ae(E.origin,S);let{x:F,y:D}=At(h,w);switch(E.anchor.side){case"top":D-=f.value[0];break;case"bottom":D+=f.value[0];break;case"left":F-=f.value[0];break;case"right":F+=f.value[0];break}switch(E.anchor.align){case"top":D-=f.value[1];break;case"bottom":D+=f.value[1];break;case"left":F-=f.value[1];break;case"right":F+=f.value[1];break}return S.x+=F,S.y+=D,S.width=Math.min(S.width,l.value),S.height=Math.min(S.height,u.value),{overflows:Re(S,x),x:F,y:D}}let _=0,H=0;const $={x:0,y:0},G={x:!1,y:!1};let X=-1;for(;!(X++>10);){const{x:E,y:S,overflows:h}=L(c);_+=E,H+=S,d.x+=E,d.y+=S;{const w=ke(c.anchor),F=h.x.before||h.x.after,D=h.y.before||h.y.after;let z=!1;if(["x","y"].forEach(C=>{if(C==="x"&&F&&!G.x||C==="y"&&D&&!G.y){const b={anchor:{...c.anchor},origin:{...c.origin}},A=C==="x"?w==="y"?oe:ne:w==="y"?ne:oe;b.anchor=A(b.anchor),b.origin=A(b.origin);const{overflows:I}=L(b);(I[C].before<=h[C].before&&I[C].after<=h[C].after||I[C].before+I[C].after<(h[C].before+h[C].after)/2)&&(c=b,z=G[C]=!0)}}),z)continue}h.x.before&&(_+=h.x.before,d.x+=h.x.before),h.x.after&&(_-=h.x.after,d.x-=h.x.after),h.y.before&&(H+=h.y.before,d.y+=h.y.before),h.y.after&&(H-=h.y.after,d.y-=h.y.after);{const w=Re(d,x);$.x=x.width-w.x.before-w.x.after,$.y=x.height-w.y.before-w.y.after,_+=w.x.before,d.x+=w.x.before,H+=w.y.before,d.y+=w.y.before}break}const N=ke(c.anchor);return Object.assign(n.value,{"--v-overlay-anchor-origin":`${c.anchor.side} ${c.anchor.align}`,transformOrigin:`${c.origin.side} ${c.origin.align}`,top:k(re(H)),left:e.isRtl.value?void 0:k(re(_)),right:e.isRtl.value?k(re(-_)):void 0,minWidth:k(N==="y"?Math.min(i.value,g.width):i.value),maxWidth:k(Te(Se($.x,i.value===1/0?0:i.value,l.value))),maxHeight:k(Te(Se($.y,s.value===1/0?0:s.value,u.value)))}),{available:$,contentBox:d}}return B(()=>[r.value,a.value,t.offset,t.minWidth,t.minHeight,t.maxWidth,t.maxHeight],()=>p()),J(()=>{const g=p();if(!g)return;const{available:d,contentBox:R}=g;R.height>d.y&&requestAnimationFrame(()=>{p(),requestAnimationFrame(()=>{p()})})}),{updateLocation:p}}function re(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function Te(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let fe=!0;const te=[];function Dt(e){!fe||te.length?(te.push(e),de()):(fe=!1,e(),de())}let Le=-1;function de(){cancelAnimationFrame(Le),Le=requestAnimationFrame(()=>{const e=te.shift();e&&e(),te.length?de():fe=!0})}const Z={none:null,close:Vt,block:Wt,reposition:Ht},Nt=O({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in Z}},"VOverlay-scroll-strategies");function _t(e,t){if(!W)return;let n;he(async()=>{n==null||n.stop(),t.isActive.value&&e.scrollStrategy&&(n=Ve(),await J(),n.active&&n.run(()=>{var o;typeof e.scrollStrategy=="function"?e.scrollStrategy(t,e,n):(o=Z[e.scrollStrategy])==null||o.call(Z,t,e,n)}))}),M(()=>{n==null||n.stop()})}function Vt(e){function t(n){e.isActive.value=!1}Ke(e.activatorEl.value??e.contentEl.value,t)}function Wt(e,t){var i;const n=(i=e.root.value)==null?void 0:i.offsetParent,o=[...new Set([...ee(e.activatorEl.value,t.contained?n:void 0),...ee(e.contentEl.value,t.contained?n:void 0)])].filter(s=>!s.classList.contains("v-overlay-scroll-blocked")),r=window.innerWidth-document.documentElement.offsetWidth,a=(s=>we(s)&&s)(n||document.documentElement);a&&e.root.value.classList.add("v-overlay--scroll-blocked"),o.forEach((s,l)=>{s.style.setProperty("--v-body-scroll-x",k(-s.scrollLeft)),s.style.setProperty("--v-body-scroll-y",k(-s.scrollTop)),s!==document.documentElement&&s.style.setProperty("--v-scrollbar-offset",k(r)),s.classList.add("v-overlay-scroll-blocked")}),M(()=>{o.forEach((s,l)=>{const u=parseFloat(s.style.getPropertyValue("--v-body-scroll-x")),f=parseFloat(s.style.getPropertyValue("--v-body-scroll-y"));s.style.removeProperty("--v-body-scroll-x"),s.style.removeProperty("--v-body-scroll-y"),s.style.removeProperty("--v-scrollbar-offset"),s.classList.remove("v-overlay-scroll-blocked"),s.scrollLeft=-u,s.scrollTop=-f}),a&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function Ht(e,t,n){let o=!1,r=-1,a=-1;function i(s){Dt(()=>{var f,v;const l=performance.now();(v=(f=e.updateLocation).value)==null||v.call(f,s),o=(performance.now()-l)/(1e3/60)>2})}a=(typeof requestIdleCallback>"u"?s=>s():requestIdleCallback)(()=>{n.run(()=>{Ke(e.activatorEl.value??e.contentEl.value,s=>{o?(cancelAnimationFrame(r),r=requestAnimationFrame(()=>{r=requestAnimationFrame(()=>{i(s)})})):i(s)})})}),M(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(a),cancelAnimationFrame(r)})}function Ke(e,t){const n=[document,...ee(e)];n.forEach(o=>{o.addEventListener("scroll",t,{passive:!0})}),M(()=>{n.forEach(o=>{o.removeEventListener("scroll",t)})})}const $t=Symbol.for("vuetify:v-menu"),It=O({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function jt(e,t){const n={},o=r=>()=>{if(!W)return Promise.resolve(!0);const a=r==="openDelay";return n.closeDelay&&window.clearTimeout(n.closeDelay),delete n.closeDelay,n.openDelay&&window.clearTimeout(n.openDelay),delete n.openDelay,new Promise(i=>{const s=parseInt(e[r]??0,10);n[r]=window.setTimeout(()=>{t==null||t(a),i(a)},s)})};return{runCloseDelay:o("closeDelay"),runOpenDelay:o("openDelay")}}const zt=O({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...It()},"VOverlay-activator");function qt(e,t){let{isActive:n,isTop:o}=t;const r=j();let a=!1,i=!1,s=!0;const l=y(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),u=y(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!l.value),{runOpenDelay:f,runCloseDelay:v}=jt(e,c=>{c===(e.openOnHover&&a||l.value&&i)&&!(e.openOnHover&&n.value&&!o.value)&&(n.value!==c&&(s=!0),n.value=c)}),m={onClick:c=>{c.stopPropagation(),r.value=c.currentTarget||c.target,n.value=!n.value},onMouseenter:c=>{var L;(L=c.sourceCapabilities)!=null&&L.firesTouchEvents||(a=!0,r.value=c.currentTarget||c.target,f())},onMouseleave:c=>{a=!1,v()},onFocus:c=>{tt(c.target,":focus-visible")!==!1&&(i=!0,c.stopPropagation(),r.value=c.currentTarget||c.target,f())},onBlur:c=>{i=!1,c.stopPropagation(),v()}},p=y(()=>{const c={};return u.value&&(c.onClick=m.onClick),e.openOnHover&&(c.onMouseenter=m.onMouseenter,c.onMouseleave=m.onMouseleave),l.value&&(c.onFocus=m.onFocus,c.onBlur=m.onBlur),c}),g=y(()=>{const c={};if(e.openOnHover&&(c.onMouseenter=()=>{a=!0,f()},c.onMouseleave=()=>{a=!1,v()}),l.value&&(c.onFocusin=()=>{i=!0,f()},c.onFocusout=()=>{i=!1,v()}),e.closeOnContentClick){const L=We($t,null);c.onClick=()=>{n.value=!1,L==null||L.closeParents()}}return c}),d=y(()=>{const c={};return e.openOnHover&&(c.onMouseenter=()=>{s&&(a=!0,s=!1,f())},c.onMouseleave=()=>{a=!1,v()}),c});B(o,c=>{c&&(e.openOnHover&&!a&&(!l.value||!i)||l.value&&!i&&(!e.openOnHover||!a))&&(n.value=!1)});const R=j();he(()=>{R.value&&J(()=>{r.value=et(R.value)})});const P=U("useActivator");let x;return B(()=>!!e.activator,c=>{c&&W?(x=Ve(),x.run(()=>{Yt(e,P,{activatorEl:r,activatorEvents:p})})):x&&x.stop()},{flush:"post",immediate:!0}),M(()=>{x==null||x.stop()}),{activatorEl:r,activatorRef:R,activatorEvents:p,contentEvents:g,scrimEvents:d}}function Yt(e,t,n){let{activatorEl:o,activatorEvents:r}=n;B(()=>e.activator,(l,u)=>{if(u&&l!==u){const f=s(u);f&&i(f)}l&&J(()=>a())},{immediate:!0}),B(()=>e.activatorProps,()=>{a()}),M(()=>{i()});function a(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:s(),u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;l&&xt(l,V(r.value,u))}function i(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:s(),u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;l&&St(l,V(r.value,u))}function s(){var f,v;let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator,u;if(l)if(l==="parent"){let m=(v=(f=t==null?void 0:t.proxy)==null?void 0:f.$el)==null?void 0:v.parentNode;for(;m!=null&&m.hasAttribute("data-no-activator");)m=m.parentNode;u=m}else typeof l=="string"?u=document.querySelector(l):"$el"in l?u=l.$el:u=l;return o.value=(u==null?void 0:u.nodeType)===Node.ELEMENT_NODE?u:null,o.value}}function xe(e){return _e(()=>{const t=[],n={};if(e.value.background)if(pe(e.value.background)){if(n.backgroundColor=e.value.background,!e.value.text){const o=nt(n.backgroundColor);n.color=o,n.caretColor=o}}else t.push(`bg-${e.value.background}`);return e.value.text&&(pe(e.value.text)?(n.color=e.value.text,n.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:n}})}function wn(e,t){const n=y(()=>({text:ye(e)?e.value:t?e[t]:null})),{colorClasses:o,colorStyles:r}=xe(n);return{textColorClasses:o,textColorStyles:r}}function Gt(e,t){const n=y(()=>({background:ye(e)?e.value:t?e[t]:null})),{colorClasses:o,colorStyles:r}=xe(n);return{backgroundColorClasses:o,backgroundColorStyles:r}}const Xt=O({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function Kt(e){return{dimensionStyles:y(()=>({height:k(e.height),maxHeight:k(e.maxHeight),maxWidth:k(e.maxWidth),minHeight:k(e.minHeight),minWidth:k(e.minWidth),width:k(e.width)}))}}function Ut(){if(!W)return q(!1);const{ssr:e}=ot();if(e){const t=q(!1);return at(()=>{t.value=!0}),t}else return q(!0)}const Jt=O({eager:Boolean},"lazy");function Qt(e,t){const n=q(!1),o=y(()=>n.value||e.eager||t.value);B(t,()=>n.value=!0);function r(){e.eager||(n.value=!1)}return{isBooted:n,hasContent:o,onAfterLeave:r}}function Zt(){var e,t;return(t=(e=U("useRouter"))==null?void 0:e.proxy)==null?void 0:t.$router}function xn(e,t){const n=rt("RouterLink"),o=y(()=>!!(e.href||e.to)),r=y(()=>(o==null?void 0:o.value)||Ee(t,"click")||Ee(e,"click"));if(typeof n=="string")return{isLink:o,isClickable:r,href:He(e,"href")};const a=e.to?n.useLink(e):void 0;return{isLink:o,isClickable:r,route:a==null?void 0:a.route,navigate:a==null?void 0:a.navigate,isActive:a&&y(()=>{var i,s;return e.exact?(i=a.isExactActive)==null?void 0:i.value:(s=a.isActive)==null?void 0:s.value}),href:y(()=>e.to?a==null?void 0:a.route.value.href:e.href)}}const Sn=O({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let ie=!1;function en(e,t){let n=!1,o,r;W&&(J(()=>{window.addEventListener("popstate",a),o=e==null?void 0:e.beforeEach((i,s,l)=>{ie?n?t(l):l():setTimeout(()=>n?t(l):l()),ie=!0}),r=e==null?void 0:e.afterEach(()=>{ie=!1})}),M(()=>{window.removeEventListener("popstate",a),o==null||o(),r==null||r()}));function a(i){var s;(s=i.state)!=null&&s.replaced||(n=!0,setTimeout(()=>n=!1))}}function tn(){const t=U("useScopeId").vnode.scopeId;return{scopeId:t?{[t]:""}:void 0}}const Fe=Symbol.for("vuetify:stack"),K=$e([]);function nn(e,t,n){const o=U("useStack"),r=!n,a=We(Fe,void 0),i=$e({activeChildren:new Set});it(Fe,i);const s=q(+t.value);ge(e,()=>{var v;const f=(v=K.at(-1))==null?void 0:v[1];s.value=f?f+10:+t.value,r&&K.push([o.uid,s.value]),a==null||a.activeChildren.add(o.uid),M(()=>{if(r){const m=st(K).findIndex(p=>p[0]===o.uid);K.splice(m,1)}a==null||a.activeChildren.delete(o.uid)})});const l=q(!0);r&&he(()=>{var v;const f=((v=K.at(-1))==null?void 0:v[0])===o.uid;setTimeout(()=>l.value=f)});const u=y(()=>!i.activeChildren.size);return{globalTop:lt(l),localTop:u,stackStyles:y(()=>({zIndex:s.value}))}}function on(e){return{teleportTarget:y(()=>{const n=e.value;if(n===!0||!W)return;const o=n===!1?document.body:typeof n=="string"?document.querySelector(n):n;if(o==null)return;let r=o.querySelector(":scope > .v-overlay-container");return r||(r=document.createElement("div"),r.className="v-overlay-container",o.appendChild(r)),r})}}const an=O({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),rn=(e,t)=>{let{slots:n}=t;const{transition:o,disabled:r,...a}=e,{component:i=Ie,...s}=typeof o=="object"?o:{};return ct(i,V(typeof o=="string"?{name:r?"":o}:s,a,{disabled:r}),n)};function sn(){return!0}function Ue(e,t,n){if(!e||Je(e,n)===!1)return!1;const o=Ye(t);if(typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&o.host===e.target)return!1;const r=(typeof n.value=="object"&&n.value.include||(()=>[]))();return r.push(t),!r.some(a=>a==null?void 0:a.contains(e.target))}function Je(e,t){return(typeof t.value=="object"&&t.value.closeConditional||sn)(e)}function ln(e,t,n){const o=typeof n.value=="function"?n.value:n.value.handler;t._clickOutside.lastMousedownWasOutside&&Ue(e,t,n)&&setTimeout(()=>{Je(e,n)&&o&&o(e)},0)}function Be(e,t){const n=Ye(e);t(document),typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&t(n)}const cn={mounted(e,t){const n=r=>ln(r,e,t),o=r=>{e._clickOutside.lastMousedownWasOutside=Ue(r,e,t)};Be(e,r=>{r.addEventListener("click",n,!0),r.addEventListener("mousedown",o,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[t.instance.$.uid]={onClick:n,onMousedown:o}},unmounted(e,t){e._clickOutside&&(Be(e,n=>{var a;if(!n||!((a=e._clickOutside)!=null&&a[t.instance.$.uid]))return;const{onClick:o,onMousedown:r}=e._clickOutside[t.instance.$.uid];n.removeEventListener("click",o,!0),n.removeEventListener("mousedown",r,!0)}),delete e._clickOutside[t.instance.$.uid])}};function un(e){const{modelValue:t,color:n,...o}=e;return T(Ie,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&T("div",V({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const fn=O({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...zt(),...qe(),...Xt(),...Jt(),...Tt(),...Nt(),...ut(),...an()},"VOverlay"),pn=ve()({name:"VOverlay",directives:{ClickOutside:cn},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...fn()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,t){let{slots:n,attrs:o,emit:r}=t;const a=ft(e,"modelValue"),i=y({get:()=>a.value,set:b=>{b&&e.disabled||(a.value=b)}}),{teleportTarget:s}=on(y(()=>e.attach||e.contained)),{themeClasses:l}=dt(e),{rtlClasses:u,isRtl:f}=me(),{hasContent:v,onAfterLeave:m}=Qt(e,i),p=Gt(y(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:g,localTop:d,stackStyles:R}=nn(i,He(e,"zIndex"),e._disableGlobalStack),{activatorEl:P,activatorRef:x,activatorEvents:c,contentEvents:L,scrimEvents:_}=qt(e,{isActive:i,isTop:d}),{dimensionStyles:H}=Kt(e),$=Ut(),{scopeId:G}=tn();B(()=>e.disabled,b=>{b&&(i.value=!1)});const X=j(),N=j(),{contentStyles:E,updateLocation:S}=Lt(e,{isRtl:f,contentEl:N,activatorEl:P,isActive:i});_t(e,{root:X,contentEl:N,activatorEl:P,isActive:i,updateLocation:S});function h(b){r("click:outside",b),e.persistent?C():i.value=!1}function w(){return i.value&&g.value}W&&B(i,b=>{b?window.addEventListener("keydown",F):window.removeEventListener("keydown",F)},{immediate:!0});function F(b){var A,I;b.key==="Escape"&&g.value&&(e.persistent?C():(i.value=!1,(A=N.value)!=null&&A.contains(document.activeElement)&&((I=P.value)==null||I.focus())))}const D=Zt();ge(()=>e.closeOnBack,()=>{en(D,b=>{g.value&&i.value?(b(!1),e.persistent?C():i.value=!1):b()})});const z=j();B(()=>i.value&&(e.absolute||e.contained)&&s.value==null,b=>{if(b){const A=Et(X.value);A&&A!==document.scrollingElement&&(z.value=A.scrollTop)}});function C(){e.noClickAnimation||N.value&&wt(N.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:pt})}return Ge(()=>{var b;return T(je,null,[(b=n.activator)==null?void 0:b.call(n,{isActive:i.value,props:V({ref:x},c.value,e.activatorProps)}),$.value&&v.value&&T(vt,{disabled:!s.value,to:s.value},{default:()=>[T("div",V({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":i.value,"v-overlay--contained":e.contained},l.value,u.value,e.class],style:[R.value,{top:k(z.value)},e.style],ref:X},G,o),[T(un,V({color:p,modelValue:i.value&&!!e.scrim},_.value),null),T(rn,{appear:!0,persisted:!0,transition:e.transition,target:P.value,onAfterLeave:()=>{m(),r("afterLeave")}},{default:()=>{var A;return[mt(T("div",V({ref:N,class:["v-overlay__content",e.contentClass],style:[H.value,E.value]},L.value,e.contentProps),[(A=n.default)==null?void 0:A.call(n,{isActive:i})]),[[gt,i.value],[ht("click-outside"),{handler:h,closeConditional:w,include:()=>[P.value]}]])]}})])]})])}),{activatorEl:P,animateClick:C,contentEl:N,globalTop:g,localTop:d,updateLocation:S}}}),se=Symbol("Forwarded refs");function le(e,t){let n=e;for(;n;){const o=Reflect.getOwnPropertyDescriptor(n,t);if(o)return o;n=Object.getPrototypeOf(n)}}function En(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return e[se]=n,new Proxy(e,{get(r,a){if(Reflect.has(r,a))return Reflect.get(r,a);if(!(typeof a=="symbol"||a.startsWith("__"))){for(const i of n)if(i.value&&Reflect.has(i.value,a)){const s=Reflect.get(i.value,a);return typeof s=="function"?s.bind(i.value):s}}},has(r,a){if(Reflect.has(r,a))return!0;if(typeof a=="symbol"||a.startsWith("__"))return!1;for(const i of n)if(i.value&&Reflect.has(i.value,a))return!0;return!1},set(r,a,i){if(Reflect.has(r,a))return Reflect.set(r,a,i);if(typeof a=="symbol"||a.startsWith("__"))return!1;for(const s of n)if(s.value&&Reflect.has(s.value,a))return Reflect.set(s.value,a,i);return!1},getOwnPropertyDescriptor(r,a){var s;const i=Reflect.getOwnPropertyDescriptor(r,a);if(i)return i;if(!(typeof a=="symbol"||a.startsWith("__"))){for(const l of n){if(!l.value)continue;const u=le(l.value,a)??("_"in l.value?le((s=l.value._)==null?void 0:s.setupState,a):void 0);if(u)return u}for(const l of n){const u=l.value&&l.value[se];if(!u)continue;const f=u.slice();for(;f.length;){const v=f.shift(),m=le(v.value,a);if(m)return m;const p=v.value&&v.value[se];p&&f.push(...p)}}}}})}const Me={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},Cn=O({location:String},"location");function On(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=arguments.length>2?arguments[2]:void 0;const{isRtl:o}=me();return{locationStyles:y(()=>{if(!e.location)return{};const{side:a,align:i}=ue(e.location.split(" ").length>1?e.location:`${e.location} center`,o.value);function s(u){return n?n(u):0}const l={};return a!=="center"&&(t?l[Me[a]]=`calc(100% - ${s(a)}px)`:l[a]=0),i!=="center"?t?l[Me[i]]=`calc(100% - ${s(i)}px)`:l[i]=0:(a==="center"?l.top=l.left="50%":l[{top:"left",bottom:"left",left:"top",right:"top"}[a]]="50%",l.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[a]),l})}}const dn=["static","relative","fixed","absolute","sticky"],Pn=O({position:{type:String,validator:e=>dn.includes(e)}},"position");function kn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:be();return{positionClasses:y(()=>e.position?`${t}--${e.position}`:void 0)}}const Rn=O({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded");function An(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:be();return{roundedClasses:y(()=>{const o=ye(e)?e.value:e.rounded,r=[];if(o===!0||o==="")r.push(`${t}--rounded`);else if(typeof o=="string"||o===0)for(const a of String(o).split(" "))r.push(`rounded-${a}`);return r})}}const vn=["elevated","flat","tonal","outlined","text","plain"];function Tn(e,t){return T(je,null,[e&&T("span",{key:"overlay",class:`${t}__overlay`},null),T("span",{key:"underlay",class:`${t}__underlay`},null)])}const Ln=O({color:String,variant:{type:String,default:"elevated",validator:e=>vn.includes(e)}},"variant");function Fn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:be();const n=y(()=>{const{variant:a}=Ce(e);return`${t}--variant-${a}`}),{colorClasses:o,colorStyles:r}=xe(y(()=>{const{variant:a,color:i}=Ce(e);return{[["elevated","flat"].includes(a)?"background":"text"]:i}}));return{colorClasses:o,colorStyles:r,variantClasses:n}}export{hn as A,bt as B,an as C,Zt as D,Oe as E,$t as F,Et as G,rn as M,yn as V,Pn as a,Rn as b,Ln as c,fn as d,kn as e,tn as f,Fn as g,An as h,Ge as i,pn as j,Tn as k,bn as l,Cn as m,En as n,qe as o,Pt as p,wn as q,Gt as r,Xt as s,Sn as t,On as u,Kt as v,xn as w,wt as x,gn as y,pt as z};
