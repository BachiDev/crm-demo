import{a as j}from"./chunk-B7KASKPV.js";import{a as K,b as Y,c as T,d as Z,e as ee}from"./chunk-P6EUP75Z.js";import"./chunk-3UDFUMK6.js";import{a as J}from"./chunk-IE2CQ4IW.js";import"./chunk-X534G2PA.js";import"./chunk-VAL26HVG.js";import{Aa as D,B as f,Ba as k,C as N,Ea as e,Fa as g,La as V,P as d,U as v,Ya as H,da as z,ea as B,ga as G,ha as W,hb as q,ia as c,ja as n,ka as i,la as m,lb as F,mb as Q,pa as C,ra as u,ua as P,wa as E,z as M,za as X}from"./chunk-OJ74WIM5.js";var te=o=>["/users/edit",o],ne=(o,a)=>a.userId;function ie(o,a){o&1&&(e(0,`
`),n(1,"div",13),e(2,`
    `),n(3,"div",14),e(4,`
        `),m(5,"div",15),e(6,`
        `),m(7,"div",15),e(8,`
        `),m(9,"div",15),e(10,`
    `),i(),e(11,`
`),i(),e(12,`
`))}function _e(o,a){if(o&1&&(e(0,`
`),m(1,"app-empty-state",16),e(2,`
`)),o&2){let r=E();d(),c("title",r.q?"No users match your search":"No users found")}}function re(o,a){if(o&1){let r=C();e(0,`
            `),n(1,"tr",23),e(2,`
                `),n(3,"td",24),e(4),i(),e(5,`
                `),n(6,"td",25),e(7),i(),e(8,`
                `),n(9,"td",26),e(10),i(),e(11,`
                `),n(12,"td",26),e(13),i(),e(14,`
                `),n(15,"td",27),e(16),i(),e(17,`
                `),n(18,"td",26),e(19,`
                    `),n(20,"div",28),e(21,`
                        `),n(22,"a",29),u(23,7),i(),e(24,`
                        `),n(25,"button",30),P("click",function(){let _=f(r).$implicit,s=E(2);return N(s.requestDelete(_.userId))}),u(26,8),i(),e(27,`
                    `),i(),e(28,`
                `),i(),e(29,`
            `),i(),e(30,`
            `)}if(o&2){let r=a.$implicit,t=E(2);d(4),g(r.username),d(3),g(r.email),d(3),g(r.firstName),d(3),g(r.lastName),d(2),c("title",r.userId),d(),g(t.shortId(r.userId)),d(6),c("routerLink",V(7,te,r.userId))}}function se(o,a){if(o&1){let r=C();e(0,`
`),n(1,"div",17),e(2,`
    `),n(3,"table",18),e(4,`
        `),n(5,"caption",19),u(6,0),i(),e(7,`
        `),n(8,"thead"),e(9,`
            `),n(10,"tr",20),e(11,`
                `),n(12,"th",21),u(13,1),i(),e(14,`
                `),n(15,"th",21),u(16,2),i(),e(17,`
                `),n(18,"th",21),u(19,3),i(),e(20,`
                `),n(21,"th",21),u(22,4),i(),e(23,`
                `),n(24,"th",21),u(25,5),i(),e(26,`
                `),n(27,"th")(28,"span",19),u(29,6),i()(),e(30,`
            `),i(),e(31,`
        `),i(),e(32,`
        `),n(33,"tbody"),e(34,`
            `),G(35,re,31,9,null,null,ne),i(),e(37,`
    `),i(),e(38,`
`),i(),e(39,`
`),n(40,"app-pagination",22),P("pageChange",function(_){f(r);let s=E();return N(s.onPage(_))})("pageSizeChange",function(_){f(r);let s=E();return N(s.onPageSize(_))}),e(41,"users"),i(),e(42,`
`)}if(o&2){let r=E();d(35),W(r.users),d(5),c("page",r.page)("totalPages",r.totalPages)("totalElements",r.totalElements??0)("pageSize",r.pageSize)}}var fe=(()=>{let a=class a{constructor(){this.userService=M(j),this.errorHandler=M(J),this.router=M(F),this.users=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(t,_){return{deleted:$localize`:@@user.delete.success:User was removed successfully.`,"user.account.owner.referenced":$localize`:@@user.account.owner.referenced:This entity is still referenced by Account ${_?.id} via field Owner.`,"user.contact.owner.referenced":$localize`:@@user.contact.owner.referenced:This entity is still referenced by Contact ${_?.id} via field Owner.`,"user.opportunity.owner.referenced":$localize`:@@user.opportunity.owner.referenced:This entity is still referenced by Opportunity ${_?.id} via field Owner.`,"user.activity.owner.referenced":$localize`:@@user.activity.owner.referenced:This entity is still referenced by Activity ${_?.id} via field Owner.`,"user.memo.user.referenced":$localize`:@@user.memo.user.referenced:This entity is still referenced by Memo ${_?.id} via field User.`,"user.campaign.owner.referenced":$localize`:@@user.campaign.owner.referenced:This entity is still referenced by Campaign ${_?.id} via field Owner.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof q&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.userService.getUsersPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:t=>{this.users=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onSearch(t){this.q=t,this.page=0,this.loadData()}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.userService.deleteUser(t).subscribe({next:()=>this.router.navigate(["/users"],{state:{msgInfo:this.getMessage("deleted")}}),error:_=>{if(_.error?.code==="REFERENCED"){let s=_.error.message.split(",");this.router.navigate(["/users"],{state:{msgError:this.getMessage(s[0],{id:s[1]})??_.error.message}});return}this.errorHandler.handleServerError(_.error)}}))}};a.\u0275fac=function(_){return new(_||a)},a.\u0275cmp=v({type:a,selectors:[["app-user-list"]],viewQuery:function(_,s){if(_&1&&X(T,5),_&2){let S;D(S=k())&&(s.confirmDialog=S.first)}},decls:12,vars:2,consts:()=>{let t;t=$localize`:@@user.list.headline:Users`;let _;_=$localize`:@@user.list.count:users total`;let s;s=$localize`:@@user.list.createNew:Create new User`;let S;S=$localize`:@@user.search:Search username, email, name…`;let p;p=$localize`:@@delete.title:Delete this record?`;let R;R=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let A;A=$localize`:@@user.list.emptyHint:Create the first user to get started.`;let I;I=$localize`:@@user.list.createNew:Create new User`;let h;h=$localize`:@@user.list.caption:Users with username, email and name`;let x;x=$localize`:@@user.username.label:Username`;let $;$=$localize`:@@user.email.label:Email`;let U;U=$localize`:@@user.firstName.label:First Name`;let L;L=$localize`:@@user.lastName.label:Last Name`;let O;O=$localize`:@@user.userId.label:Id`;let y;y=$localize`:@@list.actions:Actions`;let b;b=$localize`:@@user.list.edit:Edit`;let w;return w=$localize`:@@user.list.delete:Delete`,[h,x,$,U,L,O,y,b,w,["title",t,"countLabel",_,"createLink","/users/add","createLabel",s,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",S,1,"w-full","max-w-xs",3,"search"],["title",p,"message",R,3,"confirmed"],["aria-busy","true","aria-label","Loading users",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",A,"actionLink","/users/add","actionLabel",I,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3","text-zinc-600"],[1,"p-3"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(_,s){_&1&&(m(0,"app-page-header",9),e(1,`

`),n(2,"div",10),e(3,`
    `),n(4,"app-search-input",11),P("search",function(p){return s.onSearch(p)}),i(),e(5,`
`),i(),e(6,`

`),z(7,ie,13,0)(8,_e,3,1)(9,se,43,4),n(10,"app-confirm-dialog",12),P("confirmed",function(){return s.deleteConfirmed()}),i(),e(11,`
`)),_&2&&(c("count",s.totalElements),d(7),B(s.loading?7:s.users.length===0?8:9))},dependencies:[H,Q,K,Y,T,Z,ee],encapsulation:2});let o=a;return o})();export{fe as UserListComponent};
