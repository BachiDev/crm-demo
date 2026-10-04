import{a as j}from"./chunk-F5CLIEKU.js";import{a as K,b as Y,c as f,d as Z}from"./chunk-CYGDML32.js";import{a as J}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A as M,Ca as e,Da as g,Ja as V,N as d,S as v,Va as H,ba as z,ca as B,ea as G,eb as F,fa as W,ga as m,ha as i,ia as _,ib as Q,ja as u,jb as q,na as T,pa as E,sa as N,ua as c,x as P,xa as X,ya as D,z as p,za as k}from"./chunk-JRLO7FLJ.js";var ee=s=>["/users/edit",s],te=(s,a)=>a.userId;function ne(s,a){s&1&&(e(0,`
`),i(1,"div",11),e(2,`
    `),i(3,"div",12),e(4,`
        `),u(5,"div",13),e(6,`
        `),u(7,"div",13),e(8,`
        `),u(9,"div",13),e(10,`
    `),_(),e(11,`
`),_(),e(12,`
`))}function ie(s,a){s&1&&(e(0,`
`),u(1,"app-empty-state",14),e(2,`
`))}function _e(s,a){if(s&1){let o=T();e(0,`
            `),i(1,"tr",21),e(2,`
                `),i(3,"td",22),e(4),_(),e(5,`
                `),i(6,"td",23),e(7),_(),e(8,`
                `),i(9,"td",24),e(10),_(),e(11,`
                `),i(12,"td",24),e(13),_(),e(14,`
                `),i(15,"td",25),e(16),_(),e(17,`
                `),i(18,"td",24),e(19,`
                    `),i(20,"div",26),e(21,`
                        `),i(22,"a",27),E(23,7),_(),e(24,`
                        `),i(25,"button",28),N("click",function(){let n=p(o).$implicit,r=c(2);return M(r.requestDelete(n.userId))}),E(26,8),_(),e(27,`
                    `),_(),e(28,`
                `),_(),e(29,`
            `),_(),e(30,`
            `)}if(s&2){let o=a.$implicit,t=c(2);d(4),g(o.username),d(3),g(o.email),d(3),g(o.firstName),d(3),g(o.lastName),d(2),m("title",o.userId),d(),g(t.shortId(o.userId)),d(6),m("routerLink",V(7,ee,o.userId))}}function re(s,a){if(s&1){let o=T();e(0,`
`),i(1,"div",15),e(2,`
    `),i(3,"table",16),e(4,`
        `),i(5,"caption",17),E(6,0),_(),e(7,`
        `),i(8,"thead"),e(9,`
            `),i(10,"tr",18),e(11,`
                `),i(12,"th",19),E(13,1),_(),e(14,`
                `),i(15,"th",19),E(16,2),_(),e(17,`
                `),i(18,"th",19),E(19,3),_(),e(20,`
                `),i(21,"th",19),E(22,4),_(),e(23,`
                `),i(24,"th",19),E(25,5),_(),e(26,`
                `),i(27,"th")(28,"span",17),E(29,6),_()(),e(30,`
            `),_(),e(31,`
        `),_(),e(32,`
        `),i(33,"tbody"),e(34,`
            `),G(35,_e,31,9,null,null,te),_(),e(37,`
    `),_(),e(38,`
`),_(),e(39,`
`),i(40,"app-pagination",20),N("pageChange",function(n){p(o);let r=c();return M(r.onPage(n))})("pageSizeChange",function(n){p(o);let r=c();return M(r.onPageSize(n))}),e(41,"users"),_(),e(42,`
`)}if(s&2){let o=c();d(35),W(o.users),d(5),m("page",o.page)("totalPages",o.totalPages)("totalElements",o.totalElements??0)("pageSize",o.pageSize)}}var pe=(()=>{let a=class a{constructor(){this.userService=P(j),this.errorHandler=P(J),this.router=P(Q),this.users=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0}getMessage(t,n){return{deleted:$localize`:@@user.delete.success:User was removed successfully.`,"user.account.owner.referenced":$localize`:@@user.account.owner.referenced:This entity is still referenced by Account ${n?.id} via field Owner.`,"user.contact.owner.referenced":$localize`:@@user.contact.owner.referenced:This entity is still referenced by Contact ${n?.id} via field Owner.`,"user.opportunity.owner.referenced":$localize`:@@user.opportunity.owner.referenced:This entity is still referenced by Opportunity ${n?.id} via field Owner.`,"user.activity.owner.referenced":$localize`:@@user.activity.owner.referenced:This entity is still referenced by Activity ${n?.id} via field Owner.`,"user.memo.user.referenced":$localize`:@@user.memo.user.referenced:This entity is still referenced by Memo ${n?.id} via field User.`,"user.campaign.owner.referenced":$localize`:@@user.campaign.owner.referenced:This entity is still referenced by Campaign ${n?.id} via field Owner.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof F&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.userService.getUsersPaged(this.page,this.pageSize).subscribe({next:t=>{this.users=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.userService.deleteUser(t).subscribe({next:()=>this.router.navigate(["/users"],{state:{msgInfo:this.getMessage("deleted")}}),error:n=>{if(n.error?.code==="REFERENCED"){let r=n.error.message.split(",");this.router.navigate(["/users"],{state:{msgError:this.getMessage(r[0],{id:r[1]})??n.error.message}});return}this.errorHandler.handleServerError(n.error)}}))}};a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=v({type:a,selectors:[["app-user-list"]],viewQuery:function(n,r){if(n&1&&X(f,5),n&2){let S;D(S=k())&&(r.confirmDialog=S.first)}},decls:7,vars:2,consts:()=>{let t;t=$localize`:@@user.list.headline:Users`;let n;n=$localize`:@@user.list.count:users total`;let r;r=$localize`:@@user.list.createNew:Create new User`;let S;S=$localize`:@@delete.title:Delete this record?`;let C;C=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let R;R=$localize`:@@user.list.empty:No users found`;let A;A=$localize`:@@user.list.emptyHint:Create the first user to get started.`;let I;I=$localize`:@@user.list.createNew:Create new User`;let $;$=$localize`:@@user.list.caption:Users with username, email and name`;let x;x=$localize`:@@user.username.label:Username`;let h;h=$localize`:@@user.email.label:Email`;let U;U=$localize`:@@user.firstName.label:First Name`;let L;L=$localize`:@@user.lastName.label:Last Name`;let O;O=$localize`:@@user.userId.label:Id`;let y;y=$localize`:@@list.actions:Actions`;let b;b=$localize`:@@user.list.edit:Edit`;let w;return w=$localize`:@@user.list.delete:Delete`,[$,x,h,U,L,O,y,b,w,["title",t,"countLabel",n,"createLink","/users/add","createLabel",r,3,"count"],["title",S,"message",C,3,"confirmed"],["aria-busy","true","aria-label","Loading users",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["title",R,"hint",A,"actionLink","/users/add","actionLabel",I],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3","text-zinc-600"],[1,"p-3"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(n,r){n&1&&(u(0,"app-page-header",9),e(1,`

`),z(2,ne,13,0)(3,ie,3,0)(4,re,43,4),i(5,"app-confirm-dialog",10),N("confirmed",function(){return r.deleteConfirmed()}),_(),e(6,`
`)),n&2&&(m("count",r.totalElements),d(2),B(r.loading?2:r.users.length===0?3:4))},dependencies:[H,q,K,Y,f,Z],encapsulation:2});let s=a;return s})();export{pe as UserListComponent};
