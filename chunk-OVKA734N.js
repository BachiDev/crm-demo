import{a as k}from"./chunk-JGNZIOI5.js";import{a as D}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A as x,Ca as e,Da as C,Ja as G,N as s,S as p,Va as W,ba as $,ca as b,ea as L,eb as X,fa as R,ga as h,ha as t,ia as n,ib as w,ja as y,jb as z,na as v,pa as l,sa as B,ua as N,x as d,z as I}from"./chunk-JRLO7FLJ.js";var F=_=>["/contacts/edit",_],j=(_,c)=>c.contactId;function H(_,c){_&1&&(e(0,`
`),t(1,"div"),l(2,2),n(),e(3,`
`))}function V(_,c){if(_&1){let a=v();e(0,`
            `),t(1,"tr",20),e(2,`
                `),t(3,"td",21),e(4),n(),e(5,`
                `),t(6,"td",21),e(7),n(),e(8,`
                `),t(9,"td",21),e(10),n(),e(11,`
                `),t(12,"td",21),e(13),n(),e(14,`
                `),t(15,"td",21),e(16),n(),e(17,`
                `),t(18,"td",21),e(19),n(),e(20,`
                `),t(21,"td",21),e(22),n(),e(23,`
                `),t(24,"td",21),e(25),n(),e(26,`
                `),t(27,"td",21),e(28,`
                    `),t(29,"div",22),e(30,`
                        `),t(31,"a",23),l(32,11),n(),e(33,`
                        `),t(34,"button",24),B("click",function(){let i=I(a).$implicit,T=N(2);return x(T.confirmDelete(i.contactId))}),l(35,12),n(),e(36,`
                    `),n(),e(37,`
                `),n(),e(38,`
            `),n(),e(39,`
            `)}if(_&2){let a=c.$implicit;s(4),C(a.contactId),s(3),C(a.firstName),s(3),C(a.lastName),s(3),C(a.email),s(3),C(a.phone),s(3),C(a.jobTitle),s(3),C(a.isLead),s(3),C(a.account),s(6),h("routerLink",G(9,F,a.contactId))}}function J(_,c){if(_&1&&(e(0,`
`),t(1,"div",16),e(2,`
    `),t(3,"table",17),e(4,`
        `),t(5,"thead"),e(6,`
            `),t(7,"tr"),e(8,`
                `),t(9,"th",18),l(10,3),n(),e(11,`
                `),t(12,"th",18),l(13,4),n(),e(14,`
                `),t(15,"th",18),l(16,5),n(),e(17,`
                `),t(18,"th",18),l(19,6),n(),e(20,`
                `),t(21,"th",18),l(22,7),n(),e(23,`
                `),t(24,"th",18),l(25,8),n(),e(26,`
                `),t(27,"th",18),l(28,9),n(),e(29,`
                `),t(30,"th",18),l(31,10),n(),e(32,`
                `),y(33,"th"),e(34,`
            `),n(),e(35,`
        `),n(),e(36,`
        `),t(37,"tbody",19),e(38,`
            `),L(39,V,40,11,null,null,j),n(),e(41,`
    `),n(),e(42,`
`),n(),e(43,`
`)),_&2){let a=N();s(39),R(a.contacts)}}var te=(()=>{let c=class c{constructor(){this.contactService=d(k),this.errorHandler=d(D),this.router=d(w)}getMessage(o,i){return{confirm:$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,deleted:$localize`:@@contact.delete.success:Contact was removed successfully.`,"contact.opportunity.contact.referenced":$localize`:@@contact.opportunity.contact.referenced:This entity is still referenced by Opportunity ${i?.id} via field Contact.`,"contact.activityRelation.contact.referenced":$localize`:@@contact.activityRelation.contact.referenced:This entity is still referenced by Activity Relation ${i?.id} via field Contact.`}[o]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(o=>{o instanceof X&&this.loadData()})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.contactService.getAllContacts().subscribe({next:o=>this.contacts=o,error:o=>this.errorHandler.handleServerError(o.error)})}confirmDelete(o){confirm(this.getMessage("confirm"))&&this.contactService.deleteContact(o).subscribe({next:()=>this.router.navigate(["/contacts"],{state:{msgInfo:this.getMessage("deleted")}}),error:i=>{if(i.error?.code==="REFERENCED"){let T=i.error.message.split(",");this.router.navigate(["/contacts"],{state:{msgError:this.getMessage(T[0],{id:T[1]})??i.error.message}});return}this.errorHandler.handleServerError(i.error)}})}};c.\u0275fac=function(i){return new(i||c)},c.\u0275cmp=p({type:c,selectors:[["app-contact-list"]],decls:14,vars:1,consts:()=>{let o;o=$localize`:@@contact.list.headline:Contacts`;let i;i=$localize`:@@contact.list.createNew:Create new Contact`;let T;T=$localize`:@@contact.list.empty:No Contacts could be found.`;let A;A=$localize`:@@contact.contactId.label:Contact Id`;let E;E=$localize`:@@contact.firstName.label:First Name`;let S;S=$localize`:@@contact.lastName.label:Last Name`;let m;m=$localize`:@@contact.email.label:Email`;let P;P=$localize`:@@contact.phone.label:Phone`;let g;g=$localize`:@@contact.jobTitle.label:Job Title`;let M;M=$localize`:@@contact.isLead.label:Is Lead`;let u;u=$localize`:@@contact.account.label:Account`;let O;O=$localize`:@@contact.list.edit:Edit`;let f;return f=$localize`:@@contact.list.delete:Delete`,[o,i,T,A,E,S,m,P,g,M,u,O,f,[1,"flex","flex-wrap","mb-6"],[1,"grow","text-3xl","md:text-4xl","font-medium","mb-2"],["routerLink","/contacts/add",1,"inline-block","text-white","bg-blue-600","hover:bg-blue-700","focus:ring-blue-300","focus:ring-4","rounded","px-5","py-2"],[1,"overflow-x-auto"],[1,"w-full"],["scope","col",1,"text-left","p-2"],[1,"border-t-2","border-black"],[1,"odd:bg-gray-100"],[1,"p-2"],[1,"float-right","whitespace-nowrap"],[1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm",3,"routerLink"],["type","button",1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm","cursor-pointer",3,"click"]]},template:function(i,T){i&1&&(t(0,"div",13),e(1,`
    `),t(2,"h1",14),l(3,0),n(),e(4,`
    `),t(5,"div"),e(6,`
        `),t(7,"a",15),l(8,1),n(),e(9,`
    `),n(),e(10,`
`),n(),e(11,`
`),$(12,H,4,0)(13,J,44,0)),i&2&&(s(12),b(!T.contacts||T.contacts.length===0?12:13))},dependencies:[W,z],encapsulation:2});let _=c;return _})();export{te as ContactListComponent};
