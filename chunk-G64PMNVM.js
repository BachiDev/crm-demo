import{a as J}from"./chunk-MJMEMENI.js";import{a as Z,b as ee,c as A,d as te,e as ne}from"./chunk-P6EUP75Z.js";import"./chunk-3UDFUMK6.js";import{a as Y}from"./chunk-IE2CQ4IW.js";import"./chunk-X534G2PA.js";import"./chunk-VAL26HVG.js";import{Aa as W,B as E,Ba as X,C as M,Ea as e,Fa as g,La as k,Ma as V,Na as H,P as a,U as y,Xa as q,Ya as F,da as v,ea as w,ga as z,ha as B,hb as K,ia as p,ja as n,ka as i,la as C,lb as Q,mb as j,pa as N,ra as c,ua as T,wa as u,z as m,za as G}from"./chunk-OJ74WIM5.js";var ie=r=>["/products/edit",r],oe=(r,s)=>s.productId;function _e(r,s){r&1&&(e(0,`
`),n(1,"div",12),e(2,`
    `),n(3,"div",13),e(4,`
        `),C(5,"div",14),e(6,`
        `),C(7,"div",14),e(8,`
        `),C(9,"div",14),e(10,`
    `),i(),e(11,`
`),i(),e(12,`
`))}function re(r,s){if(r&1&&(e(0,`
`),C(1,"app-empty-state",15),e(2,`
`)),r&2){let o=u();a(),p("title",o.q?"No products match your search":"No products found")}}function le(r,s){if(r&1){let o=N();e(0,`
            `),n(1,"tr",22),e(2,`
                `),n(3,"td",23),e(4),i(),e(5,`
                `),n(6,"td",24),e(7),i(),e(8,`
                `),n(9,"td",25),e(10),V(11,"currency"),i(),e(12,`
                `),n(13,"td",26),e(14),i(),e(15,`
                `),n(16,"td",27),e(17,`
                    `),n(18,"div",28),e(19,`
                        `),n(20,"a",29),c(21,6),i(),e(22,`
                        `),n(23,"button",30),T("click",function(){let _=E(o).$implicit,l=u(2);return M(l.requestDelete(_.productId))}),c(24,7),i(),e(25,`
                    `),i(),e(26,`
                `),i(),e(27,`
            `),i(),e(28,`
            `)}if(r&2){let o=s.$implicit,t=u(2);a(4),g(o.productName),a(3),g(o.sku),a(3),g(H(11,6,o.price)),a(3),p("title",o.productId),a(),g(t.shortId(o.productId)),a(6),p("routerLink",k(8,ie,o.productId))}}function de(r,s){if(r&1){let o=N();e(0,`
`),n(1,"div",16),e(2,`
    `),n(3,"table",17),e(4,`
        `),n(5,"caption",18),c(6,0),i(),e(7,`
        `),n(8,"thead"),e(9,`
            `),n(10,"tr",19),e(11,`
                `),n(12,"th",20),c(13,1),i(),e(14,`
                `),n(15,"th",20),c(16,2),i(),e(17,`
                `),n(18,"th",20),c(19,3),i(),e(20,`
                `),n(21,"th",20),c(22,4),i(),e(23,`
                `),n(24,"th")(25,"span",18),c(26,5),i()(),e(27,`
            `),i(),e(28,`
        `),i(),e(29,`
        `),n(30,"tbody"),e(31,`
            `),z(32,le,29,10,null,null,oe),i(),e(34,`
    `),i(),e(35,`
`),i(),e(36,`
`),n(37,"app-pagination",21),T("pageChange",function(_){E(o);let l=u();return M(l.onPage(_))})("pageSizeChange",function(_){E(o);let l=u();return M(l.onPageSize(_))}),e(38,"products"),i(),e(39,`
`)}if(r&2){let o=u();a(32),B(o.products),a(5),p("page",o.page)("totalPages",o.totalPages)("totalElements",o.totalElements??0)("pageSize",o.pageSize)}}var Ae=(()=>{let s=class s{constructor(){this.productService=m(J),this.errorHandler=m(Y),this.router=m(Q),this.products=[],this.page=0,this.pageSize=10,this.totalPages=0,this.totalElements=null,this.loading=!0,this.q=""}getMessage(t,_){return{deleted:$localize`:@@product.delete.success:Product was removed successfully.`}[t]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(t=>{t instanceof K&&(this.page=0,this.loadData())})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.loading=!0,this.productService.getProductsPaged(this.page,this.pageSize,this.q||void 0).subscribe({next:t=>{this.products=t.content,this.totalPages=t.totalPages,this.totalElements=t.totalElements,this.loading=!1},error:t=>{this.loading=!1,this.errorHandler.handleServerError(t.error)}})}onSearch(t){this.q=t,this.page=0,this.loadData()}onPage(t){t<0||t>=this.totalPages||(this.page=t,this.loadData())}onPageSize(t){this.pageSize=t,this.page=0,this.loadData()}shortId(t){return t?t.substring(0,8)+"\u2026":"\u2013"}requestDelete(t){this.pendingDelete=t,this.confirmDialog.open()}deleteConfirmed(){let t=this.pendingDelete;t&&(this.pendingDelete=void 0,this.productService.deleteProduct(t).subscribe({next:()=>this.router.navigate(["/products"],{state:{msgInfo:this.getMessage("deleted")}}),error:_=>this.errorHandler.handleServerError(_.error)}))}};s.\u0275fac=function(_){return new(_||s)},s.\u0275cmp=y({type:s,selectors:[["app-product-list"]],viewQuery:function(_,l){if(_&1&&G(A,5),_&2){let P;W(P=X())&&(l.confirmDialog=P.first)}},decls:12,vars:2,consts:()=>{let t;t=$localize`:@@product.list.headline:Products`;let _;_=$localize`:@@product.list.count:products total`;let l;l=$localize`:@@product.list.createNew:Create new Product`;let P;P=$localize`:@@product.search:Search name, SKU, description…`;let S;S=$localize`:@@delete.title:Delete this record?`;let R;R=$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`;let O;O=$localize`:@@product.list.emptyHint:Add the first product to get started.`;let f;f=$localize`:@@product.list.createNew:Create new Product`;let I;I=$localize`:@@product.list.caption:Products with SKU and price`;let h;h=$localize`:@@product.productName.label:Product Name`;let x;x=$localize`:@@product.sku.label:Sku`;let D;D=$localize`:@@product.price.label:Price`;let $;$=$localize`:@@product.productId.label:Id`;let L;L=$localize`:@@list.actions:Actions`;let U;U=$localize`:@@product.list.edit:Edit`;let b;return b=$localize`:@@product.list.delete:Delete`,[I,h,x,D,$,L,U,b,["title",t,"countLabel",_,"createLink","/products/add","createLabel",l,3,"count"],[1,"mb-4","flex","justify-end"],["placeholder",P,1,"w-full","max-w-xs",3,"search"],["title",S,"message",R,3,"confirmed"],["aria-busy","true","aria-label","Loading products",1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"space-y-2","p-4"],[1,"h-10","animate-pulse","rounded-lg","bg-zinc-100"],["hint",O,"actionLink","/products/add","actionLabel",f,3,"title"],[1,"overflow-x-auto","rounded-2xl","border","border-zinc-200","bg-white"],[1,"w-full","text-sm"],[1,"sr-only"],[1,"text-left","text-xs","uppercase","tracking-wide","text-zinc-500"],["scope","col",1,"p-3","font-medium"],[3,"pageChange","pageSizeChange","page","totalPages","totalElements","pageSize"],[1,"border-t","border-zinc-100","hover:bg-brand-50/50"],[1,"p-3","font-medium"],[1,"p-3","font-mono","text-xs"],[1,"p-3","tabular-nums"],[1,"p-3","font-mono","text-xs","text-zinc-500",3,"title"],[1,"p-3"],[1,"float-right","flex","gap-1.5","whitespace-nowrap"],[1,"inline-block","rounded-full","border","border-zinc-300","px-3","py-1.5","text-xs","font-medium","hover:bg-zinc-100",3,"routerLink"],["type","button",1,"inline-block","cursor-pointer","rounded-full","bg-rose-600","px-3","py-1.5","text-xs","font-medium","text-white","hover:bg-rose-500",3,"click"]]},template:function(_,l){_&1&&(C(0,"app-page-header",8),e(1,`

`),n(2,"div",9),e(3,`
    `),n(4,"app-search-input",10),T("search",function(S){return l.onSearch(S)}),i(),e(5,`
`),i(),e(6,`

`),v(7,_e,13,0)(8,re,3,1)(9,de,40,4),n(10,"app-confirm-dialog",11),T("confirmed",function(){return l.deleteConfirmed()}),i(),e(11,`
`)),_&2&&(p("count",l.totalElements),a(7),w(l.loading?7:l.products.length===0?8:9))},dependencies:[F,j,Z,ee,A,te,ne,q],encapsulation:2});let r=s;return r})();export{Ae as ProductListComponent};
