import{a as te}from"./chunk-DXWYXILA.js";import{a as J}from"./chunk-JUII5Q5X.js";import{a as Z}from"./chunk-X3L7M5BK.js";import{a as Y}from"./chunk-QFNED4EF.js";import{a as Q}from"./chunk-MHDKPBRR.js";import{a as ee}from"./chunk-RHBWLHJJ.js";import{a as q}from"./chunk-FUKDXIDS.js";import{a as j}from"./chunk-DERZBTVX.js";import{a as ne}from"./chunk-2WPLWLHR.js";import"./chunk-CYGIYZWD.js";import{a as U}from"./chunk-DGCEIQKT.js";import"./chunk-WXSKCASI.js";import{a as V}from"./chunk-VAL26HVG.js";import{D as P,Da as e,Ea as f,I as G,N as S,P as s,Pa as X,U as h,Wa as K,ba as M,ca as L,da as F,fa as y,g as E,ga as v,ha as k,ia as t,ja as n,k as B,ka as C,kb as D,la as m,ma as d,n as x,na as c,pa as W,qa as _,va as O,z as g}from"./chunk-ZAB2ACMA.js";var oe=(()=>{let i=class i{};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=h({type:i,selectors:[["app-floating-action-button"]],inputs:{href:"href"},decls:4,vars:1,consts:[["target","_blank","rel","noopener noreferrer","aria-label","View Source Code",1,"fixed","bottom-4","right-4","bg-gray-800","text-white","p-4","rounded-full","shadow-lg","hover:bg-gray-700","transition-colors","flex","items-center","justify-center",3,"href"],["src","assets/github.svg","alt","GitHub","width","24","height","24",1,"dark:invert"]],template:function(r,p){r&1&&(m(0,"a",0),e(1,`
  `),c(2,"img",1),e(3,`
`),d()),r&2&&W("href",p.href,S)},styles:[".fixed[_ngcontent-%COMP%]{position:fixed}.bottom-4[_ngcontent-%COMP%]{bottom:1rem}.right-4[_ngcontent-%COMP%]{right:1rem}.bg-gray-800[_ngcontent-%COMP%]{background-color:#2d3748}.text-white[_ngcontent-%COMP%]{color:#fff}.p-4[_ngcontent-%COMP%]{padding:1rem}.rounded-full[_ngcontent-%COMP%]{border-radius:9999px}.shadow-lg[_ngcontent-%COMP%]{box-shadow:0 10px 15px -3px #0000001a,0 4px 6px -2px #0000000d}.hover\\:bg-gray-700[_ngcontent-%COMP%]:hover{background-color:#4a5568}.transition-colors[_ngcontent-%COMP%]{transition-property:background-color,border-color,color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.flex[_ngcontent-%COMP%]{display:flex}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-center[_ngcontent-%COMP%]{justify-content:center}.dark\\:invert[_ngcontent-%COMP%]{filter:invert(1)}"]});let o=i;return o})();var re=(o,i)=>i.name;function le(o,i){if(o&1&&(e(0,`
              `),P(),m(1,"text",24),e(2),d(),e(3,`
            `)),o&2){let a=O(),l=a.$implicit,r=a.$index,p=O().$implicit;s(),M("x",p.x+208)("y",p.y+54+r*22)("fill",l.kind==="PK"?"#7c3aed":"#0284c7"),s(),f(l.kind)}}function se(o,i){if(o&1&&(e(0,`
            `),P(),m(1,"text",23),e(2),d(),e(3,`
            `),L(4,le,4,4)),o&2){let a=i.$implicit,l=i.$index,r=O().$implicit;s(),M("x",r.x+12)("y",r.y+54+l*22),s(),f(a.name),s(2),F(a.kind?4:-1)}}function me(o,i){if(o&1&&(e(0,`
        `),P(),m(1,"g"),e(2,`
          `),c(3,"rect",20),e(4,`
          `),m(5,"text",21),e(6),d(),e(7,`
          `),c(8,"line",22),e(9,`
          `),y(10,se,5,4,null,null,re),d(),e(12,`
      `)),o&2){let a=i.$implicit;s(3),M("x",a.x)("y",a.y)("height",a.h),s(2),M("x",a.x+12)("y",a.y+22),s(),f(a.name),s(2),M("x1",a.x+12)("x2",a.x+208)("y1",a.y+32)("y2",a.y+32),s(2),v(a.fields)}}var ae=(()=>{let i=class i{constructor(){this.tables=[{name:"users",x:30,y:20,h:140,fields:[{name:"user_id",kind:"PK"},{name:"username",kind:""},{name:"email",kind:""}]},{name:"accounts",x:370,y:20,h:140,fields:[{name:"account_id",kind:"PK"},{name:"account_name",kind:""},{name:"owner_id",kind:"FK"}]},{name:"contacts",x:710,y:20,h:140,fields:[{name:"contact_id",kind:"PK"},{name:"first_name",kind:""},{name:"account_id",kind:"FK"},{name:"owner_id",kind:"FK"}]},{name:"campaigns",x:30,y:200,h:140,fields:[{name:"campaign_id",kind:"PK"},{name:"campaign_name",kind:""},{name:"owner_id",kind:"FK"}]},{name:"opportunities",x:370,y:200,h:140,fields:[{name:"opportunity_id",kind:"PK"},{name:"opportunity_name",kind:""},{name:"stage",kind:""},{name:"account_id",kind:"FK"}]},{name:"activities",x:710,y:200,h:140,fields:[{name:"activity_id",kind:"PK"},{name:"subject",kind:""},{name:"owner_id",kind:"FK"}]},{name:"products",x:30,y:380,h:140,fields:[{name:"product_id",kind:"PK"},{name:"product_name",kind:""},{name:"sku",kind:""}]},{name:"memos",x:370,y:380,h:140,fields:[{name:"memo_id",kind:"PK"},{name:"memo_text",kind:""},{name:"user_id",kind:"FK"}]},{name:"activity_relations",x:710,y:380,h:164,fields:[{name:"id",kind:"PK"},{name:"activity_id",kind:"FK"},{name:"account_id",kind:"FK"},{name:"contact_id",kind:"FK"},{name:"opportunity_id",kind:"FK"}]}]}};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=h({type:i,selectors:[["app-er-diagram"]],decls:60,vars:0,consts:[["viewBox","0 0 960 600","role","img","aria-label","Entity-relationship diagram: users own accounts, contacts, opportunities, activities, memos and campaigns; accounts have contacts and opportunities; contacts have opportunities; activities, accounts, contacts and opportunities link through activity relations.",1,"h-auto","w-full"],["id","crow","viewBox","0 0 10 8","refX","9","refY","4","markerWidth","9","markerHeight","9","orient","auto-start-reverse"],["d","M0,0 L9,4 L0,8 M4.5,0 L4.5,8","fill","none","stroke","#8b5cf6","stroke-width","1.4"],["fill","none","stroke","#a78bfa","stroke-width","1.5"],["d","M250,90 H370","marker-end","url(#crow)"],["d","M590,90 H710","marker-end","url(#crow)"],["d","M120,160 V200","marker-end","url(#crow)"],["d","M480,160 V200","marker-end","url(#crow)"],["d","M590,110 H660 V270 H710","marker-end","url(#crow)"],["d","M140,160 V180 H480 V200","marker-end","url(#crow)"],["d","M800,160 V180 H540 V200","marker-end","url(#crow)"],["d","M540,340 V360 H820 V380","marker-end","url(#crow)"],["d","M820,340 V380","marker-end","url(#crow)"],["font-size","11.5","font-family","ui-monospace, monospace","fill","#52525b"],["x1","30","y1","566","x2","90","y2","566","stroke","#a78bfa","stroke-width","1.5","marker-end","url(#crow)"],["x","100","y","570"],["x","230","y","570","font-weight","700","fill","#7c3aed"],["x","260","y","570"],["x","380","y","570","font-weight","700","fill","#0284c7"],["x","410","y","570"],["width","220","rx","10","fill","#ffffff","stroke","#e4e4e7"],["font-size","12.5","font-weight","700","fill","#6d28d9","font-family","ui-monospace, monospace",2,"text-transform","uppercase","letter-spacing","0.04em"],["stroke","#f4f4f5"],["font-size","11.5","fill","#3f3f46","font-family","ui-monospace, monospace"],["text-anchor","end","font-size","10","font-weight","700","font-family","ui-monospace, monospace"]],template:function(r,p){r&1&&(e(0,`
    `),P(),m(1,"svg",0),e(2,`
      `),m(3,"title"),e(4,"CRM demo schema"),d(),e(5,`
      `),m(6,"defs"),e(7,`
        `),m(8,"marker",1),e(9,`
          `),c(10,"path",2),e(11,`
        `),d(),e(12,`
      `),d(),e(13,`

      `),e(14,`
      `),m(15,"g",3),e(16,`
        `),c(17,"path",4),e(18,`
        `),c(19,"path",5),e(20,`
        `),c(21,"path",6),e(22,`
        `),c(23,"path",7),e(24,`
        `),c(25,"path",8),e(26,`
        `),c(27,"path",9),e(28,`
        `),c(29,"path",10),e(30,`
        `),c(31,"path",11),e(32,`
        `),c(33,"path",12),e(34,`
      `),d(),e(35,`

      `),e(36,`
      `),y(37,me,13,10,null,null,re),m(39,"g",13),e(40,`
        `),c(41,"line",14),e(42,`
        `),m(43,"text",15),e(44,"one-to-many"),d(),e(45,`
        `),m(46,"text",16),e(47,"PK"),d(),e(48,`
        `),m(49,"text",17),e(50,"primary key"),d(),e(51,`
        `),m(52,"text",18),e(53,"FK"),d(),e(54,`
        `),m(55,"text",19),e(56,"foreign key"),d(),e(57,`
      `),d(),e(58,`
    `),d(),e(59,`
  `)),r&2&&(s(37),v(p.tables))},encapsulation:2,changeDetection:0});let o=i;return o})();var de=(o,i)=>i.link;function ce(o,i){if(o&1&&(e(0,`
            `),t(1,"a",35),e(2,`
                `),t(3,"span",36),e(4,`
                    `),C(5,"img",37),e(6,`
                `),n(),e(7,`
                `),t(8,"span",38),e(9,`
                    `),t(10,"span",39),e(11),n(),e(12,`
                    `),t(13,"span",40),e(14),n(),e(15,`
                `),n(),e(16,`
                `),t(17,"span",41),e(18,"\u2192"),n(),e(19,`
            `),n(),e(20,`
        `)),o&2){let a=i.$implicit;s(),k("routerLink",a.link),s(4),k("src",a.icon,S),s(6),f(a.title),s(3),f(a.count===null?"\u2026":a.count+" rows")}}var we=(()=>{let i=class i{constructor(){this.entities=[{key:"users",link:"/users",icon:"assets/users.svg",title:$localize`:@@user.list.headline:Users`},{link:"/accounts",icon:"assets/accounts.svg",title:$localize`:@@account.list.headline:Accounts`,key:"accounts"},{link:"/contacts",icon:"assets/contacts.svg",title:$localize`:@@contact.list.headline:Contacts`,key:"contacts"},{link:"/opportunities",icon:"assets/opportunities.svg",title:$localize`:@@opportunity.list.headline:Opportunities`,key:"opportunities"},{link:"/activities",icon:"assets/activities.svg",title:$localize`:@@activity.list.headline:Activities`,key:"activities"},{link:"/activityRelations",icon:"assets/activity_relations.svg",title:$localize`:@@activityRelation.list.headline:Activity Relations`,key:"activityRelations"},{link:"/memos",icon:"assets/memos.svg",title:$localize`:@@memo.list.headline:Memoes`,key:"memos"},{link:"/campaigns",icon:"assets/campaigns.svg",title:$localize`:@@campaign.list.headline:Campaigns`,key:"campaigns"},{link:"/products",icon:"assets/products.svg",title:$localize`:@@product.list.headline:Products`,key:"products"}],this.environment=V,this.counts=G(null),this.cards=X(()=>this.entities.map(l=>({link:l.link,icon:l.icon,title:l.title,count:this.counts()?.[l.key]??null}))),this.userService=g(ne),this.accountService=g(U),this.contactService=g(Q),this.opportunityService=g(ee),this.activityService=g(q),this.activityRelationService=g(J),this.memoService=g(Z),this.campaignService=g(Y),this.productService=g(te)}ngOnInit(){B({users:this.userService.countUsers().pipe(x(()=>E(null))),accounts:this.accountService.countAccounts().pipe(x(()=>E(null))),contacts:this.contactService.countContacts().pipe(x(()=>E(null))),opportunities:this.opportunityService.countOpportunities().pipe(x(()=>E(null))),activities:this.activityService.countActivities().pipe(x(()=>E(null))),activityRelations:this.activityRelationService.countActivityRelations().pipe(x(()=>E(null))),memos:this.memoService.countMemoes().pipe(x(()=>E(null))),campaigns:this.campaignService.countCampaigns().pipe(x(()=>E(null))),products:this.productService.countProducts().pipe(x(()=>E(null)))}).subscribe(l=>{Object.values(l).every(r=>r===null)||this.counts.set(l)})}};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=h({type:i,selectors:[["app-home"]],decls:98,vars:3,consts:()=>{let l;l=$localize`:@@home.hero.kicker:Full-stack demo · Spring Boot + Angular + Postgres`;let r;r=$localize`:@@home.index.headline:CRM Demo`;let p;p=$localize`:@@home.hero.lede:Manage accounts, contacts, opportunities and campaigns end to end — a typed REST API with validated Angular forms, running on free-tier cloud infrastructure.`;let A;A=$localize`:@@home.hero.explore:Explore entities`;let N;N=$localize`:@@home.hero.swagger:API Docs`;let b;b=$localize`:@@home.hero.sleepNote:The free-tier backend sleeps after ~15 min idle — the first request can take up to a minute to wake it.`;let T;T=$localize`:@@home.index.exploreEntities:Test operations on the entities`;let $;$=$localize`:@@home.entities.lede:Live row counts with full create, read, update and delete on all nine tables.`;let w;w=$localize`:@@home.er.title:How the data fits together`;let H;H=$localize`:@@home.er.lede:Nine tables in one Postgres database — every arrow is a real foreign key, created by Flyway migration V1.`;let R;R=$localize`:@@home.stack.title:How it runs`;let I;I=$localize`:@@home.stack.lede:One repository, three free-tier hosts, migrations included.`;let z;return z=$localize`:@@home.stack.source:Source on GitHub`,[l,r,p,A,N,b,T,$,w,H,R,I,z,[1,"overflow-hidden","rounded-2xl","bg-zinc-950","px-6","py-10","text-zinc-100","md:px-10","md:py-14","mb-12"],[1,"font-mono","text-xs","uppercase","tracking-widest","text-violet-400","mb-3"],[1,"text-3xl","md:text-5xl","font-bold","tracking-tight","mb-4"],[1,"max-w-2xl","text-lg","leading-relaxed","text-zinc-400","mb-6"],[1,"flex","flex-wrap","items-center","gap-3"],["href","#entities",1,"inline-block","rounded-full","bg-violet-600","px-5","py-2.5","font-medium","text-white","hover:bg-violet-500"],["target","_blank","rel","noreferrer",1,"inline-block","rounded-full","border","border-white/20","px-5","py-2.5","font-medium","text-zinc-100","hover:border-violet-400","hover:text-white",3,"href"],[1,"inline-flex","items-center","rounded-full","border","border-white/10","bg-white/5","px-4","py-2"],[3,"compact","onDark"],[1,"mt-4","text-sm","text-zinc-400"],["id","entities",1,"mb-12","scroll-mt-24"],[1,"text-2xl","font-semibold","tracking-tight","mb-2"],[1,"text-zinc-600","mb-5"],[1,"grid","grid-cols-1","sm:grid-cols-2","lg:grid-cols-3","gap-4"],[1,"mb-12","rounded-2xl","border","border-zinc-200","bg-white","p-6","md:p-8"],[1,"flex","flex-wrap","items-center","gap-2","font-mono","text-sm"],[1,"rounded-full","bg-zinc-950","px-3","py-1","text-zinc-100"],["aria-hidden","true",1,"text-zinc-400"],[1,"mt-3","flex","flex-wrap","items-center","gap-2","text-sm"],[1,"rounded-full","bg-zinc-100","px-3","py-1","text-zinc-600"],["href","https://github.com/BachiDev/crm-demo","target","_blank","rel","noreferrer",1,"rounded-full","bg-brand-50","px-3","py-1","font-medium","text-brand-700","hover:bg-brand-100"],["href","https://github.com/BachiDev/crm-demo"],[1,"group","flex","items-center","gap-4","rounded-2xl","border","border-zinc-200","bg-white","p-4","hover:border-brand-500","hover:shadow-sm",3,"routerLink"],[1,"flex","h-12","w-12","shrink-0","items-center","justify-center","rounded-xl","bg-zinc-100"],["alt","","loading","lazy",1,"h-6","w-6",3,"src"],[1,"grow"],[1,"block","font-medium"],[1,"block","font-mono","text-sm","text-zinc-500"],["aria-hidden","true",1,"text-zinc-300","group-hover:text-brand-500"]]},template:function(r,p){r&1&&(t(0,"section",13),e(1,`
    `),t(2,"p",14),_(3,0),n(),e(4,`
    `),t(5,"h1",15),_(6,1),n(),e(7,`
    `),t(8,"p",16),_(9,2),n(),e(10,`
    `),t(11,"div",17),e(12,`
        `),t(13,"a",18),_(14,3),n(),e(15,`
        `),t(16,"a",19),_(17,4),n(),e(18,`
        `),t(19,"span",20),e(20,`
            `),C(21,"app-backend-status",21),e(22,`
        `),n(),e(23,`
    `),n(),e(24,`
    `),t(25,"p",22),_(26,5),n(),e(27,`
`),n(),e(28,`

`),t(29,"section",23),e(30,`
    `),t(31,"h2",24),_(32,6),n(),e(33,`
    `),t(34,"p",25),_(35,7),n(),e(36,`
    `),t(37,"div",26),e(38,`
        `),y(39,ce,21,4,null,null,de),n(),e(41,`
`),n(),e(42,`

`),t(43,"section",27),e(44,`
    `),t(45,"h2",24),_(46,8),n(),e(47,`
    `),t(48,"p",25),_(49,9),n(),e(50,`
    `),C(51,"app-er-diagram"),e(52,`
`),n(),e(53,`

`),t(54,"section",27),e(55,`
    `),t(56,"h2",24),_(57,10),n(),e(58,`
    `),t(59,"p",25),_(60,11),n(),e(61,`
    `),t(62,"div",28),e(63,`
        `),t(64,"span",29),e(65,"Angular 20"),n(),e(66,`
        `),t(67,"span",30),e(68,"\u2192"),n(),e(69,`
        `),t(70,"span",29),e(71,"Spring Boot 3.5"),n(),e(72,`
        `),t(73,"span",30),e(74,"\u2192"),n(),e(75,`
        `),t(76,"span",29),e(77,"Neon Postgres"),n(),e(78,`
    `),n(),e(79,`
    `),t(80,"div",31),e(81,`
        `),t(82,"span",32),e(83,"GitHub Pages"),n(),e(84,`
        `),t(85,"span",32),e(86,"Render"),n(),e(87,`
        `),t(88,"span",32),e(89,"Flyway migrations"),n(),e(90,`
        `),t(91,"a",33),_(92,12),n(),e(93,`
    `),n(),e(94,`
`),n(),e(95,`

`),C(96,"app-floating-action-button",34),e(97,`
`)),r&2&&(s(16),k("href",p.environment.apiPath+"/swagger-ui.html",S),s(5),k("compact",!1)("onDark",!0),s(18),v(p.cards()))},dependencies:[K,D,j,oe,ae],styles:[".text-gray[_ngcontent-%COMP%]{color:gray}.text-yellow[_ngcontent-%COMP%]{color:orange}.text-green[_ngcontent-%COMP%]{color:green}"]});let o=i;return o})();export{we as HomeComponent};
