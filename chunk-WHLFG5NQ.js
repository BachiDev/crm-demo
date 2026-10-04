import{a as D}from"./chunk-UCZIZDXU.js";import{a as z}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A as x,Ca as e,Da as A,Ja as v,N as g,S as f,Va as w,ba as G,ca as $,ea as b,eb as B,fa as L,ga as O,ha as t,ia as n,ib as W,ja as R,jb as X,na as h,pa as _,sa as y,ua as d,x as c,z as u}from"./chunk-JRLO7FLJ.js";var k=a=>["/campaigns/edit",a],F=(a,l)=>l.campaignId;function H(a,l){a&1&&(e(0,`
`),t(1,"div"),_(2,2),n(),e(3,`
`))}function V(a,l){if(a&1){let o=h();e(0,`
            `),t(1,"tr",19),e(2,`
                `),t(3,"td",20),e(4),n(),e(5,`
                `),t(6,"td",20),e(7),n(),e(8,`
                `),t(9,"td",20),e(10),n(),e(11,`
                `),t(12,"td",20),e(13),n(),e(14,`
                `),t(15,"td",20),e(16),n(),e(17,`
                `),t(18,"td",20),e(19),n(),e(20,`
                `),t(21,"td",20),e(22),n(),e(23,`
                `),t(24,"td",20),e(25,`
                    `),t(26,"div",21),e(27,`
                        `),t(28,"a",22),_(29,10),n(),e(30,`
                        `),t(31,"button",23),y("click",function(){let r=u(o).$implicit,s=d(2);return x(s.confirmDelete(r.campaignId))}),_(32,11),n(),e(33,`
                    `),n(),e(34,`
                `),n(),e(35,`
            `),n(),e(36,`
            `)}if(a&2){let o=l.$implicit;g(4),A(o.campaignId),g(3),A(o.campaignName),g(3),A(o.campaignType),g(3),A(o.startDate),g(3),A(o.endDate),g(3),A(o.status),g(3),A(o.owner),g(6),O("routerLink",v(8,k,o.campaignId))}}function j(a,l){if(a&1&&(e(0,`
`),t(1,"div",15),e(2,`
    `),t(3,"table",16),e(4,`
        `),t(5,"thead"),e(6,`
            `),t(7,"tr"),e(8,`
                `),t(9,"th",17),_(10,3),n(),e(11,`
                `),t(12,"th",17),_(13,4),n(),e(14,`
                `),t(15,"th",17),_(16,5),n(),e(17,`
                `),t(18,"th",17),_(19,6),n(),e(20,`
                `),t(21,"th",17),_(22,7),n(),e(23,`
                `),t(24,"th",17),_(25,8),n(),e(26,`
                `),t(27,"th",17),_(28,9),n(),e(29,`
                `),R(30,"th"),e(31,`
            `),n(),e(32,`
        `),n(),e(33,`
        `),t(34,"tbody",18),e(35,`
            `),b(36,V,37,10,null,null,F),n(),e(38,`
    `),n(),e(39,`
`),n(),e(40,`
`)),a&2){let o=d();g(36),L(o.campaigns)}}var ee=(()=>{let l=class l{constructor(){this.campaignService=c(D),this.errorHandler=c(z),this.router=c(W)}getMessage(i,r){return{confirm:$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,deleted:$localize`:@@campaign.delete.success:Campaign was removed successfully.`}[i]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(i=>{i instanceof B&&this.loadData()})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.campaignService.getAllCampaigns().subscribe({next:i=>this.campaigns=i,error:i=>this.errorHandler.handleServerError(i.error)})}confirmDelete(i){confirm(this.getMessage("confirm"))&&this.campaignService.deleteCampaign(i).subscribe({next:()=>this.router.navigate(["/campaigns"],{state:{msgInfo:this.getMessage("deleted")}}),error:r=>this.errorHandler.handleServerError(r.error)})}};l.\u0275fac=function(r){return new(r||l)},l.\u0275cmp=f({type:l,selectors:[["app-campaign-list"]],decls:14,vars:1,consts:()=>{let i;i=$localize`:@@campaign.list.headline:Campaigns`;let r;r=$localize`:@@campaign.list.createNew:Create new Campaign`;let s;s=$localize`:@@campaign.list.empty:No Campaigns could be found.`;let P;P=$localize`:@@campaign.campaignId.label:Campaign Id`;let p;p=$localize`:@@campaign.campaignName.label:Campaign Name`;let M;M=$localize`:@@campaign.campaignType.label:Campaign Type`;let C;C=$localize`:@@campaign.startDate.label:Start Date`;let N;N=$localize`:@@campaign.endDate.label:End Date`;let I;I=$localize`:@@campaign.status.label:Status`;let S;S=$localize`:@@campaign.owner.label:Owner`;let E;E=$localize`:@@campaign.list.edit:Edit`;let T;return T=$localize`:@@campaign.list.delete:Delete`,[i,r,s,P,p,M,C,N,I,S,E,T,[1,"flex","flex-wrap","mb-6"],[1,"grow","text-3xl","md:text-4xl","font-medium","mb-2"],["routerLink","/campaigns/add",1,"inline-block","text-white","bg-blue-600","hover:bg-blue-700","focus:ring-blue-300","focus:ring-4","rounded","px-5","py-2"],[1,"overflow-x-auto"],[1,"w-full"],["scope","col",1,"text-left","p-2"],[1,"border-t-2","border-black"],[1,"odd:bg-gray-100"],[1,"p-2"],[1,"float-right","whitespace-nowrap"],[1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm",3,"routerLink"],["type","button",1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm","cursor-pointer",3,"click"]]},template:function(r,s){r&1&&(t(0,"div",12),e(1,`
    `),t(2,"h1",13),_(3,0),n(),e(4,`
    `),t(5,"div"),e(6,`
        `),t(7,"a",14),_(8,1),n(),e(9,`
    `),n(),e(10,`
`),n(),e(11,`
`),G(12,H,4,0)(13,j,41,0)),r&2&&(g(12),$(!s.campaigns||s.campaigns.length===0?12:13))},dependencies:[w,X],encapsulation:2});let a=l;return a})();export{ee as CampaignListComponent};
