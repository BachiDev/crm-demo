import{a as j}from"./chunk-JUII5Q5X.js";import{a as K,b as U,c as u,d as Z,e as tt}from"./chunk-6IPJY4NK.js";import"./chunk-CYGIYZWD.js";import{a as J}from"./chunk-QHIQW3ZY.js";import"./chunk-WXSKCASI.js";import"./chunk-VAL26HVG.js";import{Aa as D,B as S,C as p,Da as t,Ea as C,Ka as k,P as T,U as b,Wa as H,ca as w,da as z,fa as B,fb as q,ga as G,ha as I,ia as i,ja as n,jb as F,ka as E,kb as Q,oa as P,qa as c,ta as R,va as d,ya as W,z as g,za as X}from"./chunk-ZAB2ACMA.js";var et=a=>["/activityRelations/edit",a],it=(a,s)=>s.id;function nt(a,s){a&1&&(t(0,`
`),i(1,"div",13),t(2,`
    `),i(3,"div",14),t(4,`
        `),E(5,"div",15),t(6,`
        `),E(7,"div",15),t(8,`
        `),E(9,"div",15),t(10,`
    `),n(),t(11,`
`),n(),t(12,`
`))}function _t(a,s){if(a&1&&(t(0,`
`),E(1,"app-empty-state",16),t(2,`
`)),a&2){let _=d();T(),I("title",_.q?"No relations match your search":"No activity relations found")}}function ot(a,s){if(a&1){let _=P();t(0,`
            `),i(1,"tr",23),t(2,`
                `),i(3,"td",24),t(4),n(),t(5,`
                `),i(6,"td",25),t(7),n(),t(8,`
                `),i(9,"td",25),t(10),n(),t(11,`
                `),i(12,"td",25),t(13),n(),t(14,`
                `),i(15,"td",25),t(16),n(),t(17,`
                `),i(18,"td",26),t(19,`
                    `),i(20,"div",27),t(21,`
                        `),i(22,"a",28),c(23,7),n(),t(24,`
                        `),i(25,"button",29),R("click",function(){let o=S(_).$implicit,l=d(2);return p(l.requestDelete(o.id))}),c(26,8),n(),t(27,`
                    `),n(),t(28,`
                `),n(),t(29,`
            `),n(),t(30,`
            `)}if(a&2){let _=s.$implicit,e=d(2);T(4),C(_.id),T(2),I("title",_.activity),T(),C(e.shortId(_.activity)),T(2),I("title",_.account),T(),C(e.shortId(_.account)),T(2),I("title",_.contact),T(),C(e.shortId(_.contact)),T(2),I("title",_.opportunity),T(),C(e.shortId(_.opportunity)),T(6),I("routerLink",k(10,et,_.id))}}function at(a,s){if(a&1){let _=P();t(0,`
`),i(1,"div",17),t(2,`
    `),i(3,"table",18),t(4,`
        `),i(5,"caption",19),c(6,0),n(),t(7,`
        `),i(8,"thead"),t(9,`
            `),i(10,"tr",20),t(11,`
                `),i(12,"th",21),c(13,1),n(),t(14,`
                `),i(15,"th",21),c(16,2),n(),t(17,`
                `),i(18,"th",21),c(19,3),n(),t(20,`
                `),i(21,"th",21),c(22,4),n(),t(23,`
                `),i(24,"th",21),c(25,5),n(),t(26,`
                `),i(27,"th")(28,"span",19),c(29,6),n()(),t(30,`
            `),n(),t(31,`
        `),n(),t(32,`
        `),i(33,"tbody"),t(34,`
            `),B(35,ot,31,12,null,null,it),n(),t(37,`
    `),n(),t(38,`
`),n(),t(39,`
`),i(40,"app-pagination",22),R("pageChange",function(o){S(_);let l=d();return p(l.onPage(o))})("pageSizeChange",function(o){S(_);let l=d();return p(l.onPageSize(o))}),t(41,"relations"),n(),t(42,`
`)}if(a&2){let _=d();T(35),G(_.activityRelations),T(5),I("page",_.page)("totalPages",_.totalPages)("totalElements",_.totalElements??0)("pageSize",_.pageSize)}}var St=(()=>{let s=class s{constructor(){this.activityRelationService=g(j),this.errorHandler=g(J),this.router=g(F),this.activityRelations=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(e,o){return{deleted:$localize`:@@activityRelation.delete.success:Activity Relation was removed successfully.`}[e]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(e=>{e instanceof q&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.activityRelationService.getActivityRelationsPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:e=>{this.activityRelations=e.content,this.totalPages=e.totalPages,this.totalElements=e.totalElements,this.loading=!1},error:e=>{this.loading=!1,this.errorHandler.handleServerError(e.error)}})}onSearch(e){this.q=e,this.page=0,this.loadData()}onPage(e){e<0||e>=this.totalPages||(this.page=e,this.loadData())}onPageSize(e){this.pageSize=e,this.page=0,this.loadData()}shortId(e){return e?e.substring(0,8)+"\u2026":"\u2013"}requestDelete(e){this.pendingDelete=e,this.confirmDialog.open()}deleteConfirmed(){let e=this.pendingDelete;e!==void 0&&(this.pendingDelete=void 0,this.activityRelationService.deleteActivityRelation(e).subscribe({next:()=>this.router.navigate(["/activityRelations"],{state:{msgInfo:this.getMessage("deleted")}}),error:o=>this.errorHandler.handleServerError(o.error)}))}};s.\u0275fac=function(o){return new(o||s)},s.\u0275cmp=b({type:s,selectors:[["app-activity-relation-list"]],viewQuery:function(o,l){if(o&1&&W(u,5),o&2){let A;X(A=D())&&(l.confirmDialog=A.first)}},decls:12,vars:2,consts:()=>{let e;e=$localize`:@@activityRelation.list.headline:Activity Relations`;let o;o=$localize`:@@activityRelation.list.count:relations total`;let l;l=$localize`:@@activityRelation.list.createNew:Create new Activity Relation`;let A;A=$localize`:@@activityRelation.search:Search linked account, contact…`;let N;N=$localize`:@@delete.title:Delete this record?`;let m;m=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let M;M=$localize`:@@activityRelation.list.emptyHint:Link the first activity to get started.`;let L;L=$localize`:@@activityRelation.list.createNew:Create new Activity Relation`;let y;y=$localize`:@@activityRelation.list.caption:Links between activities and CRM records`;let O;O=$localize`:@@activityRelation.id.label:Id`;let v;v=$localize`:@@activityRelation.activity.label:Activity`;let f;f=$localize`:@@activityRelation.account.label:Account`;let h;h=$localize`:@@activityRelation.contact.label:Contact`;let x;x=$localize`:@@activityRelation.opportunity.label:Opportunity`;let $;$=$localize`:@@list.actions:Actions`;let V;V=$localize`:@@activityRelation.list.edit:Edit`;let Y;return Y=$localize`:@@activityRelation.list.delete:Delete`,[y,O,v,f,h,x,$,V,Y,["title",e,"countLabel",o,"createLink","/activityRelations/add","createLabel",l,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",A,1,"w-full","max-w-xs",3,"search"],["title",N,"message",m,3,"confirmed"],["aria-busy","true","aria-label","Loading activity relations",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",M,"actionLink","/activityRelations/add","actionLabel",L,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-mono"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"p-3"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(o,l){o&1&&(E(0,"app-page-header",9),t(1,`

`),i(2,"div",10),t(3,`
    `),i(4,"app-search-input",11),R("search",function(N){return l.onSearch(N)}),n(),t(5,`
`),n(),t(6,`

`),w(7,nt,13,0)(8,_t,3,1)(9,at,43,4),i(10,"app-confirm-dialog",12),R("confirmed",function(){return l.deleteConfirmed()}),n(),t(11,`
`)),o&2&&(I("count",l.totalElements),T(7),z(l.loading?7:l.activityRelations.length===0?8:9))},dependencies:[H,Q,K,U,u,Z,tt],encapsulation:2});let a=s;return a})();export{St as ActivityRelationListComponent};
