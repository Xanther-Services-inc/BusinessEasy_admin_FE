(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[53],{590:function(e,t,a){"use strict";a.r(t);a(76);var n=a(36),r=(a(77),a(18)),c=(a(189),a(85)),o=a(14),s=a.n(o),l=a(31),i=a(48),u=a(0),p=a.n(u),m=a(28),d=a(206),g=a(613),f=(a(99),a(41)),h=a.n(f),v=a(122);t.default=function(){var e=Object(m.d)((function(e){return{isLoggedIn:e.auth.login||localStorage.getItem("adminInfo")}})).isLoggedIn;console.log(e);var t={};try{t=JSON.parse(e)}catch(H){t=e}var a=Object(v.a)(t.token).email;var o="0123456".split("").map((function(e){var t,a,n,r=new Date;return r.setDate(r.getDate()-e),t=r.getMonth()+1,a=r.getDate(),n=r.getFullYear(),[t<10?"0"+t:t,a<10?"0"+a:a,n].join("/")}));console.log(o);o[0],o[1],o[2],o[3],o[4],o[5],o[6];var f=Object(u.useState)(""),k=Object(i.a)(f,2),y=k[0],b=k[1],w=function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post("".concat("http://3.13.108.228:4001","/api/v1/work/start"),{email:a});case 2:n=e.sent,r=n.data,b(r),console.log(r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.patch("".concat("http://3.13.108.228:4001","/api/v1/work/stop"),y);case 2:a=e.sent,a.data,window.location.reload();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=Object(u.useState)([]),E=Object(i.a)(j,2),O=E[0],D=E[1];Object(u.useEffect)((function(){(function(){var e=Object(l.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get("".concat("http://3.13.108.228:4001","/api/v1/works"),{params:{email:a}});case 2:t=e.sent,n=t.data,console.log(n),D(n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var S=O.sort((function(e,t){return e.date<t.date?1:e.date>t.date?-1:0}));console.log(S);var C=[],W=[];S.map((function(e){C.push(e.duration.h+e.duration.m/60),W.push(e.date)}));for(var A=[],I=0;I<7;I++)A.push(W[I]);console.log(C);var z={labels:A,datasets:[{label:"Work Hour",data:C,borderColor:["#001737","#001737","#001737","#001737","#001737","#001737","#001737"],backgroundColor:["#1ce1ac","#1ce1ac","#1ce1ac","#1ce1ac","#1ce1ac","#1ce1ac","#1ce1ac"]}]};return p.a.createElement(p.a.Fragment,null,p.a.createElement(n.a,null,p.a.createElement(r.a,{style:{top:"2rem",textAlign:"center"},md:8,sm:8,lg:8,xl:8},p.a.createElement(c.a,{onClick:w,type:"primary",size:"large"},"Start Work")),p.a.createElement(r.a,{style:{top:"2rem",textAlign:"center"},md:8,sm:8,lg:8,xl:8},p.a.createElement("h4",null,"Total Work Hour of last 7 Days: ",p.a.createElement("strong",null))),p.a.createElement(r.a,{style:{top:"2rem",textAlign:"center"},md:8,sm:8,lg:8,xl:8},p.a.createElement(c.a,{onClick:x,type:"primary",danger:!0,size:"large"},"Stop Work"))),p.a.createElement(g.Main,{style:{display:"flex",justifyContent:"center",width:"70vw",paddingTop:"4rem"}},p.a.createElement(d.Bar,{data:z,options:{title:{display:!0,text:"Last 7 Days Work Hour"},scales:{yAxes:[{ticks:{min:0,max:12,stepSize:2}}]}}})))}}}]);
//# sourceMappingURL=53.d7d311cf.chunk.js.map