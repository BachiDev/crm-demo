import{a as j}from"./chunk-VAL26HVG.js";import{Ba as b,Ca as t,Da as S,F as c,G as p,N as o,Qa as E,S as C,_a as I,aa as k,ba as m,ca as f,d as v,g as h,ka as l,l as x,la as d,ma as g,n as y,p as D,q as w,ua as M,x as a}from"./chunk-JRLO7FLJ.js";function R(e){e||(e=a(c));let n=new v(r=>{if(e.destroyed){r.next();return}return e.onDestroy(r.next.bind(r))});return r=>r.pipe(w(n))}function q(e,n){e&1&&(t(0,`
          `),g(1,"span",3),t(2,`
        `))}function O(e,n){if(e&1&&(t(0,`
        `),l(1,"span",4),t(2),d(),t(3,`
      `)),e&2){let r=M();o(),b(r.textClass),o(),S(r.label)}}var Z=(()=>{let n=class n{constructor(){this.compact=E(!1),this.http=a(I),this.destroyRef=a(c),this.running=p(null),this.poll(0)}get label(){return this.running()===!0?$localize`:@@backend.running:Running`:this.running()===!1?$localize`:@@backend.waking:Server is waking up`:$localize`:@@backend.checking:Checking server…`}get dotClass(){return this.running()===!0?"bg-emerald-500":this.running()===!1?"bg-amber-400 animate-pulse":"bg-zinc-300 animate-pulse"}get textClass(){return this.running()===!0?"text-emerald-700":"text-zinc-500"}poll(u){x(u).pipe(R(this.destroyRef),D(()=>this.http.get(j.apiPath+"/",{responseType:"text"}).pipe(y(()=>h("error"))))).subscribe(s=>{let i=s!=="error";this.running.set(i),this.poll(i?14.5*60*1e3:5e3)})}};n.\u0275fac=function(s){return new(s||n)},n.\u0275cmp=C({type:n,selectors:[["app-backend-status"]],inputs:{compact:[1,"compact"]},decls:11,vars:5,consts:[["role","status",1,"inline-flex","items-center","gap-1.5"],["aria-hidden","true",1,"relative","flex","h-2.5","w-2.5"],[1,"relative","inline-flex","h-2.5","w-2.5","rounded-full"],[1,"absolute","inline-flex","h-full","w-full","animate-ping","rounded-full","bg-emerald-400","opacity-60"],[1,"text-sm"]],template:function(s,i){s&1&&(t(0,`
    `),l(1,"span",0),t(2,`
      `),l(3,"span",1),t(4,`
        `),m(5,q,3,0),g(6,"span",2),t(7,`
      `),d(),t(8,`
      `),m(9,O,4,3),d(),t(10,`
  `)),s&2&&(o(),k("aria-label",i.label),o(4),f(i.running()===!0?5:-1),o(),b(i.dotClass),o(3),f(i.compact()?-1:9))},encapsulation:2});let e=n;return e})();export{R as a,Z as b};
