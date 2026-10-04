import{a as X}from"./chunk-D745VA7B.js";import{a as D}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A,Ca as t,Da as T,Ja as v,N as a,S as C,Va as w,ba as f,ca as x,ea as $,eb as B,fa as b,ga as L,ha as e,ia as n,ib as G,ja as U,jb as W,na as Y,pa as r,sa as h,ua as d,x as u,z as R}from"./chunk-JRLO7FLJ.js";var z=_=>["/opportunities/edit",_],k=(_,p)=>p.opportunityId;function F(_,p){_&1&&(t(0,`
`),e(1,"div"),r(2,2),n(),t(3,`
`))}function H(_,p){if(_&1){let l=Y();t(0,`
            `),e(1,"tr",20),t(2,`
                `),e(3,"td",21),t(4),n(),t(5,`
                `),e(6,"td",21),t(7),n(),t(8,`
                `),e(9,"td",21),t(10),n(),t(11,`
                `),e(12,"td",21),t(13),n(),t(14,`
                `),e(15,"td",21),t(16),n(),t(17,`
                `),e(18,"td",21),t(19),n(),t(20,`
                `),e(21,"td",21),t(22),n(),t(23,`
                `),e(24,"td",21),t(25),n(),t(26,`
                `),e(27,"td",21),t(28,`
                    `),e(29,"div",22),t(30,`
                        `),e(31,"a",23),r(32,11),n(),t(33,`
                        `),e(34,"button",24),h("click",function(){let i=R(l).$implicit,s=d(2);return A(s.confirmDelete(i.opportunityId))}),r(35,12),n(),t(36,`
                    `),n(),t(37,`
                `),n(),t(38,`
            `),n(),t(39,`
            `)}if(_&2){let l=p.$implicit;a(4),T(l.opportunityId),a(3),T(l.opportunityName),a(3),T(l.amount),a(3),T(l.stage),a(3),T(l.closeDate),a(3),T(l.account),a(3),T(l.contact),a(3),T(l.owner),a(6),L("routerLink",v(9,z,l.opportunityId))}}function V(_,p){if(_&1&&(t(0,`
`),e(1,"div",16),t(2,`
    `),e(3,"table",17),t(4,`
        `),e(5,"thead"),t(6,`
            `),e(7,"tr"),t(8,`
                `),e(9,"th",18),r(10,3),n(),t(11,`
                `),e(12,"th",18),r(13,4),n(),t(14,`
                `),e(15,"th",18),r(16,5),n(),t(17,`
                `),e(18,"th",18),r(19,6),n(),t(20,`
                `),e(21,"th",18),r(22,7),n(),t(23,`
                `),e(24,"th",18),r(25,8),n(),t(26,`
                `),e(27,"th",18),r(28,9),n(),t(29,`
                `),e(30,"th",18),r(31,10),n(),t(32,`
                `),U(33,"th"),t(34,`
            `),n(),t(35,`
        `),n(),t(36,`
        `),e(37,"tbody",19),t(38,`
            `),$(39,H,40,11,null,null,k),n(),t(41,`
    `),n(),t(42,`
`),n(),t(43,`
`)),_&2){let l=d();a(39),b(l.opportunities)}}var et=(()=>{let p=class p{constructor(){this.opportunityService=u(X),this.errorHandler=u(D),this.router=u(G)}getMessage(o,i){return{confirm:$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,deleted:$localize`:@@opportunity.delete.success:Opportunity was removed successfully.`,"opportunity.activityRelation.opportunity.referenced":$localize`:@@opportunity.activityRelation.opportunity.referenced:This entity is still referenced by Activity Relation ${i?.id} via field Opportunity.`}[o]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(o=>{o instanceof B&&this.loadData()})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.opportunityService.getAllOpportunities().subscribe({next:o=>this.opportunities=o,error:o=>this.errorHandler.handleServerError(o.error)})}confirmDelete(o){confirm(this.getMessage("confirm"))&&this.opportunityService.deleteOpportunity(o).subscribe({next:()=>this.router.navigate(["/opportunities"],{state:{msgInfo:this.getMessage("deleted")}}),error:i=>{if(i.error?.code==="REFERENCED"){let s=i.error.message.split(",");this.router.navigate(["/opportunities"],{state:{msgError:this.getMessage(s[0],{id:s[1]})??i.error.message}});return}this.errorHandler.handleServerError(i.error)}})}};p.\u0275fac=function(i){return new(i||p)},p.\u0275cmp=C({type:p,selectors:[["app-opportunity-list"]],decls:14,vars:1,consts:()=>{let o;o=$localize`:@@opportunity.list.headline:Opportunities`;let i;i=$localize`:@@opportunity.list.createNew:Create new Opportunity`;let s;s=$localize`:@@opportunity.list.empty:No Opportunities could be found.`;let O;O=$localize`:@@opportunity.opportunityId.label:Opportunity Id`;let N;N=$localize`:@@opportunity.opportunityName.label:Opportunity Name`;let c;c=$localize`:@@opportunity.amount.label:Amount`;let I;I=$localize`:@@opportunity.stage.label:Stage`;let E;E=$localize`:@@opportunity.closeDate.label:Close Date`;let S;S=$localize`:@@opportunity.account.label:Account`;let g;g=$localize`:@@opportunity.contact.label:Contact`;let m;m=$localize`:@@opportunity.owner.label:Owner`;let M;M=$localize`:@@opportunity.list.edit:Edit`;let y;return y=$localize`:@@opportunity.list.delete:Delete`,[o,i,s,O,N,c,I,E,S,g,m,M,y,[1,"flex","flex-wrap","mb-6"],[1,"grow","text-3xl","md:text-4xl","font-medium","mb-2"],["routerLink","/opportunities/add",1,"inline-block","text-white","bg-blue-600","hover:bg-blue-700","focus:ring-blue-300","focus:ring-4","rounded","px-5","py-2"],[1,"overflow-x-auto"],[1,"w-full"],["scope","col",1,"text-left","p-2"],[1,"border-t-2","border-black"],[1,"odd:bg-gray-100"],[1,"p-2"],[1,"float-right","whitespace-nowrap"],[1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm",3,"routerLink"],["type","button",1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm","cursor-pointer",3,"click"]]},template:function(i,s){i&1&&(e(0,"div",13),t(1,`
    `),e(2,"h1",14),r(3,0),n(),t(4,`
    `),e(5,"div"),t(6,`
        `),e(7,"a",15),r(8,1),n(),t(9,`
    `),n(),t(10,`
`),n(),t(11,`
`),f(12,F,4,0)(13,V,44,0)),i&2&&(a(12),x(!s.opportunities||s.opportunities.length===0?12:13))},dependencies:[w,W],encapsulation:2});let _=p;return _})();export{et as OpportunityListComponent};
