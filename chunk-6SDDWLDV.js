import{a as w}from"./chunk-V75AAYL2.js";import{a as k}from"./chunk-DEO4IKJT.js";import"./chunk-FBCQN43Y.js";import"./chunk-VAL26HVG.js";import{A as N,Ca as e,Da as a,Ja as L,N as u,S as f,Va as h,ba as O,ca as R,ea as A,eb as U,fa as x,ga as I,ha as t,ia as n,ib as v,ja as $,jb as y,na as b,pa as l,sa as D,ua as p,x as P,z as M}from"./chunk-JRLO7FLJ.js";var B=o=>["/products/edit",o],G=(o,r)=>r.productId;function W(o,r){o&1&&(e(0,`
`),t(1,"div"),l(2,2),n(),e(3,`
`))}function X(o,r){if(o&1){let d=b();e(0,`
            `),t(1,"tr",16),e(2,`
                `),t(3,"td",17),e(4),n(),e(5,`
                `),t(6,"td",17),e(7),n(),e(8,`
                `),t(9,"td",17),e(10),n(),e(11,`
                `),t(12,"td",17),e(13),n(),e(14,`
                `),t(15,"td",17),e(16,`
                    `),t(17,"div",18),e(18,`
                        `),t(19,"a",19),l(20,7),n(),e(21,`
                        `),t(22,"button",20),D("click",function(){let _=M(d).$implicit,c=p(2);return N(c.confirmDelete(_.productId))}),l(23,8),n(),e(24,`
                    `),n(),e(25,`
                `),n(),e(26,`
            `),n(),e(27,`
            `)}if(o&2){let d=r.$implicit;u(4),a(d.productId),u(3),a(d.productName),u(3),a(d.sku),u(3),a(d.price),u(6),I("routerLink",L(5,B,d.productId))}}function z(o,r){if(o&1&&(e(0,`
`),t(1,"div",12),e(2,`
    `),t(3,"table",13),e(4,`
        `),t(5,"thead"),e(6,`
            `),t(7,"tr"),e(8,`
                `),t(9,"th",14),l(10,3),n(),e(11,`
                `),t(12,"th",14),l(13,4),n(),e(14,`
                `),t(15,"th",14),l(16,5),n(),e(17,`
                `),t(18,"th",14),l(19,6),n(),e(20,`
                `),$(21,"th"),e(22,`
            `),n(),e(23,`
        `),n(),e(24,`
        `),t(25,"tbody",15),e(26,`
            `),A(27,X,28,7,null,null,G),n(),e(29,`
    `),n(),e(30,`
`),n(),e(31,`
`)),o&2){let d=p();u(27),x(d.products)}}var Q=(()=>{let r=class r{constructor(){this.productService=P(w),this.errorHandler=P(k),this.router=P(v)}getMessage(i,_){return{confirm:$localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,deleted:$localize`:@@product.delete.success:Product was removed successfully.`}[i]}ngOnInit(){this.loadData(),this.navigationSubscription=this.router.events.subscribe(i=>{i instanceof U&&this.loadData()})}ngOnDestroy(){this.navigationSubscription.unsubscribe()}loadData(){this.productService.getAllProducts().subscribe({next:i=>this.products=i,error:i=>this.errorHandler.handleServerError(i.error)})}confirmDelete(i){confirm(this.getMessage("confirm"))&&this.productService.deleteProduct(i).subscribe({next:()=>this.router.navigate(["/products"],{state:{msgInfo:this.getMessage("deleted")}}),error:_=>this.errorHandler.handleServerError(_.error)})}};r.\u0275fac=function(_){return new(_||r)},r.\u0275cmp=f({type:r,selectors:[["app-product-list"]],decls:14,vars:1,consts:()=>{let i;i=$localize`:@@product.list.headline:Products`;let _;_=$localize`:@@product.list.createNew:Create new Product`;let c;c=$localize`:@@product.list.empty:No Products could be found.`;let T;T=$localize`:@@product.productId.label:Product Id`;let C;C=$localize`:@@product.productName.label:Product Name`;let S;S=$localize`:@@product.sku.label:Sku`;let m;m=$localize`:@@product.price.label:Price`;let E;E=$localize`:@@product.list.edit:Edit`;let g;return g=$localize`:@@product.list.delete:Delete`,[i,_,c,T,C,S,m,E,g,[1,"flex","flex-wrap","mb-6"],[1,"grow","text-3xl","md:text-4xl","font-medium","mb-2"],["routerLink","/products/add",1,"inline-block","text-white","bg-blue-600","hover:bg-blue-700","focus:ring-blue-300","focus:ring-4","rounded","px-5","py-2"],[1,"overflow-x-auto"],[1,"w-full"],["scope","col",1,"text-left","p-2"],[1,"border-t-2","border-black"],[1,"odd:bg-gray-100"],[1,"p-2"],[1,"float-right","whitespace-nowrap"],[1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm",3,"routerLink"],["type","button",1,"inline-block","text-white","bg-gray-500","hover:bg-gray-600","focus:ring-gray-200","focus:ring-3","rounded","px-2.5","py-1.5","text-sm","cursor-pointer",3,"click"]]},template:function(_,c){_&1&&(t(0,"div",9),e(1,`
    `),t(2,"h1",10),l(3,0),n(),e(4,`
    `),t(5,"div"),e(6,`
        `),t(7,"a",11),l(8,1),n(),e(9,`
    `),n(),e(10,`
`),n(),e(11,`
`),O(12,W,4,0)(13,z,32,0)),_&2&&(u(12),R(!c.products||c.products.length===0?12:13))},dependencies:[h,y],encapsulation:2});let o=r;return o})();export{Q as ProductListComponent};
