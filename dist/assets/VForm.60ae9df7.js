var g=Object.defineProperty;var m=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var p=(o,t,e)=>t in o?g(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,d=(o,t)=>{for(var e in t||(t={}))R.call(t,e)&&p(o,e,t[e]);if(m)for(var e of m(t))h.call(t,e)&&p(o,e,t[e]);return o};import{m as P,c as w}from"./form.d37e05cc.js";import{j as O,J as D,a as F}from"./index.7ed09931.js";import{h as V}from"./index.04c52f7c.js";function j(o){for(var t=arguments.length,e=new Array(t>1?t-1:0),l=1;l<t;l++)e[l-1]=arguments[l];return new Proxy(o,{get(f,n){if(Reflect.has(f,n))return Reflect.get(f,n);for(const s of e)if(s.value&&Reflect.has(s.value,n)){const a=Reflect.get(s.value,n);return typeof a=="function"?a.bind(s.value):a}},getOwnPropertyDescriptor(f,n){const s=Reflect.getOwnPropertyDescriptor(f,n);if(s)return s;for(const a of e){if(!a.value)continue;const r=Reflect.getOwnPropertyDescriptor(a.value,n);if(r)return r}for(const a of e){let r=a.value&&Object.getPrototypeOf(a.value);for(;r;){const u=Reflect.getOwnPropertyDescriptor(r,n);if(u)return u;r=Object.getPrototypeOf(r)}}}})}const C=O({name:"VForm",props:d({},P()),emits:{"update:modelValue":o=>!0,submit:o=>!0},setup(o,t){let{slots:e,emit:l}=t;const f=w(o),n=D();function s(r){r.preventDefault(),f.reset()}function a(r){const u=r,i=f.validate();u.then=i.then.bind(i),u.catch=i.catch.bind(i),u.finally=i.finally.bind(i),l("submit",u),u.defaultPrevented||i.then(v=>{let{valid:b}=v;if(b){var c;(c=n.value)==null||c.submit()}}),u.preventDefault()}return V(()=>{var r;return F("form",{ref:n,class:"v-form",novalidate:!0,onReset:s,onSubmit:a},[(r=e.default)==null?void 0:r.call(e,f)])}),j(f,n)}});export{C as V,j as u};