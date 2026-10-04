import{a as G}from"./chunk-WERVRMZH.js";import{a as W}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A as M,Ca as e,Da as d,Ja as V,N as T,S as N,Va as h,ba as f,ca as x,ea as p,eb as Y,fa as $,ga as b,ha as t,ia as i,ib as w,ja as L,jb as B,na as R,pa as a,sa as O,ua as A,x as I,z as m}from"./chunk-JRLO7FLJ.js";var X=l=>["/activities/edit",l],D=(l,o)=>o.activityId;function z(l,o){l&1&&(e(0,`
`),t(1,"div"),a(2,2),i(),e(3,`
`))}function k(l,o){if(l&1){let r=R();e(0,`
            `),t(1,"tr",18),e(2,`
                `),t(3,"td",19),e(4),i(),e(5,`
                `),t(6,"td",19),e(7),i(),e(8,`
                `),t(9,"td",19),e(10),i(),e(11,`
                `),t(12,"td",19),e(13),i(),e(14,`
                `),t(15,"td",19),e(16),i(),e(17,`
                `),t(18,"td",19),e(19),i(),e(20,`
                `),t(21,"td",19),e(22,`
                    `),t(23,"div",20),e(24,`
                        `),t(25,"a",21),a(26,9),i(),e(27,`
                        `),t(28,"button",22),O("click",function(){let n=m(r).$implicit,c=A(2);return M(c.confirmDelete(n.activityId))}),a(29,10),i(),e(30,`
                    `),i(),e(31,`
                `),i(),e(32,`
            `),i(),e(33,`
            `)}if(l&2){let r=o.$implicit;T(4),d(r.activityId),T(3),d(r.activityType),T(3),d(r.subject),T(3),d(r.dueDate),T(3),d(r.status),T(3),d(r.owner),T(6),b("routerLink",V(7,X,r.activityId))}}function j(l,o){if(l&1&&(e(0,`
`),t(1,"div",14),e(2,`
    `),t(3,"table",15),e(4,`
        `),t(5,"thead"),e(6,`
            `),t(7,"tr"),e(8,`
                `),t(9,"th",16),a(10,3),i(),e(11,`
                `),t(12,"th",16),a(13,4),i(),e(14,`
                `),t(15,"th",16),a(16,5),i(),e(17,`
                `),t(18,"th",16),a(19,6),i(),e(20,`
                `),t(21,"th",16),a(22,7),i(),e(23,`
                `),t(24,"th",16),a(25,8),i(),e(26,`
                `),L(27,"th"),e(28,`
            `),i(),e(29,`
        `),i(),e(30,`
        `),t(31,"tbody",17),e(32,`
            `),p(33,k,34,9,null,null,D),i(),e(35,`
    `),i(),e(36,`
`),i(),e(37,`
`)),l&2){let r=A();T(33),$(r.activities)}}var Z=(()=>{let o=class o{constructor(){this.activityService=I(G),this.errorHandler=I(W),this.router=I(w)}getMessage(_,n){return{confirm:$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,deleted:$localize`:@@activity.delete.success:Activity was removed successfully.`,"activity.activityRelation.activity.referenced":$localize`:@@activity.activityRelation.activity.referenced:This entity is still referenced by Activity Relation ${n?.id} via field Activity.`}[_]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(_=>{_ instanceof Y&&this.loadData()})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.activityService.getAllActivities().subscribe({next:_=>this.activities=_,error:_=>this.errorHandler.handleServerError(_.error)})}confirmDelete(_){confirm(this.getMessage("confirm"))&&this.activityService.deleteActivity(_).subscribe({next:()=>this.router.navigate(["/activities"],{state:{msgInfo:this.getMessage("deleted")}}),error:n=>{if(n.error?.code==="REFERENCED"){let c=n.error.message.split(",");this.router.navigate(["/activities"],{state:{msgError:this.getMessage(c[0],{id:c[1]})??n.error.message}});return}this.errorHandler.handleServerError(n.error)}})}};o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=N({type:o,selectors:[["app-activity-list"]],decls:14,vars:1,consts:()=>{let _;_=$localize`:@@activity.list.headline:Activities`;let n;n=$localize`:@@activity.list.createNew:Create new Activity`;let c;c=$localize`:@@activity.list.empty:No Activities could be found.`;let C;C=$localize`:@@activity.activityId.label:Activity Id`;let S;S=$localize`:@@activity.activityType.label:Activity Type`;let E;E=$localize`:@@activity.subject.label:Subject`;let v;v=$localize`:@@activity.dueDate.label:Due Date`;let u;u=$localize`:@@activity.status.label:Status`;let g;g=$localize`:@@activity.owner.label:Owner`;let y;y=$localize`:@@activity.list.edit:Edit`;let P;return P=$localize`:@@activity.list.delete:Delete`,[_,n,c,C,S,E,v,u,g,y,P,[1,"flex","flex-wrap","mb-6"],[1,"grow","text-3xl","md:text-4xl","font-medium","mb-2"],["routerLink","/activities/add",1,"inline-block","text-white","bg-blue-600","hover:bg-blue-700","focus:ring-blue-300","focus:ring-4","rounded","px-5","py-2"],[1,"overflow-x-auto"],[1,"w-full"],["scope","col",1,"text-left","p-2"],[1,"border-t-2","border-black"],[1,"odd:bg-gray-100"],[1,"p-2"],[1,"float-right","whitespace-nowrap"],[1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm",3,"routerLink"],["type","button",1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm","cursor-pointer",3,"click"]]},template:function(n,c){n&1&&(t(0,"div",11),e(1,`
    `),t(2,"h1",12),a(3,0),i(),e(4,`
    `),t(5,"div"),e(6,`
        `),t(7,"a",13),a(8,1),i(),e(9,`
    `),i(),e(10,`
`),i(),e(11,`
`),f(12,z,4,0)(13,j,38,0)),n&2&&(T(12),x(!c.activities||c.activities.length===0?12:13))},dependencies:[h,B],encapsulation:2});let l=o;return l})();export{Z as ActivityListComponent};
