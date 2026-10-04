import{a as S}from"./chunk-CYGIYZWD.js";import{a as z}from"./chunk-VAL26HVG.js";import{$a as w,Ca as p,Da as t,Ea as M,H as v,I as C,P as a,Ra as f,U as D,ba as E,ca as m,da as u,g as h,l as x,la as o,ma as l,n as b,na as d,r as k,va as y,z as c}from"./chunk-ZAB2ACMA.js";function _(e,n){e&1&&(t(0,`
          `),d(1,"span",3),t(2,`
        `))}function R(e,n){if(e&1&&(t(0,`
        `),o(1,"span",4),t(2),l(),t(3,`
      `)),e&2){let g=y();a(),p(g.textClass),a(),M(g.label)}}var I=(()=>{let n=class n{constructor(){this.compact=f(!1),this.onDark=f(!1),this.http=c(w),this.destroyRef=c(v),this.running=C(null),this.poll(0)}get label(){return this.running()===!0?$localize`:@@backend.running:Running`:this.running()===!1?$localize`:@@backend.waking:Server is waking up`:$localize`:@@backend.checking:Checking server…`}get dotClass(){return this.running()===!0?"bg-emerald-500":this.running()===!1?"bg-amber-400 animate-pulse":"bg-zinc-300 animate-pulse"}get textClass(){return this.running()===!0?this.onDark()?"text-emerald-300":"text-emerald-700":this.running()===!1?this.onDark()?"text-amber-200":"text-zinc-500":this.onDark()?"text-zinc-300":"text-zinc-500"}poll(s){x(s).pipe(S(this.destroyRef),k(()=>this.http.get(z.apiPath+"/",{responseType:"text"}).pipe(b(()=>h("error"))))).subscribe(r=>{let i=r!=="error";this.running.set(i),this.poll(i?14.5*60*1e3:5e3)})}};n.\u0275fac=function(r){return new(r||n)},n.\u0275cmp=D({type:n,selectors:[["app-backend-status"]],inputs:{compact:[1,"compact"],onDark:[1,"onDark"]},decls:11,vars:5,consts:[["role","status",1,"inline-flex","items-center","gap-1.5"],["aria-hidden","true",1,"relative","flex","h-2.5","w-2.5"],[1,"relative","inline-flex","h-2.5","w-2.5","rounded-full"],[1,"absolute","inline-flex","h-full","w-full","animate-ping","rounded-full","bg-emerald-400","opacity-60"],[1,"text-sm"]],template:function(r,i){r&1&&(t(0,`
    `),o(1,"span",0),t(2,`
      `),o(3,"span",1),t(4,`
        `),m(5,_,3,0),d(6,"span",2),t(7,`
      `),l(),t(8,`
      `),m(9,R,4,3),l(),t(10,`
  `)),r&2&&(a(),E("aria-label",i.label),a(4),u(i.running()===!0?5:-1),a(),p(i.dotClass),a(3),u(i.compact()?-1:9))},encapsulation:2});let e=n;return e})();export{I as a};
