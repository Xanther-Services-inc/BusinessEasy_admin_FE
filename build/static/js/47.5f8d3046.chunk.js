(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[47],{718:function(e,t,a){"use strict";a.r(t);var n=a(14),c=a.n(n),r=a(31),l=a(0),i=a.n(l),s=a(12),o=a.n(s),u=a(28),d=a(1),m=a(84),p=a(612),f=a(628),g=(a(643),a(41)),E=a.n(g),h=a(190),k=a.n(h);t.default=function(e){var t=e.product,a=t.id,n=t.title,l=(t.desc,t.price),s=t.doc_key,g=(Object(u.c)(),function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.a.delete("".concat("http://3.13.108.228:4001","/api/v1/product/delete?id=").concat(t));case 3:e.sent,k()("Congratulation!","Product Deleted Successfully","warning"),window.location.reload(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}());return i.a.createElement(f.ProductCard,{style:{marginBottom:30}},i.a.createElement(d.c,{to:"/admin/ecommerce/productDetails/".concat(a)},i.a.createElement("figure",null,i.a.createElement("img",{style:{width:"100%",height:"13rem"},src:"https://products-imgs.s3.us-east-2.amazonaws.com/".concat(s),alt:"{doc_key}"})),i.a.createElement("figcaption",null,i.a.createElement(m.default,{className:"product-single-title",as:"h5"},n),i.a.createElement("p",{className:"product-single-price"},i.a.createElement("span",{className:"product-single-price__new"},"$",l," ")),i.a.createElement("div",{className:"product-single-action"}))),i.a.createElement(p.Button,{style:{marginLeft:"40%",marginBottom:"5px"},onClick:function(){return g(a)},size:"medium",type:"primary"},i.a.createElement(o.a,{icon:"trash-2",size:14})))}},744:function(e,t,a){"use strict";a.r(t);a(76);var n=a(36),c=(a(77),a(18)),r=(a(192),a(116)),l=(a(2),a(0)),i=a.n(l),s=a(28),o=a(718),u=a(84),d=a(628),m=a(643);t.default=function(){var e=Object(s.c)(),t=Object(s.d)((function(e){return e.products})),a=t.loading,p=(t.error,t.data);return Object(l.useEffect)((function(){e(Object(m.allProducts)())}),[e]),i.a.createElement(n.a,{gutter:30},a?i.a.createElement(c.a,{xs:24},i.a.createElement("div",{className:"spin"},i.a.createElement(r.a,null))):p.length?p.map((function(e){var t=e.id,a=e.price,n=e.doc_key,r=e.title,l=e.desc;return i.a.createElement(c.a,{xxl:6,lg:8,md:8,xs:24,key:t},i.a.createElement(o.default,{product:{id:t,price:a,title:r,doc_key:n,desc:l}}))})):i.a.createElement(c.a,{md:24},i.a.createElement(d.NotFoundWrapper,null,i.a.createElement(u.default,{as:"h1"},"Data Not Found"))))}}}]);
//# sourceMappingURL=47.5f8d3046.chunk.js.map