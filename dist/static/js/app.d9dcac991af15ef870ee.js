webpackJsonp([1],{"1uuo":function(e,t){},"3RdB":function(e,t){},"56wc":function(e,t){},"7bbz":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),r={name:"sidebar",data:function(){return{selection_props:{children:"children",label:"label"},selection:[]}},methods:{seletion_click:function(e){console.log("selection here "+e)},expandContent:function(e){console.log(e)}},created:function(){null===localStorage.getItem("counts")&&localStorage.setItem("counts",0);var e=localStorage.getItem("title_index");if(null===e)localStorage.setItem("title_index","no_articles_here");else{for(var t=e.split("\0"),n=[],i=0;i<t.length;i++){var r=localStorage.getItem(t[i]);n=n.concat({label:t[i],children:[{label:r}]})}this.selection=this.selection.concat(n)}}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("el-container",[t("el-tree",{ref:"tree",staticClass:"sidebar",attrs:{data:this.selection,props:this.selection_props,"node-key":"id","highlight-current":!0},on:{"node-click":this.expandContent}})],1)],1)},staticRenderFns:[]};var a=n("VU/8")(r,o,!1,function(e){n("mkzD")},"data-v-21b88767",null).exports,l=n("7nRM"),s=n.n(l),c=n("d7EF"),u=n.n(c),f=n("OvRC"),d=n.n(f),h=new i.default;function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;arguments[1];1==e?(this.name="modeError",this.stack=(new Error).stack):2==e&&(this.name="modeError",this.stack=(new Error).stack)}m.prototype=d()(Error.prototype),m.prototype.constructor=m;var p={name:"editor",data:function(){return{Buffer:{startEdited:0,endEdited:0,lastEdited:0,timerLocked:!1,firstLocked:!1,buffer1:null,buffer2:null,timer:null,timeElapse:1e4,bufferLen:0,editedLen:0},empty:"",htmlText:"内容将会在这里显示",tempText:"",input_portal:document.getElementById("editor_main"),box_size:{minRows:14},msg:""}},methods:{testSelect:function(e){var t=window.getSelection().toString(),n=document.getElementById("editor_main"),i=n.selectionStart,r=n.selectionEnd-i,o=this.find_html(this.htmlText,t,i,r),a=u()(o,2);a[0],a[1]},checkEdited:function(e,t,n,i){var r=e.slice(0,t+1),o=e.slice(n+1,e.length),a=void 0,l=void 0;if(1==i?(a="<i>",l="</i>"):2==i?(a="<b>",l="</b>"):3==i&&(a="<u>",l="</u>"),-1!=r.lastIndexOf(a)){var s=[r.lastIndexOf(a),r.lastIndexOf(l)];s[0]>s[1]&&1}if(-1!=o.lastIndexOf(l)){var c=[o.indexOf(a),o.indexOf(l)];c[0]>c[1]&&1}},getTextSelection:function(){var e=document.getElementById("editor_main");return[e.selectionStart,e.selectionEnd,window.getSelection().toString()]},whole_wrapper:function(e,t){var n=e,i=[n.indexOf("<i>"),n.indexOf("<b>"),n.indexOf("<u>")],r=i[0],o=i[1],a=i[2],l="\0\0\0",s="\0\0\0\0";if(0===t)for(;r+o+a>-3;){var c=[(n=n.replace("<u>","").replace("</u>","").replace("<i>","").replace("</i>","").replace("<b>","").replace("</b>","")).indexOf("<i>"),n.indexOf("<b>"),n.indexOf("<u>")];r=c[0],o=c[1],a=c[2]}else if(1===t)for(;r+o+a>-3;){var u=[(n=n.replace("<u>",l).replace("</u>",s).replace("<i>",l).replace("</i>",s).replace("<b>",l).replace("</b>",s)).indexOf("<i>"),n.indexOf("<b>"),n.indexOf("<u>")];r=u[0],o=u[1],a=u[2]}return n},remove_wrapper:function(e,t,n){if(1==n){if(t.length>1)throw new m("替换字符串过长！");for(;-1!=e.indexOf(t);)e=e.replace(t,"")}return e},find_html:function(e,t,n,i){for(var r=this.whole_wrapper,o=this.remove_wrapper,a=t[0],l=t[i-1],s=0,c=0,u=r(e,1),f=n;;){if(s=u.indexOf(a),o(u.slice(0,s+1),"\0",1).indexOf(a)==f)break;u=u.replace(a,"\f")}for(;(c=u.indexOf(l))<s;)u=u.replace(l,"\f");for(;;){var d=u.slice(s,u.length+1);if(c=d.indexOf(l),o(d,"\0",1).indexOf(l)+1==i){c+=s;break}u=u.replace(l,"\f")}return[s,c]},changeStyle:function(e){var t=this.getTextSelection(),n=u()(t,3),i=n[0],r=n[1],o=n[2],a=(document.getElementById("editor_main"),document.getElementById("show_pad")),l=a.innerHTML.length,s=this.find_html(a.innerHTML,o,i,r-i),c=u()(s,2);i=c[0],r=c[1],r+=1;var f=a.innerHTML.slice(0,i),d=a.innerHTML.slice(r,l),h=null;if(1==e)h=o.italics();else if(2==e)h=o.bold();else{if(3!=e)throw new m(1,"要求转换字体类型错误");h="<u>"+o+"</u>"}return f+h+d},italic_operation:function(e){1==e&&(this.htmlText=this.changeStyle(1))},bold_operation:function(e){1==e&&(this.htmlText=this.changeStyle(2))},underline_operation:function(e){1==e&&(this.htmlText=this.changeStyle(3))},clearText:function(e){1===e&&(this.tempText=this.empty,this.htmlText=this.empty)},recordBuffer:function(){var e=document.getElementById("editor_main");this.Buffer;if(this.Buffer.endEdited=this.Buffer.startEdited+this.Buffer,this.Buffer.startEdited!=this.Buffer.endEdited){var t=e.value.slice(0,this.Buffer.startEdited+1),n=e.valie.slice(this.Buffer.startEdited,this.Buffer.endEdited),i=this.find_html(this.htmlText,t,0,t.length);s()(i).slice(0);0,null==this.Buffer.buffer1&&null==this.Buffer.buffer2?this.Buffer.buffer1=n:null!=this.Buffer.buffer1&&(this.Buffer.buffer2=this.Buffer.buffer1,this.Buffer.buffer1=n),this.Buffer.firstLocked=!1,this.Buffer.lastEdited=this.Buffer.startEdited,this.Buffer.editedLen=this.Buffer.bufferLen}},resetLock:function(){0==this.Buffer.timerLocked?(this.Buffer.timerLocked=!0,this.Buffer.timer=setTimeout(this.recordBuffer.bind(this),this.Buffer.timeElapse)):(clearTimeout(this.Buffer.timer),this.Buffer.timer=setTimeout(this.recordBuffer.bind(this),this.Buffer.timeElapse))},save:function(e){var t=0;if(0===e.length||""==e||"请输入标题"==e)return console.log("save operation error\n"),-1;var n=this.htmlText;if("no_articles_here"===localStorage.getItem("title_index")[0])localStorage.setItem("title_index",e);else{var i=localStorage.getItem("title_index");i+="\0"+e,localStorage.setItem("title_index",i)}return localStorage.setItem(e,n),t+=1,console.log(t),0}},created:function(){var e=this;document.onkeyup=function(){var t=document.getElementById("editor_main").value;e.tempText=t,e.htmlText=t},document.onkeydown=function(){},h.$on("aaa",function(t){e.msg=t,console.log(e.msg)}),h.$on("italic",function(t){return e.italic_operation(t)}),h.$on("bold",function(t){return e.bold_operation(t)}),h.$on("underline",function(t){return e.underline_operation(t)}),h.$on("clear",function(t){return e.clearText(t)}),h.$on("save",function(t){return e.save(t)}),h.$on("test",function(t){return e.testSelect(t)})},mounted:function(){}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"editor_bgc"},[n("el-input",{staticClass:"editor_main2",attrs:{id:"editor_main",type:"textarea",placeholder:"请写下一些东西吧~",resize:"none",autosize:e.box_size},model:{value:e.tempText,callback:function(t){e.tempText=t},expression:"tempText"}}),e._v(" "),n("div",{staticClass:"show_pad2",attrs:{id:"show_pad"},domProps:{innerHTML:e._s(e.htmlText)}})],1)},staticRenderFns:[]};var _=n("VU/8")(p,v,!1,function(e){n("7bbz")},"data-v-4596ec59",null).exports,b={name:"headbox",data:function(){return{title:"请输入标题",h:"helloworld!"}},methods:{logIt:function(e){console.log("press it "+e)},save:function(){h.$emit("save",this.title)},italic:function(){h.$emit("italic",1)},bold:function(){h.$emit("bold",1)},underline:function(){h.$emit("underline",1)},clear:function(){h.$emit("clear",1)},testSelect:function(){h.$emit("test",1)}}},g={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"headbox"},[n("el-input",{staticClass:"title_bar",attrs:{placeholder:"标题","prefix-icon":"el-icon-document-add"},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),e._v(" "),n("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:e.bold}},[e._v("粗体")]),e._v(" "),n("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:e.italic}},[e._v("斜体")]),e._v(" "),n("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:e.underline}},[e._v("下划线")]),e._v(" "),n("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:e.clear}},[e._v("清空")]),e._v(" "),n("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)},staticRenderFns:[]};var x={name:"App",components:{sidebar:a,editor:_,headbox:n("VU/8")(b,g,!1,function(e){n("56wc")},"data-v-45ab5e54",null).exports},methods:{a:function(){console.log("helloworld")}}},B={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("sidebar"),this._v(" "),t("headbox"),this._v(" "),t("editor")],1)},staticRenderFns:[]};var k=n("VU/8")(x,B,!1,function(e){n("3RdB")},null,null).exports,E=n("/ocq"),w={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),e._v(" "),n("h2",[e._v("Essential Links")]),e._v(" "),e._m(0),e._v(" "),n("h2",[e._v("Ecosystem")]),e._v(" "),e._m(1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[e._v("\n        Core Docs\n      ")])]),e._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[e._v("\n        Forum\n      ")])]),e._v(" "),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[e._v("\n        Community Chat\n      ")])]),e._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[e._v("\n        Twitter\n      ")])]),e._v(" "),n("br"),e._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("\n        Docs for This Template\n      ")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};n("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},w,!1,function(e){n("1uuo")},"data-v-d8ec41bc",null).exports;i.default.use(E.a);var y=new E.a({routes:[{path:"/",name:"index",component:_}]}),T=n("kciL");i.default.use(T.a);var S=new T.a.Store({state:{italic:10010,bold:0},mutations:{toItalic:function(e){0==e.italic?e.italic=1:e.italic=0}}}),I=n("bQIR"),O=n.n(I);n("gFLX"),n("Z5Wq");i.default.config.productionTip=!1,i.default.use(O.a),new i.default({el:"#app",router:y,store:S,components:{App:k},template:"<App/>"})},Z5Wq:function(e,t){},gFLX:function(e,t){},mkzD:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.d9dcac991af15ef870ee.js.map