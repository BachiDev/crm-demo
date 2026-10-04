import{a as K}from"./chunk-CYGIYZWD.js";import{Aa as U,B as M,C as P,D as z,Da as e,E as F,Ea as s,Fa as S,H as $,Ja as J,P as a,Qa as b,Ra as c,U as _,ba as I,ca as E,da as h,e as L,ea as G,fa as R,ga as B,ha as A,ia as f,ja as x,kb as O,la as l,ma as r,na as V,o as D,oa as T,p as k,pa as C,qa as v,ra as q,sa as W,ua as u,va as N,wa as X,xa as j,ya as Q,z as w,za as H}from"./chunk-ZAB2ACMA.js";function Y(i,t){if(i&1&&(e(0,`
        `),f(1,"span",3),e(2),x(),e(3,`
      `)),i&2){let p=N();a(),I("aria-label",p.countLabel()),a(),S(`
          `,p.count(),`
        `)}}var pe=(()=>{let t=class t{constructor(){this.title=c.required(),this.count=c(null),this.countLabel=c(""),this.createLink=c.required(),this.createLabel=c.required()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["app-page-header"]],inputs:{title:[1,"title"],count:[1,"count"],countLabel:[1,"countLabel"],createLink:[1,"createLink"],createLabel:[1,"createLabel"]},decls:11,vars:4,consts:[[1,"mb-6","flex","flex-wrap","items-center","gap-3"],[1,"grow","text-3xl","font-semibold","tracking-tight","md:text-4xl"],[1,"inline-block","rounded-full","bg-violet-600","px-5","py-2","font-medium","text-white","hover:bg-violet-500",3,"routerLink"],[1,"rounded-full","bg-zinc-100","px-3","py-1","font-mono","text-sm","text-zinc-600"]],template:function(o,n){o&1&&(e(0,`
    `),f(1,"div",0),e(2,`
      `),f(3,"h1",1),e(4),x(),e(5,`
      `),E(6,Y,4,2),f(7,"a",2),e(8),x(),e(9,`
    `),x(),e(10,`
  `)),o&2&&(a(4),s(n.title()),a(2),h(n.count()!==null?6:-1),a(),A("routerLink",n.createLink()),a(),S(`
        `,n.createLabel(),`
      `))},dependencies:[O],encapsulation:2,changeDetection:0});let i=t;return i})();var Z=["*"],ee=()=>[10,25,50];function te(i,t){i&1&&e(0,"records")}function ne(i,t){if(i&1&&(e(0,`
              `),l(1,"option",13),e(2),r(),e(3,`
            `)),i&2){let p=t.$implicit;a(),C("value",p),a(),s(p)}}var fe=(()=>{let t=class t{constructor(){this.page=c.required(),this.totalPages=c.required(),this.totalElements=c.required(),this.pageSize=c.required(),this.pageChange=b(),this.pageSizeChange=b()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["app-pagination"]],inputs:{page:[1,"page"],totalPages:[1,"totalPages"],totalElements:[1,"totalElements"],pageSize:[1,"pageSize"]},outputs:{pageChange:"pageChange",pageSizeChange:"pageSizeChange"},ngContentSelectors:Z,decls:39,vars:7,consts:()=>{let d;d=$localize`:@@pagination.page:Page ${"\uFFFD0\uFFFD"}:INTERPOLATION: of ${"\uFFFD1\uFFFD"}:INTERPOLATION_1:`;let o;o=$localize`:@@pagination.perPage:Per page`;let n;n=$localize`:@@pagination.prev:← Prev`;let m;return m=$localize`:@@pagination.next:Next →`,[d,o,n,m,[1,"mt-4","flex","flex-wrap","items-center","justify-between","gap-3","text-sm","text-zinc-600"],["role","status"],[1,"font-mono","font-medium","text-zinc-900"],[1,"text-zinc-400"],[1,"flex","items-center","gap-2"],[1,"flex","items-center","gap-1.5"],[1,"text-zinc-500"],["aria-label","Rows per page",1,"rounded-lg","border-zinc-300","py-1","text-sm",3,"change","value"],["type","button",1,"rounded-lg","border","border-zinc-300","px-3","py-1","hover:bg-zinc-100","disabled:cursor-not-allowed","disabled:opacity-40",3,"click","disabled"],[3,"value"]]},template:function(o,n){o&1&&(X(),e(0,`
    `),l(1,"div",4),e(2,`
      `),l(3,"p",5),e(4,`
        `),l(5,"span",6),e(6),r(),e(7,`
        `),j(8,0,null,te,1,0),e(10,`
        `),l(11,"span",7),e(12,"\xB7"),r(),e(13,`
        `),l(14,"span"),v(15,0),r(),e(16,`
      `),r(),e(17,`
      `),l(18,"div",8),e(19,`
        `),l(20,"label",9),e(21,`
          `),l(22,"span",10),v(23,1),r(),e(24,`
          `),l(25,"select",11),u("change",function(g){return n.pageSizeChange.emit(+g.target.value)}),e(26,`
            `),R(27,ne,4,2,null,null,G),r(),e(29,`
        `),r(),e(30,`
        `),l(31,"button",12),u("click",function(){return n.pageChange.emit(n.page()-1)}),v(32,2),r(),e(33,`
        `),l(34,"button",12),u("click",function(){return n.pageChange.emit(n.page()+1)}),v(35,3),r(),e(36,`
      `),r(),e(37,`
    `),r(),e(38,`
  `)),o&2&&(a(6),s(n.totalElements()),a(9),q(n.page()+1)(n.totalPages()),W(15),a(10),C("value",n.pageSize()),a(2),B(J(6,ee)),a(4),C("disabled",n.page()<=0),a(3),C("disabled",n.page()+1>=n.totalPages()))},encapsulation:2,changeDetection:0});let i=t;return i})();var ie=["dialog"],ve=(()=>{let t=class t{constructor(){this.title=c.required(),this.message=c.required(),this.confirmLabel=c($localize`:@@dialog.delete:Delete`),this.confirmed=b()}open(){this.dialog.nativeElement.showModal()}close(){this.dialog.nativeElement.close()}confirm(){this.close(),this.confirmed.emit()}onClose(){}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["app-confirm-dialog"]],viewQuery:function(o,n){if(o&1&&Q(ie,5),o&2){let m;H(m=U())&&(n.dialog=m.first)}},inputs:{title:[1,"title"],message:[1,"message"],confirmLabel:[1,"confirmLabel"]},outputs:{confirmed:"confirmed"},decls:23,vars:3,consts:()=>{let d;return d=$localize`:@@dialog.cancel:Cancel`,[["dialog",""],d,[1,"rounded-2xl","border","border-zinc-200","p-0","shadow-xl","backdrop:bg-zinc-950/50",3,"close"],[1,"w-[calc(100vw-3rem)]","max-w-md","p-6"],[1,"text-lg","font-semibold","tracking-tight"],[1,"mt-2","text-sm","leading-relaxed","text-zinc-600"],[1,"mt-6","flex","justify-end","gap-2"],["type","button","autofocus","",1,"rounded-full","border","border-zinc-300","px-4","py-2","text-sm","font-medium","hover:bg-zinc-100",3,"click"],["type","button",1,"rounded-full","bg-rose-600","px-4","py-2","text-sm","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(o,n){if(o&1){let m=T();e(0,`
    `),l(1,"dialog",2,0),u("close",function(){return M(m),P(n.onClose())}),e(3,`
      `),l(4,"div",3),e(5,`
        `),l(6,"h2",4),e(7),r(),e(8,`
        `),l(9,"p",5),e(10),r(),e(11,`
        `),l(12,"div",6),e(13,`
          `),l(14,"button",7),u("click",function(){return M(m),P(n.close())}),v(15,1),r(),e(16,`
          `),l(17,"button",8),u("click",function(){return M(m),P(n.confirm())}),e(18),r(),e(19,`
        `),r(),e(20,`
      `),r(),e(21,`
    `),r(),e(22,`
  `)}o&2&&(a(7),s(n.title()),a(3),s(n.message()),a(8),s(n.confirmLabel()))},encapsulation:2});let i=t;return i})();function oe(i,t){if(i&1&&(e(0,`
        `),f(1,"p",2),e(2),x(),e(3,`
      `)),i&2){let p=N();a(2),s(p.hint())}}function ae(i,t){if(i&1&&(e(0,`
        `),f(1,"a",3),e(2),x(),e(3,`
      `)),i&2){let p=N();a(),A("routerLink",p.actionLink()),a(),S(`
          `,p.actionLabel(),`
        `)}}var Ie=(()=>{let t=class t{constructor(){this.title=c.required(),this.hint=c(""),this.actionLink=c(""),this.actionLabel=c("")}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["app-empty-state"]],inputs:{title:[1,"title"],hint:[1,"hint"],actionLink:[1,"actionLink"],actionLabel:[1,"actionLabel"]},decls:9,vars:3,consts:[[1,"rounded-2xl","border","border-dashed","border-zinc-300","bg-white","px-6","py-12","text-center"],[1,"text-lg","font-medium"],[1,"mx-auto","mt-1","max-w-md","text-sm","text-zinc-500"],[1,"mt-4","inline-block","rounded-full","bg-violet-600","px-5","py-2","text-sm","font-medium","text-white","hover:bg-violet-500",3,"routerLink"]],template:function(o,n){o&1&&(e(0,`
    `),f(1,"div",0),e(2,`
      `),f(3,"p",1),e(4),x(),e(5,`
      `),E(6,oe,4,1),E(7,ae,4,2),x(),e(8,`
  `)),o&2&&(a(4),s(n.title()),a(2),h(n.hint()?6:-1),a(),h(n.actionLink()&&n.actionLabel()?7:-1))},dependencies:[O],encapsulation:2,changeDetection:0});let i=t;return i})();function le(i,t){if(i&1){let p=T();e(0,`
        `),l(1,"button",4),u("click",function(){M(p);let o=N();return P(o.clear())}),e(2,"\xD7"),r(),e(3,`
      `)}}var we=(()=>{let t=class t{constructor(){this.placeholder=c($localize`:@@search.placeholder:Search…`),this.search=b(),this.value="",this.keystrokes=new L,this.keystrokes.pipe(D(300),k(),K(w($))).subscribe(d=>this.search.emit(d))}onInput(d){this.value=d,this.keystrokes.next(d)}clear(){this.onInput("")}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["app-search-input"]],inputs:{placeholder:[1,"placeholder"]},outputs:{search:"search"},decls:12,vars:4,consts:[[1,"relative"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor","aria-hidden","true",1,"pointer-events-none","absolute","left-3","top-1/2","h-4","w-4","-translate-y-1/2","text-zinc-400"],["fill-rule","evenodd","d","M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z","clip-rule","evenodd"],["type","search",1,"w-full","rounded-full","border-zinc-300","bg-white","py-2","pl-9","pr-8","text-sm","shadow-sm",3,"input","value","placeholder"],["type","button","aria-label","Clear search",1,"absolute","right-2","top-1/2","-translate-y-1/2","rounded-full","px-1.5","text-zinc-400","hover:bg-zinc-100","hover:text-zinc-700",3,"click"]],template:function(o,n){o&1&&(e(0,`
    `),l(1,"div",0),e(2,`
      `),z(),l(3,"svg",1),e(4,`
        `),V(5,"path",2),e(6,`
      `),r(),e(7,`
      `),F(),l(8,"input",3),u("input",function(g){return n.onInput(g.target.value)}),r(),e(9,`
      `),E(10,le,4,0),r(),e(11,`
  `)),o&2&&(a(8),C("value",n.value)("placeholder",n.placeholder()),I("aria-label",n.placeholder()),a(2),h(n.value?10:-1))},encapsulation:2,changeDetection:0});let i=t;return i})();export{pe as a,fe as b,ve as c,Ie as d,we as e};
