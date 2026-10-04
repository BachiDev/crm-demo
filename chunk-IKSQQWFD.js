import{a as Y,b as Z,c as M,d as ee,e as te}from"./chunk-P6EUP75Z.js";import"./chunk-3UDFUMK6.js";import{a as J}from"./chunk-IH37UQTX.js";import{a as K}from"./chunk-IE2CQ4IW.js";import"./chunk-X534G2PA.js";import"./chunk-VAL26HVG.js";import{Aa as k,B as E,Ba as V,C as m,Ea as e,Fa as A,La as H,P as s,U as z,Ya as q,da as W,ea as B,ga as G,ha as X,hb as F,ia as N,ja as n,ka as i,la as T,lb as Q,mb as j,pa as p,ra as C,ua as g,wa as u,z as P,za as D}from"./chunk-OJ74WIM5.js";var ne=a=>["/accounts/edit",a],ie=(a,r)=>r.accountId;function oe(a,r){a&1&&(e(0,`
`),n(1,"div",14),e(2,`
    `),n(3,"div",15),e(4,`
        `),T(5,"div",16),e(6,`
        `),T(7,"div",16),e(8,`
        `),T(9,"div",16),e(10,`
    `),i(),e(11,`
`),i(),e(12,`
`))}function _e(a,r){if(a&1&&(e(0,`
`),T(1,"app-empty-state",17),e(2,`
`)),a&2){let _=u();s(),N("title",_.q?"No accounts match your search":"No accounts found")}}function ce(a,r){if(a&1){let _=p();e(0,`
            `),n(1,"tr",24),e(2,`
                `),n(3,"td",25),e(4),i(),e(5,`
                `),n(6,"td",26),e(7),i(),e(8,`
                `),n(9,"td",26),e(10),i(),e(11,`
                `),n(12,"td",27),e(13),i(),e(14,`
                `),n(15,"td",27),e(16),i(),e(17,`
                `),n(18,"td",28),e(19),i(),e(20,`
                `),n(21,"td",27),e(22,`
                    `),n(23,"div",29),e(24,`
                        `),n(25,"a",30),C(26,8),i(),e(27,`
                        `),n(28,"button",31),g("click",function(){let o=E(_).$implicit,c=u(2);return m(c.requestDelete(o.accountId))}),C(29,9),i(),e(30,`
                    `),i(),e(31,`
                `),i(),e(32,`
            `),i(),e(33,`
            `)}if(a&2){let _=r.$implicit,t=u(2);s(4),A(_.accountName),s(3),A(_.industry),s(3),A(_.website),s(3),A(_.phone),s(3),A(_.city),s(2),N("title",_.accountId),s(),A(t.shortId(_.accountId)),s(6),N("routerLink",H(8,ne,_.accountId))}}function ae(a,r){if(a&1){let _=p();e(0,`
`),n(1,"div",18),e(2,`
    `),n(3,"table",19),e(4,`
        `),n(5,"caption",20),C(6,0),i(),e(7,`
        `),n(8,"thead"),e(9,`
            `),n(10,"tr",21),e(11,`
                `),n(12,"th",22),C(13,1),i(),e(14,`
                `),n(15,"th",22),C(16,2),i(),e(17,`
                `),n(18,"th",22),C(19,3),i(),e(20,`
                `),n(21,"th",22),C(22,4),i(),e(23,`
                `),n(24,"th",22),C(25,5),i(),e(26,`
                `),n(27,"th",22),C(28,6),i(),e(29,`
                `),n(30,"th")(31,"span",20),C(32,7),i()(),e(33,`
            `),i(),e(34,`
        `),i(),e(35,`
        `),n(36,"tbody"),e(37,`
            `),G(38,ce,34,10,null,null,ie),i(),e(40,`
    `),i(),e(41,`
`),i(),e(42,`
`),n(43,"app-pagination",23),g("pageChange",function(o){E(_);let c=u();return m(c.onPage(o))})("pageSizeChange",function(o){E(_);let c=u();return m(c.onPageSize(o))}),e(44,"accounts"),i(),e(45,`
`)}if(a&2){let _=u();s(38),X(_.accounts),s(5),N("page",_.page)("totalPages",_.totalPages)("totalElements",_.totalElements??0)("pageSize",_.pageSize)}}var me=(()=>{let r=class r{constructor(){this.accountService=P(J),this.errorHandler=P(K),this.router=P(Q),this.accounts=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(t,o){return{deleted:$localize`:@@account.delete.success:Account was removed successfully.`,"account.contact.account.referenced":$localize`:@@account.contact.account.referenced:This entity is still referenced by Contact ${o?.id} via field Account.`,"account.opportunity.account.referenced":$localize`:@@account.opportunity.account.referenced:This entity is still referenced by Opportunity ${o?.id} via field Account.`,"account.activityRelation.account.referenced":$localize`:@@account.activityRelation.account.referenced:This entity is still referenced by Activity Relation ${o?.id} via field Account.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof F&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.accountService.getAccountsPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:t=>{this.accounts=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onSearch(t){this.q=t,this.page=0,this.loadData()}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.accountService.deleteAccount(t).subscribe({next:()=>this.router.navigate(["/accounts"],{state:{msgInfo:this.getMessage("deleted")}}),error:o=>{if(o.error?.code==="REFERENCED"){let c=o.error.message.split(",");this.router.navigate(["/accounts"],{state:{msgError:this.getMessage(c[0],{id:c[1]})??o.error.message}});return}this.errorHandler.handleServerError(o.error)}}))}};r.\u0275fac=function(o){return new(o||r)},r.\u0275cmp=z({type:r,selectors:[["app-account-list"]],viewQuery:function(o,c){if(o&1&&D(M,5),o&2){let d;k(d=V())&&(c.confirmDialog=d.first)}},decls:12,vars:2,consts:()=>{let t;t=$localize`:@@account.list.headline:Accounts`;let o;o=$localize`:@@account.list.count:accounts total`;let c;c=$localize`:@@account.list.createNew:Create new Account`;let d;d=$localize`:@@account.search:Search name, industry, city…`;let S;S=$localize`:@@delete.title:Delete this record?`;let O;O=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let f;f=$localize`:@@account.list.emptyHint:Create the first account to get started.`;let I;I=$localize`:@@account.list.createNew:Create new Account`;let h;h=$localize`:@@account.list.caption:Accounts with name, industry and contact details`;let x;x=$localize`:@@account.accountName.label:Account Name`;let $;$=$localize`:@@account.industry.label:Industry`;let L;L=$localize`:@@account.website.label:Website`;let y;y=$localize`:@@account.phone.label:Phone`;let R;R=$localize`:@@account.city.label:City`;let U;U=$localize`:@@account.accountId.label:Id`;let b;b=$localize`:@@list.actions:Actions`;let v;v=$localize`:@@account.list.edit:Edit`;let w;return w=$localize`:@@account.list.delete:Delete`,[h,x,$,L,y,R,U,b,v,w,["title",t,"countLabel",o,"createLink","/accounts/add","createLabel",c,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",d,1,"w-full","max-w-xs",3,"search"],["title",S,"message",O,3,"confirmed"],["aria-busy","true","aria-label","Loading accounts",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",f,"actionLink","/accounts/add","actionLabel",I,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3","text-zinc-600"],[1,"p-3"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(o,c){o&1&&(T(0,"app-page-header",10),e(1,`

`),n(2,"div",11),e(3,`
    `),n(4,"app-search-input",12),g("search",function(S){return c.onSearch(S)}),i(),e(5,`
`),i(),e(6,`

`),W(7,oe,13,0)(8,_e,3,1)(9,ae,46,4),n(10,"app-confirm-dialog",13),g("confirmed",function(){return c.deleteConfirmed()}),i(),e(11,`
`)),o&2&&(N("count",c.totalElements),s(7),B(c.loading?7:c.accounts.length===0?8:9))},dependencies:[q,j,Y,Z,M,ee,te],encapsulation:2});let a=r;return a})();export{me as AccountListComponent};
