import{a as Y,b as Z,c as p,d as ee}from"./chunk-CYGDML32.js";import{a as J}from"./chunk-HXZTBP67.js";import{a as K}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A as S,Ca as e,Da as d,Ja as H,N as r,S as w,Va as F,ba as W,ca as B,ea as G,eb as Q,fa as X,ga as T,ha as n,ia as i,ib as q,ja as A,jb as j,na as m,pa as C,sa as E,ua as N,x as g,xa as D,ya as k,z as P,za as V}from"./chunk-JRLO7FLJ.js";var te=l=>["/accounts/edit",l],ne=(l,s)=>s.accountId;function ie(l,s){l&1&&(e(0,`
`),n(1,"div",12),e(2,`
    `),n(3,"div",13),e(4,`
        `),A(5,"div",14),e(6,`
        `),A(7,"div",14),e(8,`
        `),A(9,"div",14),e(10,`
    `),i(),e(11,`
`),i(),e(12,`
`))}function oe(l,s){l&1&&(e(0,`
`),A(1,"app-empty-state",15),e(2,`
`))}function _e(l,s){if(l&1){let _=m();e(0,`
            `),n(1,"tr",22),e(2,`
                `),n(3,"td",23),e(4),i(),e(5,`
                `),n(6,"td",24),e(7),i(),e(8,`
                `),n(9,"td",24),e(10),i(),e(11,`
                `),n(12,"td",25),e(13),i(),e(14,`
                `),n(15,"td",25),e(16),i(),e(17,`
                `),n(18,"td",26),e(19),i(),e(20,`
                `),n(21,"td",25),e(22,`
                    `),n(23,"div",27),e(24,`
                        `),n(25,"a",28),C(26,8),i(),e(27,`
                        `),n(28,"button",29),E("click",function(){let o=P(_).$implicit,c=N(2);return S(c.requestDelete(o.accountId))}),C(29,9),i(),e(30,`
                    `),i(),e(31,`
                `),i(),e(32,`
            `),i(),e(33,`
            `)}if(l&2){let _=s.$implicit,t=N(2);r(4),d(_.accountName),r(3),d(_.industry),r(3),d(_.website),r(3),d(_.phone),r(3),d(_.city),r(2),T("title",_.accountId),r(),d(t.shortId(_.accountId)),r(6),T("routerLink",H(8,te,_.accountId))}}function ce(l,s){if(l&1){let _=m();e(0,`
`),n(1,"div",16),e(2,`
    `),n(3,"table",17),e(4,`
        `),n(5,"caption",18),C(6,0),i(),e(7,`
        `),n(8,"thead"),e(9,`
            `),n(10,"tr",19),e(11,`
                `),n(12,"th",20),C(13,1),i(),e(14,`
                `),n(15,"th",20),C(16,2),i(),e(17,`
                `),n(18,"th",20),C(19,3),i(),e(20,`
                `),n(21,"th",20),C(22,4),i(),e(23,`
                `),n(24,"th",20),C(25,5),i(),e(26,`
                `),n(27,"th",20),C(28,6),i(),e(29,`
                `),n(30,"th")(31,"span",18),C(32,7),i()(),e(33,`
            `),i(),e(34,`
        `),i(),e(35,`
        `),n(36,"tbody"),e(37,`
            `),G(38,_e,34,10,null,null,ne),i(),e(40,`
    `),i(),e(41,`
`),i(),e(42,`
`),n(43,"app-pagination",21),E("pageChange",function(o){P(_);let c=N();return S(c.onPage(o))})("pageSizeChange",function(o){P(_);let c=N();return S(c.onPageSize(o))}),e(44,"accounts"),i(),e(45,`
`)}if(l&2){let _=N();r(38),X(_.accounts),r(5),T("page",_.page)("totalPages",_.totalPages)("totalElements",_.totalElements??0)("pageSize",_.pageSize)}}var Se=(()=>{let s=class s{constructor(){this.accountService=g(J),this.errorHandler=g(K),this.router=g(q),this.accounts=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0}getMessage(t,o){return{deleted:$localize`:@@account.delete.success:Account was removed successfully.`,"account.contact.account.referenced":$localize`:@@account.contact.account.referenced:This entity is still referenced by Contact ${o?.id} via field Account.`,"account.opportunity.account.referenced":$localize`:@@account.opportunity.account.referenced:This entity is still referenced by Opportunity ${o?.id} via field Account.`,"account.activityRelation.account.referenced":$localize`:@@account.activityRelation.account.referenced:This entity is still referenced by Activity Relation ${o?.id} via field Account.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof Q&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.accountService.getAccountsPaged(this.page,this.pageSize).subscribe({next:t=>{this.accounts=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.accountService.deleteAccount(t).subscribe({next:()=>this.router.navigate(["/accounts"],{state:{msgInfo:this.getMessage("deleted")}}),error:o=>{if(o.error?.code==="REFERENCED"){let c=o.error.message.split(",");this.router.navigate(["/accounts"],{state:{msgError:this.getMessage(c[0],{id:c[1]})??o.error.message}});return}this.errorHandler.handleServerError(o.error)}}))}};s.\u0275fac=function(o){return new(o||s)},s.\u0275cmp=w({type:s,selectors:[["app-account-list"]],viewQuery:function(o,c){if(o&1&&D(p,5),o&2){let u;k(u=V())&&(c.confirmDialog=u.first)}},decls:7,vars:2,consts:()=>{let t;t=$localize`:@@account.list.headline:Accounts`;let o;o=$localize`:@@account.list.count:accounts total`;let c;c=$localize`:@@account.list.createNew:Create new Account`;let u;u=$localize`:@@delete.title:Delete this record?`;let M;M=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let O;O=$localize`:@@account.list.empty:No accounts found`;let f;f=$localize`:@@account.list.emptyHint:Create the first account to get started.`;let I;I=$localize`:@@account.list.createNew:Create new Account`;let $;$=$localize`:@@account.list.caption:Accounts with name, industry and contact details`;let x;x=$localize`:@@account.accountName.label:Account Name`;let h;h=$localize`:@@account.industry.label:Industry`;let L;L=$localize`:@@account.website.label:Website`;let R;R=$localize`:@@account.phone.label:Phone`;let y;y=$localize`:@@account.city.label:City`;let U;U=$localize`:@@account.accountId.label:Id`;let b;b=$localize`:@@list.actions:Actions`;let v;v=$localize`:@@account.list.edit:Edit`;let z;return z=$localize`:@@account.list.delete:Delete`,[$,x,h,L,R,y,U,b,v,z,["title",t,"countLabel",o,"createLink","/accounts/add","createLabel",c,3,"count"],["title",u,"message",M,3,"confirmed"],["aria-busy","true","aria-label","Loading accounts",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["title",O,"hint",f,"actionLink","/accounts/add","actionLabel",I],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3","text-zinc-600"],[1,"p-3"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(o,c){o&1&&(A(0,"app-page-header",10),e(1,`

`),W(2,ie,13,0)(3,oe,3,0)(4,ce,46,4),n(5,"app-confirm-dialog",11),E("confirmed",function(){return c.deleteConfirmed()}),i(),e(6,`
`)),o&2&&(T("count",c.totalElements),r(2),B(c.loading?2:c.accounts.length===0?3:4))},dependencies:[F,j,Y,Z,p,ee],encapsulation:2});let l=s;return l})();export{Se as AccountListComponent};
