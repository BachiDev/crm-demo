import{A as I,Ca as e,Da as p,Ea as b,Ia as q,N as o,Pa as v,Qa as d,S as f,aa as T,ba as N,ca as C,da as L,ea as y,fa as D,ga as h,ha as g,ia as u,jb as S,ka as l,la as r,na as k,oa as P,pa as E,qa as F,ra as z,ta as x,ua as M,va as $,wa as w,xa as G,ya as R,z as A,za as B}from"./chunk-JRLO7FLJ.js";function W(i,n){if(i&1&&(e(0,`
        `),g(1,"span",3),e(2),u(),e(3,`
      `)),i&2){let s=M();o(),T("aria-label",s.countLabel()),o(),b(`
          `,s.count(),`
        `)}}var te=(()=>{let n=class n{constructor(){this.title=d.required(),this.count=d(null),this.countLabel=d(""),this.createLink=d.required(),this.createLabel=d.required()}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=f({type:n,selectors:[["app-page-header"]],inputs:{title:[1,"title"],count:[1,"count"],countLabel:[1,"countLabel"],createLink:[1,"createLink"],createLabel:[1,"createLabel"]},decls:11,vars:4,consts:[[1,"mb-6","flex","flex-wrap","items-center","gap-3"],[1,"grow","text-3xl","font-semibold","tracking-tight","md:text-4xl"],[1,"inline-block","rounded-full","bg-violet-600","px-5","py-2","font-medium","text-white","hover:bg-violet-500",3,"routerLink"],[1,"rounded-full","bg-zinc-100","px-3","py-1","font-mono","text-sm","text-zinc-600"]],template:function(a,t){a&1&&(e(0,`
    `),g(1,"div",0),e(2,`
      `),g(3,"h1",1),e(4),u(),e(5,`
      `),N(6,W,4,2),g(7,"a",2),e(8),u(),e(9,`
    `),u(),e(10,`
  `)),a&2&&(o(4),p(t.title()),o(2),C(t.count()!==null?6:-1),o(),h("routerLink",t.createLink()),o(),b(`
        `,t.createLabel(),`
      `))},dependencies:[S],encapsulation:2,changeDetection:0});let i=n;return i})();var X=["*"],V=()=>[10,25,50];function j(i,n){i&1&&e(0,"records")}function Q(i,n){if(i&1&&(e(0,`
              `),l(1,"option",13),e(2),r(),e(3,`
            `)),i&2){let s=n.$implicit;o(),P("value",s),o(),p(s)}}var le=(()=>{let n=class n{constructor(){this.page=d.required(),this.totalPages=d.required(),this.totalElements=d.required(),this.pageSize=d.required(),this.pageChange=v(),this.pageSizeChange=v()}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=f({type:n,selectors:[["app-pagination"]],inputs:{page:[1,"page"],totalPages:[1,"totalPages"],totalElements:[1,"totalElements"],pageSize:[1,"pageSize"]},outputs:{pageChange:"pageChange",pageSizeChange:"pageSizeChange"},ngContentSelectors:X,decls:39,vars:7,consts:()=>{let m;m=$localize`:@@pagination.page:Page ${"\uFFFD0\uFFFD"}:INTERPOLATION: of ${"\uFFFD1\uFFFD"}:INTERPOLATION_1:`;let a;a=$localize`:@@pagination.perPage:Per page`;let t;t=$localize`:@@pagination.prev:← Prev`;let c;return c=$localize`:@@pagination.next:Next →`,[m,a,t,c,[1,"mt-4","flex","flex-wrap","items-center","justify-between","gap-3","text-sm","text-zinc-600"],["role","status"],[1,"font-mono","font-medium","text-zinc-900"],[1,"text-zinc-400"],[1,"flex","items-center","gap-2"],[1,"flex","items-center","gap-1.5"],[1,"text-zinc-500"],["aria-label","Rows per page",1,"rounded-lg","border-zinc-300","py-1","text-sm",3,"change","value"],["type","button",1,"rounded-lg","border","border-zinc-300","px-3","py-1","hover:bg-zinc-100","disabled:cursor-not-allowed","disabled:opacity-40",3,"click","disabled"],[3,"value"]]},template:function(a,t){a&1&&($(),e(0,`
    `),l(1,"div",4),e(2,`
      `),l(3,"p",5),e(4,`
        `),l(5,"span",6),e(6),r(),e(7,`
        `),w(8,0,null,j,1,0),e(10,`
        `),l(11,"span",7),e(12,"\xB7"),r(),e(13,`
        `),l(14,"span"),E(15,0),r(),e(16,`
      `),r(),e(17,`
      `),l(18,"div",8),e(19,`
        `),l(20,"label",9),e(21,`
          `),l(22,"span",10),E(23,1),r(),e(24,`
          `),l(25,"select",11),x("change",function(_){return t.pageSizeChange.emit(+_.target.value)}),e(26,`
            `),y(27,Q,4,2,null,null,L),r(),e(29,`
        `),r(),e(30,`
        `),l(31,"button",12),x("click",function(){return t.pageChange.emit(t.page()-1)}),E(32,2),r(),e(33,`
        `),l(34,"button",12),x("click",function(){return t.pageChange.emit(t.page()+1)}),E(35,3),r(),e(36,`
      `),r(),e(37,`
    `),r(),e(38,`
  `)),a&2&&(o(6),p(t.totalElements()),o(9),F(t.page()+1)(t.totalPages()),z(15),o(10),P("value",t.pageSize()),o(2),D(q(6,V)),o(4),P("disabled",t.page()<=0),o(3),P("disabled",t.page()+1>=t.totalPages()))},encapsulation:2,changeDetection:0});let i=n;return i})();var H=["dialog"],pe=(()=>{let n=class n{constructor(){this.title=d.required(),this.message=d.required(),this.confirmLabel=d($localize`:@@dialog.delete:Delete`),this.confirmed=v()}open(){this.dialog.nativeElement.showModal()}close(){this.dialog.nativeElement.close()}confirm(){this.close(),this.confirmed.emit()}onClose(){}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=f({type:n,selectors:[["app-confirm-dialog"]],viewQuery:function(a,t){if(a&1&&G(H,5),a&2){let c;R(c=B())&&(t.dialog=c.first)}},inputs:{title:[1,"title"],message:[1,"message"],confirmLabel:[1,"confirmLabel"]},outputs:{confirmed:"confirmed"},decls:23,vars:3,consts:()=>{let m;return m=$localize`:@@dialog.cancel:Cancel`,[["dialog",""],m,[1,"rounded-2xl","border","border-zinc-200","p-0","shadow-xl","backdrop:bg-zinc-950/50",3,"close"],[1,"w-[calc(100vw-3rem)]","max-w-md","p-6"],[1,"text-lg","font-semibold","tracking-tight"],[1,"mt-2","text-sm","leading-relaxed","text-zinc-600"],[1,"mt-6","flex","justify-end","gap-2"],["type","button","autofocus","",1,"rounded-full","border","border-zinc-300","px-4","py-2","text-sm","font-medium","hover:bg-zinc-100",3,"click"],["type","button",1,"rounded-full","bg-rose-600","px-4","py-2","text-sm","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(a,t){if(a&1){let c=k();e(0,`
    `),l(1,"dialog",2,0),x("close",function(){return A(c),I(t.onClose())}),e(3,`
      `),l(4,"div",3),e(5,`
        `),l(6,"h2",4),e(7),r(),e(8,`
        `),l(9,"p",5),e(10),r(),e(11,`
        `),l(12,"div",6),e(13,`
          `),l(14,"button",7),x("click",function(){return A(c),I(t.close())}),E(15,1),r(),e(16,`
          `),l(17,"button",8),x("click",function(){return A(c),I(t.confirm())}),e(18),r(),e(19,`
        `),r(),e(20,`
      `),r(),e(21,`
    `),r(),e(22,`
  `)}a&2&&(o(7),p(t.title()),o(3),p(t.message()),o(8),p(t.confirmLabel()))},encapsulation:2});let i=n;return i})();function J(i,n){if(i&1&&(e(0,`
        `),g(1,"p",2),e(2),u(),e(3,`
      `)),i&2){let s=M();o(2),p(s.hint())}}function K(i,n){if(i&1&&(e(0,`
        `),g(1,"a",3),e(2),u(),e(3,`
      `)),i&2){let s=M();o(),h("routerLink",s.actionLink()),o(),b(`
          `,s.actionLabel(),`
        `)}}var xe=(()=>{let n=class n{constructor(){this.title=d.required(),this.hint=d(""),this.actionLink=d(""),this.actionLabel=d("")}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=f({type:n,selectors:[["app-empty-state"]],inputs:{title:[1,"title"],hint:[1,"hint"],actionLink:[1,"actionLink"],actionLabel:[1,"actionLabel"]},decls:9,vars:3,consts:[[1,"rounded-2xl","border","border-dashed","border-zinc-300","bg-white","px-6","py-12","text-center"],[1,"text-lg","font-medium"],[1,"mx-auto","mt-1","max-w-md","text-sm","text-zinc-500"],[1,"mt-4","inline-block","rounded-full","bg-violet-600","px-5","py-2","text-sm","font-medium","text-white","hover:bg-violet-500",3,"routerLink"]],template:function(a,t){a&1&&(e(0,`
    `),g(1,"div",0),e(2,`
      `),g(3,"p",1),e(4),u(),e(5,`
      `),N(6,J,4,1),N(7,K,4,2),u(),e(8,`
  `)),a&2&&(o(4),p(t.title()),o(2),C(t.hint()?6:-1),o(),C(t.actionLink()&&t.actionLabel()?7:-1))},dependencies:[S],encapsulation:2,changeDetection:0});let i=n;return i})();export{te as a,le as b,pe as c,xe as d};
