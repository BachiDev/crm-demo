import{a as ie}from"./chunk-Q4JRA2ON.js";import{a as U}from"./chunk-UKTKB755.js";import{a as Z,b as ee,c as f,d as te,e as ne}from"./chunk-P6EUP75Z.js";import"./chunk-3UDFUMK6.js";import{a as Y}from"./chunk-IE2CQ4IW.js";import"./chunk-X534G2PA.js";import"./chunk-VAL26HVG.js";import{Aa as V,B as P,Ba as j,C as p,Ea as e,Fa as g,La as H,P as s,U as X,Ya as q,da as u,ea as M,ga as D,ha as k,hb as Q,ia as d,ja as n,ka as i,la as N,lb as J,mb as K,pa as O,ra as C,ua as m,wa as A,z as E,za as F}from"./chunk-OJ74WIM5.js";var oe=a=>["/contacts/edit",a],_e=(a,r)=>r.contactId;function ae(a,r){a&1&&(e(0,`
`),n(1,"div",15),e(2,`
    `),n(3,"div",16),e(4,`
        `),N(5,"div",17),e(6,`
        `),N(7,"div",17),e(8,`
        `),N(9,"div",17),e(10,`
    `),i(),e(11,`
`),i(),e(12,`
`))}function le(a,r){if(a&1&&(e(0,`
`),N(1,"app-empty-state",18),e(2,`
`)),a&2){let _=A();s(),d("title",_.q?"No contacts match your search":"No contacts found")}}function ce(a,r){a&1&&(e(0," "),N(1,"app-status-pill",33),e(2," "))}function re(a,r){a&1&&(e(0," "),n(1,"span",34),e(2,"\u2013"),i(),e(3," "))}function se(a,r){if(a&1){let _=O();e(0,`
            `),n(1,"tr",25),e(2,`
                `),n(3,"td",26),e(4),i(),e(5,`
                `),n(6,"td",26),e(7),i(),e(8,`
                `),n(9,"td",27),e(10),i(),e(11,`
                `),n(12,"td",28),e(13),i(),e(14,`
                `),n(15,"td",28),u(16,ce,3,0)(17,re,4,0),i(),e(18,`
                `),n(19,"td",29),e(20),i(),e(21,`
                `),n(22,"td",29),e(23),i(),e(24,`
                `),n(25,"td",28),e(26,`
                    `),n(27,"div",30),e(28,`
                        `),n(29,"a",31),C(30,9),i(),e(31,`
                        `),n(32,"button",32),m("click",function(){let o=P(_).$implicit,l=A(2);return p(l.requestDelete(o.contactId))}),C(33,10),i(),e(34,`
                    `),i(),e(35,`
                `),i(),e(36,`
            `),i(),e(37,`
            `)}if(a&2){let _=r.$implicit,t=A(2);s(4),g(_.firstName),s(3),g(_.lastName),s(3),g(_.email),s(3),g(_.jobTitle),s(3),M(_.isLead?16:17),s(3),d("title",_.account),s(),g(t.shortId(_.account)),s(2),d("title",_.contactId),s(),g(t.shortId(_.contactId)),s(6),d("routerLink",H(10,oe,_.contactId))}}function Ce(a,r){if(a&1){let _=O();e(0,`
`),n(1,"div",19),e(2,`
    `),n(3,"table",20),e(4,`
        `),n(5,"caption",21),C(6,0),i(),e(7,`
        `),n(8,"thead"),e(9,`
            `),n(10,"tr",22),e(11,`
                `),n(12,"th",23),C(13,1),i(),e(14,`
                `),n(15,"th",23),C(16,2),i(),e(17,`
                `),n(18,"th",23),C(19,3),i(),e(20,`
                `),n(21,"th",23),C(22,4),i(),e(23,`
                `),n(24,"th",23),C(25,5),i(),e(26,`
                `),n(27,"th",23),C(28,6),i(),e(29,`
                `),n(30,"th",23),C(31,7),i(),e(32,`
                `),n(33,"th")(34,"span",21),C(35,8),i()(),e(36,`
            `),i(),e(37,`
        `),i(),e(38,`
        `),n(39,"tbody"),e(40,`
            `),D(41,se,38,12,null,null,_e),i(),e(43,`
    `),i(),e(44,`
`),i(),e(45,`
`),n(46,"app-pagination",24),m("pageChange",function(o){P(_);let l=A();return p(l.onPage(o))})("pageSizeChange",function(o){P(_);let l=A();return p(l.onPageSize(o))}),e(47,"contacts"),i(),e(48,`
`)}if(a&2){let _=A();s(41),k(_.contacts),s(5),d("page",_.page)("totalPages",_.totalPages)("totalElements",_.totalElements??0)("pageSize",_.pageSize)}}var Ie=(()=>{let r=class r{constructor(){this.contactService=E(U),this.errorHandler=E(Y),this.router=E(J),this.contacts=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(t,o){return{deleted:$localize`:@@contact.delete.success:Contact was removed successfully.`,"contact.opportunity.contact.referenced":$localize`:@@contact.opportunity.contact.referenced:This entity is still referenced by Opportunity ${o?.id} via field Contact.`,"contact.activityRelation.contact.referenced":$localize`:@@contact.activityRelation.contact.referenced:This entity is still referenced by Activity Relation ${o?.id} via field Contact.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof Q&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.contactService.getContactsPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:t=>{this.contacts=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onSearch(t){this.q=t,this.page=0,this.loadData()}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.contactService.deleteContact(t).subscribe({next:()=>this.router.navigate(["/contacts"],{state:{msgInfo:this.getMessage("deleted")}}),error:o=>{if(o.error?.code==="REFERENCED"){let l=o.error.message.split(",");this.router.navigate(["/contacts"],{state:{msgError:this.getMessage(l[0],{id:l[1]})??o.error.message}});return}this.errorHandler.handleServerError(o.error)}}))}};r.\u0275fac=function(o){return new(o||r)},r.\u0275cmp=X({type:r,selectors:[["app-contact-list"]],viewQuery:function(o,l){if(o&1&&F(f,5),o&2){let T;V(T=j())&&(l.confirmDialog=T.first)}},decls:12,vars:2,consts:()=>{let t;t=$localize`:@@contact.list.headline:Contacts`;let o;o=$localize`:@@contact.list.count:contacts total`;let l;l=$localize`:@@contact.list.createNew:Create new Contact`;let T;T=$localize`:@@contact.search:Search name, email, title…`;let S;S=$localize`:@@delete.title:Delete this record?`;let I;I=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let x;x=$localize`:@@contact.list.emptyHint:Create the first contact to get started.`;let h;h=$localize`:@@contact.list.createNew:Create new Contact`;let L;L=$localize`:@@contact.list.caption:Contacts with name, email and job title`;let $;$=$localize`:@@contact.firstName.label:First Name`;let R;R=$localize`:@@contact.lastName.label:Last Name`;let b;b=$localize`:@@contact.email.label:Email`;let y;y=$localize`:@@contact.jobTitle.label:Job Title`;let v;v=$localize`:@@contact.isLead.label:Lead`;let z;z=$localize`:@@contact.account.label:Account`;let w;w=$localize`:@@contact.contactId.label:Id`;let B;B=$localize`:@@list.actions:Actions`;let G;G=$localize`:@@contact.list.edit:Edit`;let W;return W=$localize`:@@contact.list.delete:Delete`,[L,$,R,b,y,v,z,w,B,G,W,["title",t,"countLabel",o,"createLink","/contacts/add","createLabel",l,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",T,1,"w-full","max-w-xs",3,"search"],["title",S,"message",I,3,"confirmed"],["aria-busy","true","aria-label","Loading contacts",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",x,"actionLink","/contacts/add","actionLabel",h,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3","text-zinc-600"],[1,"p-3"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"],["value","Lead","tone","amber"],[1,"text-zinc-300"]]},template:function(o,l){o&1&&(N(0,"app-page-header",11),e(1,`

`),n(2,"div",12),e(3,`
    `),n(4,"app-search-input",13),m("search",function(S){return l.onSearch(S)}),i(),e(5,`
`),i(),e(6,`

`),u(7,ae,13,0)(8,le,3,1)(9,Ce,49,4),n(10,"app-confirm-dialog",14),m("confirmed",function(){return l.deleteConfirmed()}),i(),e(11,`
`)),o&2&&(d("count",l.totalElements),s(7),M(l.loading?7:l.contacts.length===0?8:9))},dependencies:[q,K,Z,ee,f,te,ne,ie],encapsulation:2});let a=r;return a})();export{Ie as ContactListComponent};
