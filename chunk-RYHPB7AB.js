import{a as B}from"./chunk-UKAKGH42.js";import{a as G}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A as m,Ca as t,Da as A,Ja as b,N as c,S as P,Va as V,ba as v,ca as M,ea as L,eb as h,fa as O,ga as p,ha as e,ia as i,ib as Y,ja as f,jb as w,na as x,pa as a,sa as $,ua as d,x as s,z as g}from"./chunk-JRLO7FLJ.js";var W=_=>["/activityRelations/edit",_],X=(_,o)=>o.id;function k(_,o){_&1&&(t(0,`
`),e(1,"div"),a(2,2),i(),t(3,`
`))}function z(_,o){if(_&1){let r=x();t(0,`
            `),e(1,"tr",17),t(2,`
                `),e(3,"td",18),t(4),i(),t(5,`
                `),e(6,"td",18),t(7),i(),t(8,`
                `),e(9,"td",18),t(10),i(),t(11,`
                `),e(12,"td",18),t(13),i(),t(14,`
                `),e(15,"td",18),t(16),i(),t(17,`
                `),e(18,"td",18),t(19,`
                    `),e(20,"div",19),t(21,`
                        `),e(22,"a",20),a(23,8),i(),t(24,`
                        `),e(25,"button",21),$("click",function(){let l=g(r).$implicit,I=d(2);return m(I.confirmDelete(l.id))}),a(26,9),i(),t(27,`
                    `),i(),t(28,`
                `),i(),t(29,`
            `),i(),t(30,`
            `)}if(_&2){let r=o.$implicit;c(4),A(r.id),c(3),A(r.activity),c(3),A(r.account),c(3),A(r.contact),c(3),A(r.opportunity),c(6),p("routerLink",b(6,W,r.id))}}function D(_,o){if(_&1&&(t(0,`
`),e(1,"div",13),t(2,`
    `),e(3,"table",14),t(4,`
        `),e(5,"thead"),t(6,`
            `),e(7,"tr"),t(8,`
                `),e(9,"th",15),a(10,3),i(),t(11,`
                `),e(12,"th",15),a(13,4),i(),t(14,`
                `),e(15,"th",15),a(16,5),i(),t(17,`
                `),e(18,"th",15),a(19,6),i(),t(20,`
                `),e(21,"th",15),a(22,7),i(),t(23,`
                `),f(24,"th"),t(25,`
            `),i(),t(26,`
        `),i(),t(27,`
        `),e(28,"tbody",16),t(29,`
            `),L(30,z,31,8,null,null,X),i(),t(32,`
    `),i(),t(33,`
`),i(),t(34,`
`)),_&2){let r=d();c(30),O(r.activityRelations)}}var U=(()=>{let o=class o{constructor(){this.activityRelationService=s(B),this.errorHandler=s(G),this.router=s(Y)}getMessage(n,l){return{confirm:$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,deleted:$localize`:@@activityRelation.delete.success:Activity Relation was removed successfully.`}[n]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(n=>{n instanceof h&&this.loadData()})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.activityRelationService.getAllActivityRelations().subscribe({next:n=>this.activityRelations=n,error:n=>this.errorHandler.handleServerError(n.error)})}confirmDelete(n){confirm(this.getMessage("confirm"))&&this.activityRelationService.deleteActivityRelation(n).subscribe({next:()=>this.router.navigate(["/activityRelations"],{state:{msgInfo:this.getMessage("deleted")}}),error:l=>this.errorHandler.handleServerError(l.error)})}};o.\u0275fac=function(l){return new(l||o)},o.\u0275cmp=P({type:o,selectors:[["app-activity-relation-list"]],decls:14,vars:1,consts:()=>{let n;n=$localize`:@@activityRelation.list.headline:Activity Relations`;let l;l=$localize`:@@activityRelation.list.createNew:Create new Activity Relation`;let I;I=$localize`:@@activityRelation.list.empty:No Activity Relations could be found.`;let E;E=$localize`:@@activityRelation.id.label:Id`;let R;R=$localize`:@@activityRelation.activity.label:Activity`;let N;N=$localize`:@@activityRelation.account.label:Account`;let C;C=$localize`:@@activityRelation.contact.label:Contact`;let S;S=$localize`:@@activityRelation.opportunity.label:Opportunity`;let u;u=$localize`:@@activityRelation.list.edit:Edit`;let y;return y=$localize`:@@activityRelation.list.delete:Delete`,[n,l,I,E,R,N,C,S,u,y,[1,"flex","flex-wrap","mb-6"],[1,"grow","text-3xl","md:text-4xl","font-medium","mb-2"],["routerLink","/activityRelations/add",1,"inline-block","text-white","bg-blue-600","hover:bg-blue-700","focus:ring-blue-300","focus:ring-4","rounded","px-5","py-2"],[1,"overflow-x-auto"],[1,"w-full"],["scope","col",1,"text-left","p-2"],[1,"border-t-2","border-black"],[1,"odd:bg-gray-100"],[1,"p-2"],[1,"float-right","whitespace-nowrap"],[1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm",3,"routerLink"],["type","button",1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm","cursor-pointer",3,"click"]]},template:function(l,I){l&1&&(e(0,"div",10),t(1,`
    `),e(2,"h1",11),a(3,0),i(),t(4,`
    `),e(5,"div"),t(6,`
        `),e(7,"a",12),a(8,1),i(),t(9,`
    `),i(),t(10,`
`),i(),t(11,`
`),v(12,k,4,0)(13,D,35,0)),l&2&&(c(12),M(!I.activityRelations||I.activityRelations.length===0?12:13))},dependencies:[V,w],encapsulation:2});let _=o;return _})();export{U as ActivityRelationListComponent};
