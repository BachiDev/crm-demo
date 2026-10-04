import{a as ee}from"./chunk-Q4JRA2ON.js";import{a as j}from"./chunk-LEL7KSWT.js";import{a as K,b as U,c as A,d as Y,e as Z}from"./chunk-P6EUP75Z.js";import"./chunk-3UDFUMK6.js";import{a as J}from"./chunk-IE2CQ4IW.js";import"./chunk-X534G2PA.js";import"./chunk-VAL26HVG.js";import{Aa as D,B as T,Ba as k,C as u,Ea as e,Fa as C,La as V,P as s,U as w,Ya as H,da as z,ea as W,ga as B,ha as G,hb as q,ia as M,ja as n,ka as i,la as c,lb as F,mb as Q,pa as N,ra as d,ua as p,wa as g,z as P,za as X}from"./chunk-OJ74WIM5.js";var te=l=>["/memos/edit",l],ne=(l,m)=>m.memoId;function ie(l,m){l&1&&(e(0,`
`),n(1,"div",12),e(2,`
    `),n(3,"div",13),e(4,`
        `),c(5,"div",14),e(6,`
        `),c(7,"div",14),e(8,`
        `),c(9,"div",14),e(10,`
    `),i(),e(11,`
`),i(),e(12,`
`))}function oe(l,m){if(l&1&&(e(0,`
`),c(1,"app-empty-state",15),e(2,`
`)),l&2){let o=g();s(),M("title",o.q?"No memos match your search":"No memos found")}}function _e(l,m){if(l&1){let o=N();e(0,`
            `),n(1,"tr",22),e(2,`
                `),n(3,"td",23),c(4,"app-status-pill",24),i(),e(5,`
                `),n(6,"td",25),e(7),i(),e(8,`
                `),n(9,"td",26),e(10),i(),e(11,`
                `),n(12,"td",25),e(13),i(),e(14,`
                `),n(15,"td",23),e(16,`
                    `),n(17,"div",27),e(18,`
                        `),n(19,"a",28),d(20,6),i(),e(21,`
                        `),n(22,"button",29),p("click",function(){let _=T(o).$implicit,r=g(2);return u(r.requestDelete(_.memoId))}),d(23,7),i(),e(24,`
                    `),i(),e(25,`
                `),i(),e(26,`
            `),i(),e(27,`
            `)}if(l&2){let o=m.$implicit,t=g(2);s(4),M("value",o.relatedToType||"\u2013"),s(2),M("title",o.relatedToId),s(),C(t.shortId(o.relatedToId)),s(2),M("title",o.memoText),s(),C(o.memoText),s(2),M("title",o.memoId),s(),C(t.shortId(o.memoId)),s(6),M("routerLink",V(8,te,o.memoId))}}function le(l,m){if(l&1){let o=N();e(0,`
`),n(1,"div",16),e(2,`
    `),n(3,"table",17),e(4,`
        `),n(5,"caption",18),d(6,0),i(),e(7,`
        `),n(8,"thead"),e(9,`
            `),n(10,"tr",19),e(11,`
                `),n(12,"th",20),d(13,1),i(),e(14,`
                `),n(15,"th",20),d(16,2),i(),e(17,`
                `),n(18,"th",20),d(19,3),i(),e(20,`
                `),n(21,"th",20),d(22,4),i(),e(23,`
                `),n(24,"th")(25,"span",18),d(26,5),i()(),e(27,`
            `),i(),e(28,`
        `),i(),e(29,`
        `),n(30,"tbody"),e(31,`
            `),B(32,_e,28,10,null,null,ne),i(),e(34,`
    `),i(),e(35,`
`),i(),e(36,`
`),n(37,"app-pagination",21),p("pageChange",function(_){T(o);let r=g();return u(r.onPage(_))})("pageSizeChange",function(_){T(o);let r=g();return u(r.onPageSize(_))}),e(38,"memos"),i(),e(39,`
`)}if(l&2){let o=g();s(32),G(o.memoes),s(5),M("page",o.page)("totalPages",o.totalPages)("totalElements",o.totalElements??0)("pageSize",o.pageSize)}}var Ce=(()=>{let m=class m{constructor(){this.memoService=P(j),this.errorHandler=P(J),this.router=P(F),this.memoes=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(t,_){return{deleted:$localize`:@@memo.delete.success:Memo was removed successfully.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof q&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.memoService.getMemoesPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:t=>{this.memoes=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onSearch(t){this.q=t,this.page=0,this.loadData()}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.memoService.deleteMemo(t).subscribe({next:()=>this.router.navigate(["/memos"],{state:{msgInfo:this.getMessage("deleted")}}),error:_=>this.errorHandler.handleServerError(_.error)}))}};m.\u0275fac=function(_){return new(_||m)},m.\u0275cmp=w({type:m,selectors:[["app-memo-list"]],viewQuery:function(_,r){if(_&1&&X(A,5),_&2){let E;D(E=k())&&(r.confirmDialog=E.first)}},decls:12,vars:2,consts:()=>{let t;t=$localize`:@@memo.list.headline:Memos`;let _;_=$localize`:@@memo.list.count:memos total`;let r;r=$localize`:@@memo.list.createNew:Create new Memo`;let E;E=$localize`:@@memo.search:Search text or type…`;let S;S=$localize`:@@delete.title:Delete this record?`;let O;O=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let f;f=$localize`:@@memo.list.emptyHint:Write the first memo to get started.`;let I;I=$localize`:@@memo.list.createNew:Create new Memo`;let h;h=$localize`:@@memo.list.caption:Memos attached to accounts and contacts`;let x;x=$localize`:@@memo.relatedToType.label:Related To Type`;let $;$=$localize`:@@memo.relatedToId.label:Related To`;let L;L=$localize`:@@memo.memoText.label:Memo`;let R;R=$localize`:@@memo.memoId.label:Id`;let y;y=$localize`:@@list.actions:Actions`;let b;b=$localize`:@@memo.list.edit:Edit`;let v;return v=$localize`:@@memo.list.delete:Delete`,[h,x,$,L,R,y,b,v,["title",t,"countLabel",_,"createLink","/memos/add","createLabel",r,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",E,1,"w-full","max-w-xs",3,"search"],["title",S,"message",O,3,"confirmed"],["aria-busy","true","aria-label","Loading memos",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",f,"actionLink","/memos/add","actionLabel",I,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3"],["tone","violet",3,"value"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"p-3","max-w-md","truncate","text-zinc-600",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(_,r){_&1&&(c(0,"app-page-header",8),e(1,`

`),n(2,"div",9),e(3,`
    `),n(4,"app-search-input",10),p("search",function(S){return r.onSearch(S)}),i(),e(5,`
`),i(),e(6,`

`),z(7,ie,13,0)(8,oe,3,1)(9,le,40,4),n(10,"app-confirm-dialog",11),p("confirmed",function(){return r.deleteConfirmed()}),i(),e(11,`
`)),_&2&&(M("count",r.totalElements),s(7),W(r.loading?7:r.memoes.length===0?8:9))},dependencies:[H,Q,K,U,A,Y,Z,ee],encapsulation:2});let l=m;return l})();export{Ce as MemoListComponent};
