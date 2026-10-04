import{a as ie}from"./chunk-MJMEMENI.js";import{a as Y}from"./chunk-WHJIKAVQ.js";import{a as te}from"./chunk-LEL7KSWT.js";import{a as Z}from"./chunk-NBL5VNLX.js";import{a as ee}from"./chunk-UKTKB755.js";import{a as ne}from"./chunk-BEKISOOI.js";import{a as Q}from"./chunk-343L76WT.js";import{a as V}from"./chunk-XL6NX4LN.js";import{a as oe}from"./chunk-B7KASKPV.js";import"./chunk-3UDFUMK6.js";import{a as K}from"./chunk-IH37UQTX.js";import"./chunk-X534G2PA.js";import{a as q}from"./chunk-VAL26HVG.js";import{Ea as e,Fa as S,I as w,N as E,P as c,U as M,Va as J,Y as L,Ya as f,da as B,ea as G,g as m,ga as W,ha as X,ia as g,ja as t,k as z,ka as n,la as P,ma as F,mb as x,n as d,na as D,oa as j,qa as U,ra as s,z as p}from"./chunk-OJ74WIM5.js";var le=(()=>{let i=class i{};i.\u0275fac=function(l){return new(l||i)},i.\u0275cmp=M({type:i,selectors:[["app-floating-action-button"]],inputs:{href:"href"},decls:4,vars:1,consts:[["target","_blank","rel","noopener noreferrer","aria-label","View Source Code",1,"fixed","bottom-4","right-4","bg-gray-800","text-white","p-4","rounded-full","shadow-lg","hover:bg-gray-700","transition-colors","flex","items-center","justify-center",3,"href"],["src","assets/github.svg","alt","GitHub","width","24","height","24",1,"dark:invert"]],template:function(l,_){l&1&&(F(0,"a",0),e(1,`
  `),j(2,"img",1),e(3,`
`),D()),l&2&&U("href",_.href,E)},styles:[".fixed[_ngcontent-%COMP%]{position:fixed}.bottom-4[_ngcontent-%COMP%]{bottom:1rem}.right-4[_ngcontent-%COMP%]{right:1rem}.bg-gray-800[_ngcontent-%COMP%]{background-color:#2d3748}.text-white[_ngcontent-%COMP%]{color:#fff}.p-4[_ngcontent-%COMP%]{padding:1rem}.rounded-full[_ngcontent-%COMP%]{border-radius:9999px}.shadow-lg[_ngcontent-%COMP%]{box-shadow:0 10px 15px -3px #0000001a,0 4px 6px -2px #0000000d}.hover\\:bg-gray-700[_ngcontent-%COMP%]:hover{background-color:#4a5568}.transition-colors[_ngcontent-%COMP%]{transition-property:background-color,border-color,color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.flex[_ngcontent-%COMP%]{display:flex}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-center[_ngcontent-%COMP%]{justify-content:center}.dark\\:invert[_ngcontent-%COMP%]{filter:invert(1)}"]});let o=i;return o})();var se=(()=>{let i=class i{};i.\u0275fac=function(l){return new(l||i)},i.\u0275cmp=M({type:i,selectors:[["app-nav-card"]],inputs:{link:"link",icon:"icon",title:"title"},decls:8,vars:4,consts:[[1,"flex","flex-col","items-center","justify-center","p-4","border","border-gray-300","rounded","hover:bg-gray-100",3,"routerLink"],[1,"h-8","w-8","mb-2",3,"src","alt"]],template:function(l,_){l&1&&(t(0,"a",0),e(1,`
    `),P(2,"img",1),e(3,`
    `),t(4,"span"),e(5),n(),e(6,`
`),n(),e(7,`
`)),l&2&&(g("routerLink",_.link),c(2),g("src",_.icon,E)("alt",_.title),c(3),S(_.title))},dependencies:[f,x],encapsulation:2});let o=i;return o})();var ae=(o,i)=>i.link;function _e(o,i){if(o&1&&(e(0,`
            `),t(1,"a",46),e(2,`
                `),t(3,"span",47),e(4),n(),e(5,`
                `),t(6,"span",48),e(7),n(),e(8,`
            `),n(),e(9,`
        `)),o&2){let u=i.$implicit;c(),g("routerLink",u.link),c(3),S(u.count??"\u2013"),c(3),S(u.title)}}function ce(o,i){o&1&&(e(0,`
`),t(1,"section",44),e(2,`
    `),t(3,"div",45),e(4,`
        `),W(5,_e,10,3,null,null,ae),n(),e(7,`
`),n(),e(8,`
`)),o&2&&(c(5),X(i))}function me(o,i){if(o&1&&P(0,"app-nav-card",49),o&2){let u=i.$implicit;g("link",u.link)("icon",u.icon)("title",u.title)}}var ze=(()=>{let i=class i{constructor(){this.navLinks=[{link:"/users",icon:"assets/users.svg",title:"Users"},{link:"/accounts",icon:"assets/accounts.svg",title:"Accounts"},{link:"/contacts",icon:"assets/contacts.svg",title:"Contacts"},{link:"/opportunities",icon:"assets/opportunities.svg",title:"Opportunities"},{link:"/activities",icon:"assets/activities.svg",title:"Activities"},{link:"/activityRelations",icon:"assets/activity_relations.svg",title:"Activity Relations"},{link:"/memos",icon:"assets/memos.svg",title:"Memos"},{link:"/campaigns",icon:"assets/campaigns.svg",title:"Campaigns"},{link:"/products",icon:"assets/products.svg",title:"Products"}],this.environment=q,this.stats=w(null),this.userService=p(oe),this.accountService=p(K),this.contactService=p(ee),this.opportunityService=p(ne),this.activityService=p(Q),this.activityRelationService=p(Y),this.memoService=p(te),this.campaignService=p(Z),this.productService=p(ie)}ngOnInit(){z({users:this.userService.countUsers().pipe(d(()=>m(null))),accounts:this.accountService.countAccounts().pipe(d(()=>m(null))),contacts:this.contactService.countContacts().pipe(d(()=>m(null))),opportunities:this.opportunityService.countOpportunities().pipe(d(()=>m(null))),activities:this.activityService.countActivities().pipe(d(()=>m(null))),activityRelations:this.activityRelationService.countActivityRelations().pipe(d(()=>m(null))),memos:this.memoService.countMemoes().pipe(d(()=>m(null))),campaigns:this.campaignService.countCampaigns().pipe(d(()=>m(null))),products:this.productService.countProducts().pipe(d(()=>m(null)))}).subscribe(r=>{Object.values(r).every(l=>l===null)||this.stats.set([{link:"/users",title:$localize`:@@user.list.headline:Users`,count:r.users},{link:"/accounts",title:$localize`:@@account.list.headline:Accounts`,count:r.accounts},{link:"/contacts",title:$localize`:@@contact.list.headline:Contacts`,count:r.contacts},{link:"/opportunities",title:$localize`:@@opportunity.list.headline:Opportunities`,count:r.opportunities},{link:"/activities",title:$localize`:@@activity.list.headline:Activities`,count:r.activities},{link:"/activityRelations",title:$localize`:@@activityRelation.list.headline:Activity Relations`,count:r.activityRelations},{link:"/memos",title:$localize`:@@memo.list.headline:Memoes`,count:r.memos},{link:"/campaigns",title:$localize`:@@campaign.list.headline:Campaigns`,count:r.campaigns},{link:"/products",title:$localize`:@@product.list.headline:Products`,count:r.products}])})}};i.\u0275fac=function(l){return new(l||i)},i.\u0275cmp=M({type:i,selectors:[["app-home"]],decls:136,vars:5,consts:()=>{let r;r=$localize`:@@home.hero.kicker:Full-stack demo · Spring Boot + Angular + Postgres`;let l;l=$localize`:@@home.index.headline:CRM Demo`;let _;_=$localize`:@@home.hero.lede:Manage accounts, contacts, opportunities and campaigns end to end — a typed REST API with validated Angular forms, running on free-tier cloud infrastructure.`;let h;h=$localize`:@@home.hero.explore:Explore entities`;let O;O=$localize`:@@home.hero.swagger:API Docs`;let A;A=$localize`:@@home.hero.sleepNote:The free-tier backend sleeps after ~15 min idle — the first request can take up to a minute to wake it.`;let C;C=$localize`:@@home.demo.title:Try it in 60 seconds`;let N;N=$localize`:@@home.demo.lede:A guided path through the demo with realistic sample data.`;let v;v=$localize`:@@home.demo.step1:Open Accounts and pick TechCorp Solutions.`;let T;T=$localize`:@@home.demo.step2:Check its contacts, like CTO Sarah Johnson.`;let $;$=$localize`:@@home.demo.step3:Follow the open opportunity in negotiation stage.`;let y;y=$localize`:@@home.demo.step4:Create a memo — deletes of referenced rows are blocked with a clear reason.`;let k;k=$localize`:@@home.index.exploreEntities:Test operations on the entities:`;let R;R=$localize`:@@home.entities.lede:Full create, read, update and delete on all nine domain objects.`;let b;b=$localize`:@@home.stack.title:How it runs`;let I;I=$localize`:@@home.stack.lede:One repository, three free-tier hosts, migrations included.`;let H;return H=$localize`:@@home.stack.source:Source on GitHub`,[r,l,_,h,O,A,C,N,v,T,$,y,k,R,b,I,H,[1,"overflow-hidden","rounded-2xl","bg-zinc-950","px-6","py-10","text-zinc-100","md:px-10","md:py-14","mb-12"],[1,"font-mono","text-xs","uppercase","tracking-widest","text-violet-400","mb-3"],[1,"text-3xl","md:text-5xl","font-bold","tracking-tight","mb-4"],[1,"max-w-2xl","text-lg","leading-relaxed","text-zinc-400","mb-6"],[1,"flex","flex-wrap","items-center","gap-3"],["href","#entities",1,"inline-block","rounded-full","bg-violet-600","px-5","py-2.5","font-medium","text-white","hover:bg-violet-500"],["target","_blank","rel","noreferrer",1,"inline-block","rounded-full","border","border-white/20","px-5","py-2.5","font-medium","text-zinc-100","hover:border-violet-400","hover:text-white",3,"href"],[1,"inline-flex","items-center","rounded-full","border","border-white/10","bg-white/5","px-4","py-2"],[3,"compact","onDark"],[1,"mt-4","text-sm","text-zinc-400"],[1,"mb-12","rounded-2xl","border","border-zinc-200","bg-white","p-6","md:p-8"],[1,"text-2xl","font-semibold","tracking-tight","mb-2"],[1,"text-zinc-600","mb-5"],[1,"grid","gap-4","md:grid-cols-4"],[1,"rounded-xl","bg-zinc-50","p-4"],[1,"font-mono","text-sm","text-brand-600"],[1,"mt-1","font-medium"],["id","entities",1,"mb-12","scroll-mt-24"],[1,"grid","grid-cols-1","sm:grid-cols-2","md:grid-cols-3","lg:grid-cols-4","gap-4"],[3,"link","icon","title",4,"ngFor","ngForOf"],[1,"flex","flex-wrap","items-center","gap-2","font-mono","text-sm"],[1,"rounded-full","bg-zinc-950","px-3","py-1","text-zinc-100"],["aria-hidden","true",1,"text-zinc-400"],[1,"mt-3","flex","flex-wrap","items-center","gap-2","text-sm"],[1,"rounded-full","bg-zinc-100","px-3","py-1","text-zinc-600"],["href","https://github.com/BachiDev/crm-demo","target","_blank","rel","noreferrer",1,"rounded-full","bg-brand-50","px-3","py-1","font-medium","text-brand-700","hover:bg-brand-100"],["href","https://github.com/BachiDev/crm-demo"],["aria-label","Record counts",1,"mb-12"],[1,"grid","grid-cols-3","gap-3","sm:grid-cols-3","lg:grid-cols-9"],[1,"rounded-xl","border","border-zinc-200","bg-white","px-3","py-3","text-center","hover:border-brand-500","hover:shadow-sm",3,"routerLink"],[1,"block","font-mono","text-xl","font-medium","text-zinc-900"],[1,"block","truncate","text-xs","text-zinc-500"],[3,"link","icon","title"]]},template:function(l,_){if(l&1&&(t(0,"section",17),e(1,`
    `),t(2,"p",18),s(3,0),n(),e(4,`
    `),t(5,"h1",19),s(6,1),n(),e(7,`
    `),t(8,"p",20),s(9,2),n(),e(10,`
    `),t(11,"div",21),e(12,`
        `),t(13,"a",22),s(14,3),n(),e(15,`
        `),t(16,"a",23),s(17,4),n(),e(18,`
        `),t(19,"span",24),e(20,`
            `),P(21,"app-backend-status",25),e(22,`
        `),n(),e(23,`
    `),n(),e(24,`
    `),t(25,"p",26),s(26,5),n(),e(27,`
`),n(),e(28,`

`),B(29,ce,9,0),t(30,"section",27),e(31,`
    `),t(32,"h2",28),s(33,6),n(),e(34,`
    `),t(35,"p",29),s(36,7),n(),e(37,`
    `),t(38,"ol",30),e(39,`
        `),t(40,"li",31),e(41,`
            `),t(42,"span",32),e(43,"01"),n(),e(44,`
            `),t(45,"p",33),s(46,8),n(),e(47,`
        `),n(),e(48,`
        `),t(49,"li",31),e(50,`
            `),t(51,"span",32),e(52,"02"),n(),e(53,`
            `),t(54,"p",33),s(55,9),n(),e(56,`
        `),n(),e(57,`
        `),t(58,"li",31),e(59,`
            `),t(60,"span",32),e(61,"03"),n(),e(62,`
            `),t(63,"p",33),s(64,10),n(),e(65,`
        `),n(),e(66,`
        `),t(67,"li",31),e(68,`
            `),t(69,"span",32),e(70,"04"),n(),e(71,`
            `),t(72,"p",33),s(73,11),n(),e(74,`
        `),n(),e(75,`
    `),n(),e(76,`
`),n(),e(77,`

`),t(78,"section",34),e(79,`
    `),t(80,"h2",28),s(81,12),n(),e(82,`
    `),t(83,"p",29),s(84,13),n(),e(85,`
    `),t(86,"div",35),e(87,`
        `),L(88,me,1,3,"app-nav-card",36),e(89,`
    `),n(),e(90,`
`),n(),e(91,`

`),t(92,"section",27),e(93,`
    `),t(94,"h2",28),s(95,14),n(),e(96,`
    `),t(97,"p",29),s(98,15),n(),e(99,`
    `),t(100,"div",37),e(101,`
        `),t(102,"span",38),e(103,"Angular 20"),n(),e(104,`
        `),t(105,"span",39),e(106,"\u2192"),n(),e(107,`
        `),t(108,"span",38),e(109,"Spring Boot 3.5"),n(),e(110,`
        `),t(111,"span",39),e(112,"\u2192"),n(),e(113,`
        `),t(114,"span",38),e(115,"Neon Postgres"),n(),e(116,`
    `),n(),e(117,`
    `),t(118,"div",40),e(119,`
        `),t(120,"span",41),e(121,"GitHub Pages"),n(),e(122,`
        `),t(123,"span",41),e(124,"Render"),n(),e(125,`
        `),t(126,"span",41),e(127,"Flyway migrations"),n(),e(128,`
        `),t(129,"a",42),s(130,16),n(),e(131,`
    `),n(),e(132,`
`),n(),e(133,`

`),P(134,"app-floating-action-button",43),e(135,`
`)),l&2){let h;c(16),g("href",_.environment.apiPath+"/swagger-ui.html",E),c(5),g("compact",!1)("onDark",!0),c(8),G((h=_.stats())?29:-1,h),c(59),g("ngForOf",_.navLinks)}},dependencies:[f,J,x,V,le,se],styles:[".text-gray[_ngcontent-%COMP%]{color:gray}.text-yellow[_ngcontent-%COMP%]{color:orange}.text-green[_ngcontent-%COMP%]{color:green}"]});let o=i;return o})();export{ze as HomeComponent};
