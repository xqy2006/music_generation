<template>
  <div id="vue">
  <div class="outer"><p style="margin-top: 0px;margin-bottom: 0px;"><p321>&nbsp;</p321></p></div>
  <div class="outer"><p style="margin-top: 0px;margin-bottom: 0px;"><p123>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xuqinyang</p123></p></div>
  <div class="outer"><p style="margin-top: 0px;margin-bottom: 0px;"><p321>&nbsp;</p321></p></div>
  <div id ="form">
  <ele-form
    v-bind="formConfig"
    v-model="formData"
    :request-fn="handleRequest"
    @request-success="handleRequestSuccess"
  />
  </div>
    </div>
</template>
<style>
p {
    display: block;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    letter-spacing:5px;
}
body {
    display: block;
    margin: 0px;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    background-color: #F2F6FC;
}
p123 {
font-size:30px;
margin-top: 0px;
color: #FFFFFF;
}
p321 {
font-size:0px;
color: #FFFFFF;
}
.outer {
	line-height:15px;
      width: 100%;
      height: 30%;
      background-color: #409EFF; 
    }
.form{
	background-color: #409EFF;
}
</style>
<script>
import axios from 'axios';
import Utils from '@/utils.js'
export default {
  data() {
    var validQC = (rule, value, callback) => {
      if (value) {
        if (/[\u0020-\u4DFF]/g.test(value)) {
		//this.$set(this.formData, "input",value.replace(/[^\u4e00-\u9fa5]/g, ''));
	      callback(new Error("只能输入汉字"));
		}
        } else {
        // 验证通过
          callback();
        }
	  if (/[\u9FA6-\uFFFF]/g.test(value)) {
		//this.$set(this.formData, "input",value.replace(/[^\u4e00-\u9fa5]/g, ''));
          	callback(new Error("只能输入汉字"));
		} else {
		    callback();
        callback();
      }
    };
    return {
      formData: {},
      formConfig: {
        order: [
          "time",
          "input",
          "mybutton",
        ],
        rules: {
		input: [{ required: true, type: 'string', message: '必须填写歌词' },{validator:validQC,message: "请输入中文歌词，无标点"}]
        },
	  labelPosition: "top",
        formDesc: {
          time: {
            type: "text",
            label: "",
            isOptions: false,
            default: "text→music:一个可以自动根据歌词进行谱曲的AI"+'\r\n'+"在20首儿歌的数据集上训练了10K step得到的模型"
          },
          input: {
            type: "textarea",
            label: "请输入要谱曲的歌词（只能是中文，无标点）",
          },
	    mybutton: {
            type: "button",
            label: "按钮",
            default: "去除所有非中文字符",
            isShowLabel: false,
            on: {
      // 按钮事件触发
      click: () => {
        this.$set(this.formData, "input",this.formData.input.replace(/[^\u4e00-\u9fa5]/g, ''));
        var url = window.location.href ;             //获取当前url
        var dz_url = url.split('#')[0];                //获取#/之前的字符串
        var cs = dz_url.split('?')[1];                //获取?之后的参数字符串
        var cs_arr = cs.split('&');                    //参数字符串分割为数组
        var cs1={};
        for(var i=0;i<cs_arr.length;i++){         //遍历数组，拿到json对象
          cs1[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
        }
        this.id = cs1.code;                                           //这样就拿到了参数中的数据
        console.log(this.id);
        fetch(
		    "https://api.github.com/repos/xqy2006/music_generation/issues",
		{
      headers: {Authorization: "token ghu_bcnIDkgmxGEd4Ol1mxWJeu7u0TCNQy2wmK1Q","Content-Type":'application/json'  },
			method: "POST",
      mode: 'cors',
			body: JSON.stringify({
        access_token:"ghu_bcnIDkgmxGEd4Ol1mxWJeu7u0TCNQy2wmK1Q",
        title: 'music_generation',
        body: '### 歌词\n\n'+,
        labels: [
          'music_generation'
        ]
      }),
		}
	).then(response => response.json())
	.then(json => console.log(json))
  .catch(this.$set(this.formData, "result","结果：模型正在加载中，请等待30秒后再试\n")); 
            },
            attrs: {
              round: false,
              plain: true,
              circle: false,
              nativeType: "button",
              type: "info"
            }
            }
        }
        }
      }
    };
  },
  methods: {
    handleRequest(data) {
let loading = this.$loading({
        lock: true,//lock的修改符--默认是false
        text: "加载中，请稍候...",//显示在加载图标下方的加载文案
        background: "rgba(255,255,255,0.8)",//遮罩层颜色
      });
	axios.defaults.withCredentials = true;
	const path = 'http://82.157.179.249:8080/api';
	this.$set(data, "time",Utils.Encrypt(new Date().getTime()));
      axios.get(path,{params:data})
      .then(response=>{

  	setTimeout(() => {
	window.location.href=response.data.result
      loading.close();
  	}, 3000)

      });
      return Promise.resolve();
    },
    handleRequestSuccess() {
      this.$message.success("提交成功");
    }
  }
};
</script>
