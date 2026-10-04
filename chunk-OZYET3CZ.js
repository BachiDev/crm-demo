import{a as te}from"./chunk-Q4JRA2ON.js";import{a as Q}from"./chunk-343L76WT.js";import{a as K,b as U,c as M,d as Z,e as ee}from"./chunk-P6EUP75Z.js";import"./chunk-3UDFUMK6.js";import{a as J}from"./chunk-IE2CQ4IW.js";import"./chunk-X534G2PA.js";import"./chunk-VAL26HVG.js";import{Aa as X,B as p,Ba as D,C as P,Ea as e,Fa as E,La as k,P as c,U as Y,Ya as j,da as z,ea as w,ga as B,ha as G,hb as H,ia as d,ja as i,ka as n,la as I,lb as q,mb as F,pa as m,ra as T,ua as g,wa as C,z as S,za as W}from"./chunk-OJ74WIM5.js";var ie=l=>["/activities/edit",l],ne=(l,r)=>r.activityId;function _e(l,r){l&1&&(e(0,`
`),i(1,"div",13),e(2,`
    `),i(3,"div",14),e(4,`
        `),I(5,"div",15),e(6,`
        `),I(7,"div",15),e(8,`
        `),I(9,"div",15),e(10,`
    `),n(),e(11,`
`),n(),e(12,`
`))}function oe(l,r){if(l&1&&(e(0,`
`),I(1,"app-empty-state",16),e(2,`
`)),l&2){let o=C();c(),d("title",o.q?"No activities match your search":"No activities found")}}function ae(l,r){if(l&1){let o=m();e(0,`
            `),i(1,"tr",23),e(2,`
                `),i(3,"td",24),e(4),n(),e(5,`
                `),i(6,"td",25),I(7,"app-status-pill",26),n(),e(8,`
                `),i(9,"td",25),I(10,"app-status-pill",27),n(),e(11,`
                `),i(12,"td",28),e(13),n(),e(14,`
                `),i(15,"td",29),e(16),n(),e(17,`
                `),i(18,"td",25),e(19,`
                    `),i(20,"div",30),e(21,`
                        `),i(22,"a",31),T(23,7),n(),e(24,`
                        `),i(25,"button",32),g("click",function(){let _=p(o).$implicit,a=C(2);return P(a.requestDelete(_.activityId))}),T(26,8),n(),e(27,`
                    `),n(),e(28,`
                `),n(),e(29,`
            `),n(),e(30,`
            `)}if(l&2){let o=r.$implicit,t=C(2);c(4),E(o.subject),c(3),d("value",o.activityType||"\u2013"),c(3),d("value",o.status||"\u2013")("tone",t.statusTone(o.status)),c(3),E(o.dueDate),c(2),d("title",o.activityId),c(),E(t.shortId(o.activityId)),c(6),d("routerLink",k(8,ie,o.activityId))}}function le(l,r){if(l&1){let o=m();e(0,`
`),i(1,"div",17),e(2,`
    `),i(3,"table",18),e(4,`
        `),i(5,"caption",19),T(6,0),n(),e(7,`
        `),i(8,"thead"),e(9,`
            `),i(10,"tr",20),e(11,`
                `),i(12,"th",21),T(13,1),n(),e(14,`
                `),i(15,"th",21),T(16,2),n(),e(17,`
                `),i(18,"th",21),T(19,3),n(),e(20,`
                `),i(21,"th",21),T(22,4),n(),e(23,`
                `),i(24,"th",21),T(25,5),n(),e(26,`
                `),i(27,"th")(28,"span",19),T(29,6),n()(),e(30,`
            `),n(),e(31,`
        `),n(),e(32,`
        `),i(33,"tbody"),e(34,`
            `),B(35,ae,31,10,null,null,ne),n(),e(37,`
    `),n(),e(38,`
`),n(),e(39,`
`),i(40,"app-pagination",22),g("pageChange",function(_){p(o);let a=C();return P(a.onPage(_))})("pageSizeChange",function(_){p(o);let a=C();return P(a.onPageSize(_))}),e(41,"activities"),n(),e(42,`
`)}if(l&2){let o=C();c(35),G(o.activities),c(5),d("page",o.page)("totalPages",o.totalPages)("totalElements",o.totalElements??0)("pageSize",o.pageSize)}}var me=(()=>{let r=class r{constructor(){this.activityService=S(Q),this.errorHandler=S(J),this.router=S(q),this.activities=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(t,_){return{deleted:$localize`:@@activity.delete.success:Activity was removed successfully.`,"activity.activityRelation.activity.referenced":$localize`:@@activity.activityRelation.activity.referenced:This entity is still referenced by Activity Relation ${_?.id} via field Activity.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof H&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.activityService.getActivitiesPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:t=>{this.activities=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onSearch(t){this.q=t,this.page=0,this.loadData()}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}statusTone(t){switch((t||"").toLowerCase()){case"planned":return"sky";case"in_progress":case"in progress":return"amber";case"completed":case"done":return"emerald";default:return"zinc"}}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.activityService.deleteActivity(t).subscribe({next:()=>this.router.navigate(["/activities"],{state:{msgInfo:this.getMessage("deleted")}}),error:_=>{if(_.error?.code==="REFERENCED"){let a=_.error.message.split(",");this.router.navigate(["/activities"],{state:{msgError:this.getMessage(a[0],{id:a[1]})??_.error.message}});return}this.errorHandler.handleServerError(_.error)}}))}};r.\u0275fac=function(_){return new(_||r)},r.\u0275cmp=Y({type:r,selectors:[["app-activity-list"]],viewQuery:function(_,a){if(_&1&&W(M,5),_&2){let A;X(A=D())&&(a.confirmDialog=A.first)}},decls:12,vars:2,consts:()=>{let t;t=$localize`:@@activity.list.headline:Activities`;let _;_=$localize`:@@activity.list.count:activities total`;let a;a=$localize`:@@activity.list.createNew:Create new Activity`;let A;A=$localize`:@@activity.search:Search subject, type, status…`;let u;u=$localize`:@@delete.title:Delete this record?`;let v;v=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let y;y=$localize`:@@activity.list.emptyHint:Log the first call or email to get started.`;let N;N=$localize`:@@activity.list.createNew:Create new Activity`;let f;f=$localize`:@@activity.list.caption:Activities with subject, type and status`;let h;h=$localize`:@@activity.subject.label:Subject`;let x;x=$localize`:@@activity.activityType.label:Activity Type`;let $;$=$localize`:@@activity.status.label:Status`;let L;L=$localize`:@@activity.dueDate.label:Due Date`;let V;V=$localize`:@@activity.activityId.label:Id`;let R;R=$localize`:@@list.actions:Actions`;let O;O=$localize`:@@activity.list.edit:Edit`;let b;return b=$localize`:@@activity.list.delete:Delete`,[f,h,x,$,L,V,R,O,b,["title",t,"countLabel",_,"createLink","/activities/add","createLabel",a,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",A,1,"w-full","max-w-xs",3,"search"],["title",u,"message",v,3,"confirmed"],["aria-busy","true","aria-label","Loading activities",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",y,"actionLink","/activities/add","actionLabel",N,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3"],["tone","zinc",3,"value"],[3,"value","tone"],[1,"p-3","text-zinc-600"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(_,a){_&1&&(I(0,"app-page-header",9),e(1,`

`),i(2,"div",10),e(3,`
    `),i(4,"app-search-input",11),g("search",function(u){return a.onSearch(u)}),n(),e(5,`
`),n(),e(6,`

`),z(7,_e,13,0)(8,oe,3,1)(9,le,43,4),i(10,"app-confirm-dialog",12),g("confirmed",function(){return a.deleteConfirmed()}),n(),e(11,`
`)),_&2&&(d("count",a.totalElements),c(7),w(a.loading?7:a.activities.length===0?8:9))},dependencies:[j,F,K,U,M,Z,ee,te],encapsulation:2});let l=r;return l})();export{me as ActivityListComponent};
