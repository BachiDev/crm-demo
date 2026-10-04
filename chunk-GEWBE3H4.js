import{a as ne}from"./chunk-PAOTRU4C.js";import{a as K}from"./chunk-QFNED4EF.js";import{a as Y,b as Z,c as u,d as ee,e as te}from"./chunk-6IPJY4NK.js";import"./chunk-CYGIYZWD.js";import{a as U}from"./chunk-QHIQW3ZY.js";import"./chunk-WXSKCASI.js";import"./chunk-VAL26HVG.js";import{Aa as H,B as S,C as I,Da as e,Ea as C,Ka as q,P as g,U as w,Wa as F,ca as B,da as W,fa as X,fb as Q,ga as D,ha as m,ia as n,ja as i,jb as j,ka as c,kb as J,oa as E,qa as p,ta as P,va as d,ya as k,z as N,za as V}from"./chunk-ZAB2ACMA.js";var ie=o=>["/campaigns/edit",o],ae=(o,r)=>r.campaignId;function _e(o,r){o&1&&(e(0,`
`),n(1,"div",14),e(2,`
    `),n(3,"div",15),e(4,`
        `),c(5,"div",16),e(6,`
        `),c(7,"div",16),e(8,`
        `),c(9,"div",16),e(10,`
    `),i(),e(11,`
`),i(),e(12,`
`))}function oe(o,r){if(o&1&&(e(0,`
`),c(1,"app-empty-state",17),e(2,`
`)),o&2){let a=d();g(),m("title",a.q?"No campaigns match your search":"No campaigns found")}}function le(o,r){if(o&1){let a=E();e(0,`
            `),n(1,"tr",24),e(2,`
                `),n(3,"td",25),e(4),i(),e(5,`
                `),n(6,"td",26),c(7,"app-status-pill",27),i(),e(8,`
                `),n(9,"td",26),c(10,"app-status-pill",28),i(),e(11,`
                `),n(12,"td",29),e(13),i(),e(14,`
                `),n(15,"td",29),e(16),i(),e(17,`
                `),n(18,"td",30),e(19),i(),e(20,`
                `),n(21,"td",26),e(22,`
                    `),n(23,"div",31),e(24,`
                        `),n(25,"a",32),p(26,8),i(),e(27,`
                        `),n(28,"button",33),P("click",function(){let _=S(a).$implicit,l=d(2);return I(l.requestDelete(_.campaignId))}),p(29,9),i(),e(30,`
                    `),i(),e(31,`
                `),i(),e(32,`
            `),i(),e(33,`
            `)}if(o&2){let a=r.$implicit,t=d(2);g(4),C(a.campaignName),g(3),m("value",a.campaignType||"\u2013"),g(3),m("value",a.status||"\u2013")("tone",t.statusTone(a.status)),g(3),C(a.startDate),g(3),C(a.endDate),g(2),m("title",a.campaignId),g(),C(t.shortId(a.campaignId)),g(6),m("routerLink",q(9,ie,a.campaignId))}}function se(o,r){if(o&1){let a=E();e(0,`
`),n(1,"div",18),e(2,`
    `),n(3,"table",19),e(4,`
        `),n(5,"caption",20),p(6,0),i(),e(7,`
        `),n(8,"thead"),e(9,`
            `),n(10,"tr",21),e(11,`
                `),n(12,"th",22),p(13,1),i(),e(14,`
                `),n(15,"th",22),p(16,2),i(),e(17,`
                `),n(18,"th",22),p(19,3),i(),e(20,`
                `),n(21,"th",22),p(22,4),i(),e(23,`
                `),n(24,"th",22),p(25,5),i(),e(26,`
                `),n(27,"th",22),p(28,6),i(),e(29,`
                `),n(30,"th")(31,"span",20),p(32,7),i()(),e(33,`
            `),i(),e(34,`
        `),i(),e(35,`
        `),n(36,"tbody"),e(37,`
            `),X(38,le,34,11,null,null,ae),i(),e(40,`
    `),i(),e(41,`
`),i(),e(42,`
`),n(43,"app-pagination",23),P("pageChange",function(_){S(a);let l=d();return I(l.onPage(_))})("pageSizeChange",function(_){S(a);let l=d();return I(l.onPageSize(_))}),e(44,"campaigns"),i(),e(45,`
`)}if(o&2){let a=d();g(38),D(a.campaigns),g(5),m("page",a.page)("totalPages",a.totalPages)("totalElements",a.totalElements??0)("pageSize",a.pageSize)}}var ue=(()=>{let r=class r{constructor(){this.campaignService=N(K),this.errorHandler=N(U),this.router=N(j),this.campaigns=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(t,_){return{deleted:$localize`:@@campaign.delete.success:Campaign was removed successfully.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof Q&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.campaignService.getCampaignsPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:t=>{this.campaigns=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onSearch(t){this.q=t,this.page=0,this.loadData()}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}statusTone(t){switch((t||"").toLowerCase()){case"active":return"emerald";case"planned":return"sky";case"paused":return"amber";case"completed":return"violet";default:return"zinc"}}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.campaignService.deleteCampaign(t).subscribe({next:()=>this.router.navigate(["/campaigns"],{state:{msgInfo:this.getMessage("deleted")}}),error:_=>this.errorHandler.handleServerError(_.error)}))}};r.\u0275fac=function(_){return new(_||r)},r.\u0275cmp=w({type:r,selectors:[["app-campaign-list"]],viewQuery:function(_,l){if(_&1&&k(u,5),_&2){let A;V(A=H())&&(l.confirmDialog=A.first)}},decls:12,vars:2,consts:()=>{let t;t=$localize`:@@campaign.list.headline:Campaigns`;let _;_=$localize`:@@campaign.list.count:campaigns total`;let l;l=$localize`:@@campaign.list.createNew:Create new Campaign`;let A;A=$localize`:@@campaign.search:Search name, type, status…`;let M;M=$localize`:@@delete.title:Delete this record?`;let T;T=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let f;f=$localize`:@@campaign.list.emptyHint:Launch the first campaign to get started.`;let h;h=$localize`:@@campaign.list.createNew:Create new Campaign`;let G;G=$localize`:@@campaign.list.caption:Campaigns with type and status`;let x;x=$localize`:@@campaign.campaignName.label:Campaign Name`;let L;L=$localize`:@@campaign.campaignType.label:Campaign Type`;let $;$=$localize`:@@campaign.status.label:Status`;let R;R=$localize`:@@campaign.startDate.label:Start Date`;let O;O=$localize`:@@campaign.endDate.label:End Date`;let y;y=$localize`:@@campaign.campaignId.label:Id`;let b;b=$localize`:@@list.actions:Actions`;let v;v=$localize`:@@campaign.list.edit:Edit`;let z;return z=$localize`:@@campaign.list.delete:Delete`,[G,x,L,$,R,O,y,b,v,z,["title",t,"countLabel",_,"createLink","/campaigns/add","createLabel",l,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",A,1,"w-full","max-w-xs",3,"search"],["title",M,"message",T,3,"confirmed"],["aria-busy","true","aria-label","Loading campaigns",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",f,"actionLink","/campaigns/add","actionLabel",h,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3"],["tone","zinc",3,"value"],[3,"value","tone"],[1,"p-3","text-zinc-600"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(_,l){_&1&&(c(0,"app-page-header",10),e(1,`

`),n(2,"div",11),e(3,`
    `),n(4,"app-search-input",12),P("search",function(M){return l.onSearch(M)}),i(),e(5,`
`),i(),e(6,`

`),B(7,_e,13,0)(8,oe,3,1)(9,se,46,4),n(10,"app-confirm-dialog",13),P("confirmed",function(){return l.deleteConfirmed()}),i(),e(11,`
`)),_&2&&(m("count",l.totalElements),g(7),W(l.loading?7:l.campaigns.length===0?8:9))},dependencies:[F,J,Y,Z,u,ee,te,ne],encapsulation:2});let o=r;return o})();export{ue as CampaignListComponent};
