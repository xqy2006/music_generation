(function(){"use strict";var t={1911:function(t,e,o){o(5769),o(1418),o(8410),o(1370);var i=o(6427),n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"vue"}},[o("div",{staticClass:"outer"},[o("p",{staticStyle:{"margin-top":"0px","margin-bottom":"0px"}},[o("p321",[t._v(" ")])],1)]),o("div",{staticClass:"outer"},[o("p",{staticStyle:{"margin-top":"0px","margin-bottom":"0px"}},[o("p123",[t._v("     x u q i n y a n g")])],1)]),o("div",{staticClass:"outer"},[o("p",{staticStyle:{"margin-top":"0px","margin-bottom":"0px"}},[o("p321",[t._v(" ")])],1)]),o("div",{attrs:{id:"form"}},[o("ele-form",t._b({attrs:{"request-fn":t.handleRequest},on:{"request-success":t.handleRequestSuccess},model:{value:t.formData,callback:function(e){t.formData=e},expression:"formData"}},"ele-form",t.formConfig,!1))],1),o("div",[o("a",{staticStyle:{"margin-inline-start":"50px","font-size":"20px"}},[t._v("历史记录：")]),o("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.RefreshComments()}}},[t._v("刷新"),o("i",{staticClass:"el-icon-refresh el-icon--right"})])],1),t._l(t.comments,(function(e){return o("el-card",{key:e,staticClass:"box-card",attrs:{shadow:"hover"}},[o("a",{staticStyle:{display:"block"}},[t._v(t._s(e.message))]),e.urlmessage?o("div",{staticStyle:{"margin-top":"5px"}},[o("el-button",{attrs:{type:"primary"},nativeOn:{click:function(o){return t.Dowloadmp3(e.url)}}},[t._v("下载mp3"),o("i",{staticClass:"el-icon-download el-icon--right"})])],1):t._e(),e.urlmessage?o("div",{staticStyle:{"margin-top":"5px"}},[o("el-button",{attrs:{type:"primary"},nativeOn:{click:function(o){return t.Dowloadmidi(e.url)}}},[t._v("下载midi"),o("i",{staticClass:"el-icon-download el-icon--right"})])],1):t._e(),e.urlmessage?o("div",{staticStyle:{"margin-top":"5px"}},[o("el-button",{attrs:{type:"primary"},nativeOn:{click:function(o){return t.Dowloadxml(e.url)}}},[t._v("下载MusicXML"),o("i",{staticClass:"el-icon-download el-icon--right"})])],1):t._e()])}))],2)},s=[],r=(o(5623),o(1514),o(2077),o(2482),o(3238),o(4890),o(740),o(911),o(2759),o(8237),o(4992),o(895),o(5849),o(2410),o(5735),{created:function(){var t=this;if(0==navigator.cookieEnabled&&this.$alert("请启用cookie以使用本网站功能","未启用cookie",{confirmButtonText:"刷新",showClose:!1,callback:function(t){"confirm"==t&&window.location.reload()}}),0==this.$cookies.isKey("token")&&(this.num=1,this.comments=[{url:"https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae",urlmessage:!1,message:"登录后即可查看历史记录\n"}]),window.location.href.includes("code")){this.$loading({lock:!0,text:"加载中，请稍候...",background:"rgba(255,255,255,0.8)"});for(var e=window.location.href,i=e.split("#")[0],n=i.split("?")[1],s=n.split("&"),r={},a=0;a<s.length;a++)r[s[a].split("=")[0]]=s[a].split("=")[1];this.id=r.code,this.textdata=r.state;var c=o(4206),u={method:"get",url:"https://xuqinyang-github.azurewebsites.net/api/HttpTrigger1?code=GdReemTxYFEwbsXixrahXbTwjqEpAJjqM_MPv_LDImWkAzFuziHQNw==&code123="+this.id},l=this;c(u).then((function(e){e.data.includes("gh")&&l.$cookies.set("token",e.data,{expires:"30D"}),fetch("https://api.github.com/user",{headers:{Authorization:"token "+e.data},method:"GET",mode:"cors"}).then((function(t){return t.json()})).then((function(e){0==t.$cookies.isKey("login")&&(t.$cookies.set("login",e["login"],{expires:"30D"}),t.login=e["login"]);var o=t.$cookies.get("text");window.location.href=null===o?"https://xqy2006.github.io/music_generation":"https://xqy2006.github.io/music_generation?state="+o}))}))}this.$cookies.isKey("login")&&(this.login=this.$cookies.get("login")),this.isTimeOut(this)},data:function(){var t=this,e=function(t,e,o){e?/[\u0020-\u4DFF]/g.test(e)&&o(new Error("只能输入汉字")):o(),/[\u9FA6-\uFFFF]/g.test(e)?o(new Error("只能输入汉字")):(o(),o())};return{timeOut:"",login:"",textdata:"",comments:[{message:"登录后即可查看历史记录\n",url:"https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae",urlmessage:!1}],link:"https://www.baidu.com",formData:{},formConfig:{order:["time","input","mybutton","mybutton1"],rules:{input:[{required:!0,type:"string",message:"必须填写歌词"},{validator:e,message:"请输入中文歌词，无标点"}]},labelPosition:"top",formDesc:{time:{type:"text",label:"",isOptions:!1,default:"text→music:一个可以自动根据歌词进行谱曲的AI\r\n在20首儿歌的数据集上训练了10K step得到的模型"},input:{type:"textarea",label:"请输入要谱曲的歌词（只能是中文，无标点）",default:window.location.href.includes("state")?decodeURIComponent(new RegExp("[?|&]state=([^&;]+?)(&|#|;|$)").exec(window.location.href)[1].replace(/\+/g,"%20"))||null:""},mybutton:{type:"button",label:"按钮",default:"去除所有非中文字符",isShowLabel:!1,on:{click:function(){t.$set(t.formData,"input",t.formData.input.replace(/[^\u4e00-\u9fa5]/g,""))},attrs:{round:!1,plain:!0,circle:!1,nativeType:"button",type:"info"}}},mybutton1:{type:"button",label:"按钮",default:"退出账号登录",isShowLabel:!1,on:{click:function(){t.$cookies.isKey("token")?(t.$cookies.isKey("token")&&t.$cookies.remove("token"),t.$cookies.isKey("login")&&t.$cookies.remove("login"),t.$cookies.isKey("text")&&t.$cookies.remove("text"),t.$message({message:"您已退出登录",type:"success"}),window.location.reload()):t.$message.error("您还未登录")},attrs:{round:!1,plain:!0,circle:!1,nativeType:"button",type:"info"}}}}}}},watch:{login:function(){var t=this,e=this.$cookies.get("token"),o=this.$cookies.get("login");fetch("https://api.github.com/repos/xqy2006/music_generation/issues?state=closed&per_page=100&creator="+o,{headers:{Authorization:"token "+e},method:"GET",mode:"cors"}).then((function(t){return t.json()})).then((function(e){t.comments=[],e.forEach((function(e){t.comments.push({url:"https://xqy2006.github.io/music_generation/music/"+e["number"],urlmessage:!0,message:e["body"].slice(8)+"\n"})}))}))}},methods:{Dowloadmp3:function(t){window.open(t+".mp3")},Dowloadmidi:function(t){window.open(t+".midi")},Dowloadxml:function(t){window.open(t+".xml")},RefreshComments:function(){var t=this;if(this.$cookies.isKey("login")&&this.$cookies.isKey("token")){var e=this.$cookies.get("token"),o=this.$cookies.get("login");fetch("https://api.github.com/repos/xqy2006/music_generation/issues?state=closed&per_page=100&creator="+o,{headers:{Authorization:"token "+e},method:"GET",mode:"cors"}).then((function(t){return t.json()})).then((function(e){console.log("refresh"),t.comments=[],e.forEach((function(e){t.comments.push({url:"https://xqy2006.github.io/music_generation/music/"+e["number"],urlmessage:!0,message:e["body"].slice(8)+"\n"})}))}))}this.$message({message:"刷新成功",type:"success"})},handleRequest:function(t){var e=this;if(this.$cookies.isKey("token")){var o=this.$loading({lock:!0,text:"加载中，请稍候...",background:"rgba(255,255,255,0.8)"}),i=this.$cookies.get("token");fetch("https://api.github.com/repos/xqy2006/music_generation/issues",{headers:{Authorization:"token "+i,"Content-Type":"application/json"},method:"POST",mode:"cors",body:JSON.stringify({access_token:i,title:"music_generation",body:"### 歌词\n\n"+t["input"],labels:["music_generation"]})}).then((function(t){return t.json()})).then((function(t){window.open(t["html_url"],"_blank"),o.close()}))}else this.$alert("请先登录GitHub","未登录GitHub",{confirmButtonText:"登录",callback:function(o){"confirm"==o&&(e.$cookies.isKey("text")&&e.$cookies.remove("text"),e.$cookies.set("text",t["input"],{expires:"30D"}),window.location.href="https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae&state="+t["input"])}});return Promise.resolve()},startTimer:function(t){var e=t;clearInterval(e.timeOut),e.timeOut=setInterval((function(){if(this.$cookies.isKey("login")&&this.$cookies.isKey("token")){var e=t.$cookies.get("token"),o=t.$cookies.get("login");fetch("https://api.github.com/repos/xqy2006/music_generation/issues?state=closed&per_page=100&creator="+o,{headers:{Authorization:"token "+e},method:"GET",mode:"cors"}).then((function(t){return t.json()})).then((function(e){console.log("refresh"),t.comments=[],e.forEach((function(e){t.comments.push({url:"https://xqy2006.github.io/music_generation/music/"+e["number"],urlmessage:!0,message:e["body"].slice(8)+"\n"})}))}))}}),6e4)},isTimeOut:function(t){t.startTimer(t)}}}),a=r,c=o(9917),u=(0,c.Z)(a,n,s,!1,null,null,null),l=u.exports,m=o(6396),h=o.n(m),f=o(5630),p=o.n(f),d=o(7114),g=o.n(d);i["default"].config.productionTip=!1,i["default"].use(h()),i["default"].use(p()),i["default"].use(g()),new i["default"]({render:function(t){return t(l)}}).$mount("#app")}},e={};function o(i){var n=e[i];if(void 0!==n)return n.exports;var s=e[i]={exports:{}};return t[i].call(s.exports,s,s.exports,o),s.exports}o.m=t,function(){var t=[];o.O=function(e,i,n,s){if(!i){var r=1/0;for(l=0;l<t.length;l++){i=t[l][0],n=t[l][1],s=t[l][2];for(var a=!0,c=0;c<i.length;c++)(!1&s||r>=s)&&Object.keys(o.O).every((function(t){return o.O[t](i[c])}))?i.splice(c--,1):(a=!1,s<r&&(r=s));if(a){t.splice(l--,1);var u=n();void 0!==u&&(e=u)}}return e}s=s||0;for(var l=t.length;l>0&&t[l-1][2]>s;l--)t[l]=t[l-1];t[l]=[i,n,s]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};o.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,s,r=i[0],a=i[1],c=i[2],u=0;if(r.some((function(e){return 0!==t[e]}))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(c)var l=c(o)}for(e&&e(i);u<r.length;u++)s=r[u],o.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return o.O(l)},i=self["webpackChunkclient"]=self["webpackChunkclient"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=o.O(void 0,[998],(function(){return o(1911)}));i=o.O(i)})();
//# sourceMappingURL=app-legacy.67f80924.js.map