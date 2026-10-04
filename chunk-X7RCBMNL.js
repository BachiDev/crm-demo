import{a as G}from"./chunk-NAAVXZBQ.js";import{a as W}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A as f,Ca as e,Da as a,Ja as h,N as d,S as O,Va as y,ba as A,ca as x,ea as C,eb as v,fa as p,ga as $,ha as t,ia as n,ib as w,ja as b,jb as B,na as L,pa as r,sa as R,ua as c,x as E,z as I}from"./chunk-JRLO7FLJ.js";var X=o=>["/memos/edit",o],k=(o,_)=>_.memoId;function z(o,_){o&1&&(e(0,`
`),t(1,"div"),r(2,2),n(),e(3,`
`))}function D(o,_){if(o&1){let m=L();e(0,`
            `),t(1,"tr",16),e(2,`
                `),t(3,"td",17),e(4),n(),e(5,`
                `),t(6,"td",17),e(7),n(),e(8,`
                `),t(9,"td",17),e(10),n(),e(11,`
                `),t(12,"td",17),e(13),n(),e(14,`
                `),t(15,"td",17),e(16,`
                    `),t(17,"div",18),e(18,`
                        `),t(19,"a",19),r(20,7),n(),e(21,`
                        `),t(22,"button",20),R("click",function(){let l=I(m).$implicit,s=c(2);return f(s.confirmDelete(l.memoId))}),r(23,8),n(),e(24,`
                    `),n(),e(25,`
                `),n(),e(26,`
            `),n(),e(27,`
            `)}if(o&2){let m=_.$implicit;d(4),a(m.memoId),d(3),a(m.relatedToType),d(3),a(m.relatedToId),d(3),a(m.user),d(6),$("routerLink",h(5,X,m.memoId))}}function F(o,_){if(o&1&&(e(0,`
`),t(1,"div",12),e(2,`
    `),t(3,"table",13),e(4,`
        `),t(5,"thead"),e(6,`
            `),t(7,"tr"),e(8,`
                `),t(9,"th",14),r(10,3),n(),e(11,`
                `),t(12,"th",14),r(13,4),n(),e(14,`
                `),t(15,"th",14),r(16,5),n(),e(17,`
                `),t(18,"th",14),r(19,6),n(),e(20,`
                `),b(21,"th"),e(22,`
            `),n(),e(23,`
        `),n(),e(24,`
        `),t(25,"tbody",15),e(26,`
            `),C(27,D,28,7,null,null,k),n(),e(29,`
    `),n(),e(30,`
`),n(),e(31,`
`)),o&2){let m=c();d(27),p(m.memoes)}}var Q=(()=>{let _=class _{constructor(){this.memoService=E(G),this.errorHandler=E(W),this.router=E(w)}getMessage(i,l){return{confirm:$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,deleted:$localize`:@@memo.delete.success:Memo was removed successfully.`}[i]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(i=>{i instanceof v&&this.loadData()})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.memoService.getAllMemoes().subscribe({next:i=>this.memoes=i,error:i=>this.errorHandler.handleServerError(i.error)})}confirmDelete(i){confirm(this.getMessage("confirm"))&&this.memoService.deleteMemo(i).subscribe({next:()=>this.router.navigate(["/memos"],{state:{msgInfo:this.getMessage("deleted")}}),error:l=>this.errorHandler.handleServerError(l.error)})}};_.\u0275fac=function(l){return new(l||_)},_.\u0275cmp=O({type:_,selectors:[["app-memo-list"]],decls:14,vars:1,consts:()=>{let i;i=$localize`:@@memo.list.headline:Memoes`;let l;l=$localize`:@@memo.list.createNew:Create new Memo`;let s;s=$localize`:@@memo.list.empty:No Memoes could be found.`;let S;S=$localize`:@@memo.memoId.label:Memo Id`;let T;T=$localize`:@@memo.relatedToType.label:Related To Type`;let g;g=$localize`:@@memo.relatedToId.label:Related To Id`;let u;u=$localize`:@@memo.user.label:User`;let P;P=$localize`:@@memo.list.edit:Edit`;let N;return N=$localize`:@@memo.list.delete:Delete`,[i,l,s,S,T,g,u,P,N,[1,"flex","flex-wrap","mb-6"],[1,"grow","text-3xl","md:text-4xl","font-medium","mb-2"],["routerLink","/memos/add",1,"inline-block","text-white","bg-blue-600","hover:bg-blue-700","focus:ring-blue-300","focus:ring-4","rounded","px-5","py-2"],[1,"overflow-x-auto"],[1,"w-full"],["scope","col",1,"text-left","p-2"],[1,"border-t-2","border-black"],[1,"odd:bg-gray-100"],[1,"p-2"],[1,"float-right","whitespace-nowrap"],[1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm",3,"routerLink"],["type","button",1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm","cursor-pointer",3,"click"]]},template:function(l,s){l&1&&(t(0,"div",9),e(1,`
    `),t(2,"h1",10),r(3,0),n(),e(4,`
    `),t(5,"div"),e(6,`
        `),t(7,"a",11),r(8,1),n(),e(9,`
    `),n(),e(10,`
`),n(),e(11,`
`),A(12,z,4,0)(13,F,32,0)),l&2&&(d(12),x(!s.memoes||s.memoes.length===0?12:13))},dependencies:[y,B],encapsulation:2});let o=_;return o})();export{Q as MemoListComponent};
