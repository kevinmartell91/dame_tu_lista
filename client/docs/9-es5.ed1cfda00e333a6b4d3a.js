function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"/4T3":function(e,n,t){"use strict";t.r(n),t.d(n,"MedicalDashboardModule",(function(){return h}));var r,o,c,i=t("ofXK"),u=t("PCNd"),a=t("tyNb"),l=t("fXoL"),s=function(){return["buyers"]},f=function(){return["retailers"]},b=function(){return["./"]},d=[{path:"",component:(r=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}(),r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=l.Ib({type:r,selectors:[["app-medical-dashboard"]],decls:9,vars:6,consts:[[3,"routerLink"]],template:function(e,n){1&e&&(l.Ub(0,"p"),l.Cc(1,"medical-dashboard works!"),l.Tb(),l.Ub(2,"button",0),l.Cc(3,"Compradores"),l.Tb(),l.Ub(4,"button",0),l.Cc(5,"Minoristas"),l.Tb(),l.Ub(6,"button",0),l.Cc(7,"Home"),l.Tb(),l.Pb(8,"router-outlet")),2&e&&(l.Cb(2),l.lc("routerLink",l.mc(3,s)),l.Cb(2),l.lc("routerLink",l.mc(4,f)),l.Cb(2),l.lc("routerLink",l.mc(5,b)))},directives:[a.c,a.f],styles:[""]}),r),children:[{path:"buyers",loadChildren:function(){return t.e(6).then(t.bind(null,"FqC2")).then((function(e){return e.BuyersModule}))}},{path:"retailers",loadChildren:function(){return t.e(12).then(t.bind(null,"dTXE")).then((function(e){return e.RetailersModule}))}}]}],p=((c=function e(){_classCallCheck(this,e)}).\u0275mod=l.Mb({type:c}),c.\u0275inj=l.Lb({factory:function(e){return new(e||c)},imports:[[a.e.forChild(d)],a.e]}),c),h=((o=function e(){_classCallCheck(this,e)}).\u0275mod=l.Mb({type:o}),o.\u0275inj=l.Lb({factory:function(e){return new(e||o)},imports:[[i.c,p,u.a]]}),o)}}]);