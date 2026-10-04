import{a as oe}from"./chunk-Q4JRA2ON.js";import{a as K}from"./chunk-BEKISOOI.js";import{a as ee,b as te,c as C,d as ne,e as ie}from"./chunk-P6EUP75Z.js";import"./chunk-3UDFUMK6.js";import{a as Z}from"./chunk-IE2CQ4IW.js";import"./chunk-X534G2PA.js";import"./chunk-VAL26HVG.js";import{Aa as X,B as m,Ba as D,C as I,Ea as e,Fa as N,La as k,Ma as V,Na as q,P as s,U as v,Xa as H,Ya as F,da as w,ea as z,ga as B,ha as G,hb as Q,ia as T,ja as n,ka as i,la as d,lb as j,mb as J,pa as E,ra as P,ua as c,wa as O,z as S,za as W}from"./chunk-OJ74WIM5.js";var _e=l=>["/opportunities/edit",l],re=(l,a)=>a.opportunityId;function le(l,a){l&1&&(e(0,`
`),n(1,"div",13),e(2,`
    `),n(3,"div",14),e(4,`
        `),d(5,"div",15),e(6,`
        `),d(7,"div",15),e(8,`
        `),d(9,"div",15),e(10,`
    `),i(),e(11,`
`),i(),e(12,`
`))}function pe(l,a){if(l&1&&(e(0,`
`),d(1,"app-empty-state",16),e(2,`
`)),l&2){let _=O();s(),T("title",_.q?"No opportunities match your search":"No opportunities found")}}function ae(l,a){if(l&1){let _=E();e(0,`
            `),n(1,"tr",23),e(2,`
                `),n(3,"td",24),e(4),i(),e(5,`
                `),n(6,"td",25),e(7),V(8,"currency"),i(),e(9,`
                `),n(10,"td",26),d(11,"app-status-pill",27),i(),e(12,`
                `),n(13,"td",28),e(14),i(),e(15,`
                `),n(16,"td",29),e(17),i(),e(18,`
                `),n(19,"td",26),e(20,`
                    `),n(21,"div",30),e(22,`
                        `),n(23,"a",31),P(24,7),i(),e(25,`
                        `),n(26,"button",32),c("click",function(){let o=m(_).$implicit,r=O(2);return I(r.requestDelete(o.opportunityId))}),P(27,8),i(),e(28,`
                    `),i(),e(29,`
                `),i(),e(30,`
            `),i(),e(31,`
            `)}if(l&2){let _=a.$implicit,t=O(2);s(4),N(_.opportunityName),s(3),N(q(8,8,_.amount)),s(4),T("value",_.stage||"\u2013")("tone",t.stageTone(_.stage)),s(3),N(_.closeDate),s(2),T("title",_.opportunityId),s(),N(t.shortId(_.opportunityId)),s(6),T("routerLink",k(10,_e,_.opportunityId))}}function se(l,a){if(l&1){let _=E();e(0,`
`),n(1,"div",17),e(2,`
    `),n(3,"table",18),e(4,`
        `),n(5,"caption",19),P(6,0),i(),e(7,`
        `),n(8,"thead"),e(9,`
            `),n(10,"tr",20),e(11,`
                `),n(12,"th",21),P(13,1),i(),e(14,`
                `),n(15,"th",21),P(16,2),i(),e(17,`
                `),n(18,"th",21),P(19,3),i(),e(20,`
                `),n(21,"th",21),P(22,4),i(),e(23,`
                `),n(24,"th",21),P(25,5),i(),e(26,`
                `),n(27,"th")(28,"span",19),P(29,6),i()(),e(30,`
            `),i(),e(31,`
        `),i(),e(32,`
        `),n(33,"tbody"),e(34,`
            `),B(35,ae,32,12,null,null,re),i(),e(37,`
    `),i(),e(38,`
`),i(),e(39,`
`),n(40,"app-pagination",22),c("pageChange",function(o){m(_);let r=O();return I(r.onPage(o))})("pageSizeChange",function(o){m(_);let r=O();return I(r.onPageSize(o))}),e(41,"opportunities"),i(),e(42,`
`)}if(l&2){let _=O();s(35),G(_.opportunities),s(5),T("page",_.page)("totalPages",_.totalPages)("totalElements",_.totalElements??0)("pageSize",_.pageSize)}}var Re=(()=>{let a=class a{constructor(){this.opportunityService=S(K),this.errorHandler=S(Z),this.router=S(j),this.opportunities=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(t,o){return{deleted:$localize`:@@opportunity.delete.success:Opportunity was removed successfully.`,"opportunity.activityRelation.opportunity.referenced":$localize`:@@opportunity.activityRelation.opportunity.referenced:This entity is still referenced by Activity Relation ${o?.id} via field Opportunity.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof Q&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.opportunityService.getOpportunitiesPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:t=>{this.opportunities=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onSearch(t){this.q=t,this.page=0,this.loadData()}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}stageTone(t){switch((t||"").toLowerCase()){case"prospecting":return"sky";case"qualification":return"violet";case"negotiation":return"amber";case"won":case"closed_won":case"closed won":return"emerald";case"lost":case"closed_lost":return"rose";default:return"zinc"}}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.opportunityService.deleteOpportunity(t).subscribe({next:()=>this.router.navigate(["/opportunities"],{state:{msgInfo:this.getMessage("deleted")}}),error:o=>{if(o.error?.code==="REFERENCED"){let r=o.error.message.split(",");this.router.navigate(["/opportunities"],{state:{msgError:this.getMessage(r[0],{id:r[1]})??o.error.message}});return}this.errorHandler.handleServerError(o.error)}}))}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=v({type:a,selectors:[["app-opportunity-list"]],viewQuery:function(o,r){if(o&1&&W(C,5),o&2){let u;X(u=D())&&(r.confirmDialog=u.first)}},decls:12,vars:2,consts:()=>{let t;t=$localize`:@@opportunity.list.headline:Opportunities`;let o;o=$localize`:@@opportunity.list.count:opportunities total`;let r;r=$localize`:@@opportunity.list.createNew:Create new Opportunity`;let u;u=$localize`:@@opportunity.search:Search name or stage…`;let g;g=$localize`:@@delete.title:Delete this record?`;let M;M=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let y;y=$localize`:@@opportunity.list.emptyHint:Create the first opportunity to fill the pipeline.`;let R;R=$localize`:@@opportunity.list.createNew:Create new Opportunity`;let A;A=$localize`:@@opportunity.list.caption:Opportunities with amount and pipeline stage`;let f;f=$localize`:@@opportunity.opportunityName.label:Opportunity Name`;let h;h=$localize`:@@opportunity.amount.label:Amount`;let x;x=$localize`:@@opportunity.stage.label:Stage`;let $;$=$localize`:@@opportunity.closeDate.label:Close Date`;let L;L=$localize`:@@opportunity.opportunityId.label:Id`;let U;U=$localize`:@@list.actions:Actions`;let Y;Y=$localize`:@@opportunity.list.edit:Edit`;let b;return b=$localize`:@@opportunity.list.delete:Delete`,[A,f,h,x,$,L,U,Y,b,["title",t,"countLabel",o,"createLink","/opportunities/add","createLabel",r,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",u,1,"w-full","max-w-xs",3,"search"],["title",g,"message",M,3,"confirmed"],["aria-busy","true","aria-label","Loading opportunities",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",y,"actionLink","/opportunities/add","actionLabel",R,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3","tabular-nums"],[1,"p-3"],[3,"value","tone"],[1,"p-3","text-zinc-600"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(o,r){o&1&&(d(0,"app-page-header",9),e(1,`

`),n(2,"div",10),e(3,`
    `),n(4,"app-search-input",11),c("search",function(g){return r.onSearch(g)}),i(),e(5,`
`),i(),e(6,`

`),w(7,le,13,0)(8,pe,3,1)(9,se,43,4),n(10,"app-confirm-dialog",12),c("confirmed",function(){return r.deleteConfirmed()}),i(),e(11,`
`)),o&2&&(T("count",r.totalElements),s(7),z(r.loading?7:r.opportunities.length===0?8:9))},dependencies:[F,J,ee,te,C,ne,ie,oe,H],encapsulation:2});let l=a;return l})();export{Re as OpportunityListComponent};
