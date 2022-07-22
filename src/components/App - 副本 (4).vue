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
//import axios from 'axios';
//import Utils from '@/utils.js'
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
          "mybutton1",
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
            disabled: window.location.href.includes("code")!==true,
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
            },
            attrs: {
              round: false,
              plain: true,
              circle: false,
              nativeType: "button",
              type: "info"
            }
            }
        },
        mybutton1: {
            type: "button",
            label: "按钮",
            default: "登录github账号（必须）",
            isShowLabel: false,
            on: {
      // 按钮事件触发
      click: () => {
        window.location.href="https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae"
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
        if (window.location.href.includes("code")!==true){
          window.location.href="https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae"
        }
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
        if (this.ok!=1){
        this.ok=1;

        var axios = require('axios');

var config = {
   method: 'get',
   url: 'https://xuqinyang-github.azurewebsites.net/api/HttpTrigger1?code=GdReemTxYFEwbsXixrahXbTwjqEpAJjqM_MPv_LDImWkAzFuziHQNw==&code123='+this.id,
};

axios(config)
.then((response)=>{
   console.log(response.data);
   fetch(
		    "https://api.github.com/repos/xqy2006/music_generation/issues",
		{
      headers: {Authorization: "token "+response.data,"Content-Type":'application/json'  },
			method: "POST",
      mode: 'cors',
			body: JSON.stringify({
        access_token:response.data,
        title: 'music_generation',
        body: '### 歌词\n\n'+data['input'],
        labels: [
          'music_generation'
        ]
      }),
		}
	).then(response => response.json())
	.then(json => window.location.href=json['html_url'])
})
.catch(function (error) {
   console.log(error);
});
        
        }
        
      return Promise.resolve();
    },
    handleRequestSuccess() {
      this.$message.success("提交成功");
    }
  }
};
</script>
