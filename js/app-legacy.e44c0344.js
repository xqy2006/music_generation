(function(){"use strict";var t={7047:function(t,e,n){n(5769),n(1418),n(8410),n(1370);var o=n(6427),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"vue"}},[n("div",{staticClass:"outer"},[n("p",{staticStyle:{"margin-top":"0px","margin-bottom":"0px"}},[n("p321",[t._v(" ")])],1)]),n("div",{staticClass:"outer"},[n("p",{staticStyle:{"margin-top":"0px","margin-bottom":"0px"}},[n("p123",[t._v("     x u q i n y a n g")])],1)]),n("div",{staticClass:"outer"},[n("p",{staticStyle:{"margin-top":"0px","margin-bottom":"0px"}},[n("p321",[t._v(" ")])],1)]),n("div",{attrs:{id:"form"}},[n("ele-form",t._b({attrs:{"request-fn":t.handleRequest},on:{"request-success":t.handleRequestSuccess},model:{value:t.formData,callback:function(e){t.formData=e},expression:"formData"}},"ele-form",t.formConfig,!1))],1),n("a",{staticStyle:{"margin-inline-start":"50px"}},[t._v("历史记录：")]),t._l(t.comments,(function(e){return n("el-card",{key:e,staticClass:"box-card",attrs:{shadow:"hover"}},[n("a",{staticStyle:{display:"block"}},[t._v(t._s(e.message))]),n("a",{attrs:{href:e.url}},[t._v(t._s(e.urlmessage))])])}))],2)},r=[],s=(n(5623),n(1514),n(2077),n(2482),n(3238),n(911),n(2759),n(8237),n(4992),n(895),n(4890),n(740),n(5849),n(2410),n(5735),{created:function(){var t=this;if(0==this.$cookies.isKey("token")&&(this.num=1,this.comments=[{url:"https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae",urlmessage:"点我登录",message:"登录后即可查看历史记录\n"}]),window.location.href.includes("code")){for(var e=window.location.href,o=e.split("#")[0],i=o.split("?")[1],r=i.split("&"),s={},a=0;a<r.length;a++)s[r[a].split("=")[0]]=r[a].split("=")[1];this.id=s.code;var u=n(4206),c={method:"get",url:"https://xuqinyang-github.azurewebsites.net/api/HttpTrigger1?code=GdReemTxYFEwbsXixrahXbTwjqEpAJjqM_MPv_LDImWkAzFuziHQNw==&code123="+this.id},l=this;u(c).then((function(e){e.data.includes("gh")&&l.$cookies.set("token",e.data,{expires:"30D"}),fetch("https://api.github.com/user",{headers:{Authorization:"token "+e.data},method:"GET",mode:"cors"}).then((function(t){return t.json()})).then((function(e){0==t.$cookies.isKey("login")&&(t.$cookies.set("login",e["login"],{expires:"30D"}),t.login=e["login"]),window.location.href=(window.location.href.includes("state"),decodeURIComponent(new RegExp("[?|&]state=([^&;]+?)(&|#|;|$)").exec(window.location.href)[1].replace(/\+/g,"%20"))||null)}))}))}this.$cookies.isKey("login")&&(this.login=this.$cookies.get("login")),this.isTimeOut()},data:function(){var t=this,e=function(t,e,n){e?/[\u0020-\u4DFF]/g.test(e)&&n(new Error("只能输入汉字")):n(),/[\u9FA6-\uFFFF]/g.test(e)?n(new Error("只能输入汉字")):(n(),n())};return{timeOut:"",login:"",comments:[{message:"登录后即可查看历史记录\n",url:"https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae",urlmessage:"点我登录"}],link:"https://www.baidu.com",formData:{},formConfig:{order:["time","input","mybutton"],rules:{input:[{required:!0,type:"string",message:"必须填写歌词"},{validator:e,message:"请输入中文歌词，无标点"}]},labelPosition:"top",formDesc:{time:{type:"text",label:"",isOptions:!1,default:"text→music:一个可以自动根据歌词进行谱曲的AI\r\n在20首儿歌的数据集上训练了10K step得到的模型"},input:{type:"textarea",label:"请输入要谱曲的歌词（只能是中文，无标点）",default:window.location.href.includes("state")?decodeURIComponent(new RegExp("[?|&]state=([^&;]+?)(&|#|;|$)").exec(window.location.href)[1].replace(/\+/g,"%20"))||null:""},mybutton:{type:"button",label:"按钮",default:"去除所有非中文字符",isShowLabel:!1,on:{click:function(){t.$set(t.formData,"input",t.formData.input.replace(/[^\u4e00-\u9fa5]/g,""))},attrs:{round:!1,plain:!0,circle:!1,nativeType:"button",type:"info"}}}}}}},watch:{login:function(){var t=this,e=this.$cookies.get("token"),n=this.$cookies.get("login");fetch("https://api.github.com/repos/xqy2006/music_generation/issues?state=closed&per_page=100&creator="+n,{headers:{Authorization:"token "+e},method:"GET",mode:"cors"}).then((function(t){return t.json()})).then((function(e){t.comments=[],e.forEach((function(e){t.comments.push({url:"https://xqy2006.github.io/music_generation/music/"+e["number"]+".mp3",urlmessage:"mp3下载地址",message:e["body"].slice(8)+"\n"})}))}))}},methods:{handleRequest:function(t){if(this.$cookies.isKey("token")){var e=this.$loading({lock:!0,text:"加载中，请稍候...",background:"rgba(255,255,255,0.8)"}),n=this.$cookies.get("token");fetch("https://api.github.com/repos/xqy2006/music_generation/issues",{headers:{Authorization:"token "+n,"Content-Type":"application/json"},method:"POST",mode:"cors",body:JSON.stringify({access_token:n,title:"music_generation",body:"### 歌词\n\n"+t["input"],labels:["music_generation"]})}).then((function(t){return t.json()})).then((function(t){window.open(t["html_url"],"_blank"),e.close()}))}else this.$alert("请先登录GitHub","未登录GitHub",{confirmButtonText:"登录",callback:function(e){"confirm"==e&&(window.location.href="https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae&state="+t["input"])}});return Promise.resolve()},startTimer:function(){var t=this;clearInterval(t.timeOut),t.timeOut=setInterval((function(){var t=this;if(this.$cookies.isKey("login")){var e=this.$cookies.get("token"),n=this.$cookies.get("login");fetch("https://api.github.com/repos/xqy2006/music_generation/issues?state=closed&per_page=100&creator="+n,{headers:{Authorization:"token "+e},method:"GET",mode:"cors"}).then((function(t){return t.json()})).then((function(e){console.log("refresh"),t.comments=[],e.forEach((function(e){t.comments.push({url:"https://xqy2006.github.io/music_generation/music/"+e["number"]+".mp3",urlmessage:"mp3下载地址",message:e["body"].slice(8)+"\n"})}))}))}}),6e4)},isTimeOut:function(){var t=this;t.startTimer()}}}),a=s,u=n(9917),c=(0,u.Z)(a,i,r,!1,null,null,null),l=c.exports,f=n(6396),h=n.n(f),m=n(5630),p=n.n(m),d=n(7114),g=n.n(d);o["default"].config.productionTip=!1,o["default"].use(h()),o["default"].use(p()),o["default"].use(g()),new o["default"]({render:function(t){return t(l)}}).$mount("#app")}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,o,i,r){if(!o){var s=1/0;for(l=0;l<t.length;l++){o=t[l][0],i=t[l][1],r=t[l][2];for(var a=!0,u=0;u<o.length;u++)(!1&r||s>=r)&&Object.keys(n.O).every((function(t){return n.O[t](o[u])}))?o.splice(u--,1):(a=!1,r<s&&(s=r));if(a){t.splice(l--,1);var c=i();void 0!==c&&(e=c)}}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[o,i,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var i,r,s=o[0],a=o[1],u=o[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(u)var l=u(n)}for(e&&e(o);c<s.length;c++)r=s[c],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(l)},o=self["webpackChunkclient"]=self["webpackChunkclient"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(7047)}));o=n.O(o)})();
//# sourceMappingURL=app-legacy.e44c0344.js.map