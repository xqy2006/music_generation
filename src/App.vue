<template>
<div id="vue">
    <div class="outer">
        <p style="margin-top: 0px;margin-bottom: 0px;">
            <p321>&nbsp;</p321>
        </p>
    </div>
    <div class="outer">
        <p style="margin-top: 0px;margin-bottom: 0px;">
            <p123>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;u&nbsp;q&nbsp;i&nbsp;n&nbsp;y&nbsp;a&nbsp;n&nbsp;g</p123>
        </p>
    </div>
    <div class="outer">
        <p style="margin-top: 0px;margin-bottom: 0px;">
            <p321>&nbsp;</p321>
        </p>
    </div>
    <div id="form" style="margin-inline-start: 50px;margin-inline-end: 50px;">
        <p style="margin-top: 12px;font-size: 24px;">AI音乐生成</p>
        <el-input style="margin-top: 12px;" v-model="textarea" :rows="8" type="textarea" placeholder="请输入要谱曲的歌词（只能是中文，无标点）" />
        <div>
            <el-button style="margin-top: 20px;padding: 20px 20px;" type="primary" @click="Chinese()">去除所有非中文字符</el-button>
        </div>
        <div>
            <el-button v-if="islogin" style="margin-top: 20px;padding: 20px 20px;" type="success" @click="Login()">登录</el-button>
            <el-button v-if="islogin==false" style="margin-top: 20px;padding: 20px 20px;" type="danger" @click="Logout()">退出账号登录</el-button>
        </div>
        <div>
            <el-button style="margin-top: 20px;padding: 20px 20px;" type="primary" @click="Submit()">提交</el-button>
        </div>
    </div>
    <div style="margin-top: 20px;">
        <a style="margin-inline-start: 50px; font-size: 20px;">历史记录：</a>
        <el-button style="padding: 20px 20px;" type="primary" @click="RefreshComments()">刷新<el-icon class="el-icon--right">
                <Refresh />
            </el-icon>
        </el-button>
    </div>
    <el-card v-for="o in comments" :key="o" class="box-card" shadow="hover">
        <a style="display: block">{{ o.message }}</a>
        <div style="margin-top: 5px;" v-if="o.urlmessage">
            <el-button style="padding: 20px 20px;" type="primary" @click="Dowloadmp3(o.url)">下载mp3<el-icon class="el-icon--right">
                    <Download />
                </el-icon>
            </el-button>
        </div>
        <div style="margin-top: 5px;" v-if="o.urlmessage">
            <el-button style="padding: 20px 20px;" type="primary" @click="Dowloadmidi(o.url)">下载midi<el-icon class="el-icon--right">
                    <Download />
                </el-icon>
            </el-button>
        </div>
        <div style="margin-top: 5px;" v-if="o.urlmessage">
            <el-button style="padding: 20px 20px;" type="primary" @click="Dowloadxml(o.url)">下载MusicXML<el-icon class="el-icon--right">
                    <Download />
                </el-icon>
            </el-button>
        </div>
    </el-card>
</div>
</template>

<style>
.box-card {
    margin-top: 12px;

    margin-inline-start: 50px;
    margin-inline-end: 50px;
}

.text {

    font-size: 15px;
}

@media screen and (max-width: 500px) {
    .el-message {
        min-width: 300px !important;
    }
}

@media screen and (max-width: 500px) {
    .el-message-box {
        width: 300px !important;
    }
}

@media screen and (max-width: 500px) {
    .el-dialog__wrapper .el-dialog {
        width: 300px !important;

        .el-dialog__body {
            padding: 10px 20px !important;

            .el-form-item__label {
                width: 68px !important;
            }

            .el-select,
            .el-input {
                width: 180px !important;
            }
        }
    }
}

p {
    display: block;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    letter-spacing: 0px;
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
    font-size: 30px;
    margin-top: 0px;
    color: #FFFFFF;
}

p321 {
    font-size: 0px;
    color: #FFFFFF;
}

.outer {
    line-height: 15px;
    width: 100%;
    height: 30%;
    background-color: #409EFF;
}

.form {
    background-color: #409EFF;
}
</style>

<script>
//import axios from 'axios';
import axios from 'axios'
import {
    ElNotification
} from 'element-plus'
//import Utils from '@/utils.js'
export default {
    created() {
        if (this.$cookies.isKey('token')) {
            this.islogin = false
        } else {
            this.islogin = true
        }
        if (window.location.href.includes("state")) {
            var cs_arr1 = window.location.href.split('#')[0].split('?')[1].split('&');
            var cs2 = {};
            for (var i = 0; i < cs_arr1.length; i++) {
                cs2[cs_arr1[i].split('=')[0]] = cs_arr1[i].split('=')[1]
            }
            this.textarea = decodeURI(cs2.state)
        }
        this.$cookies.set("test", '', {
            expires: "-1"
        });
        if (navigator.cookieEnabled == false || this.$cookies.isKey('test') == false) {
            this.$alert('请启用cookie以使用本网站功能', '未启用cookie', {
                confirmButtonText: '刷新',
                showClose: false,
                callback: action => {
                    if (action == 'confirm') {
                        window.location.reload()
                    }
                },
            });
        }
        this.$cookies.remove('test')
        if (this.$cookies.isKey('token') == false) {
            this.num = 1
            this.comments = [{
                url: 'https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae',
                urlmessage: false,
                message: '登录后即可查看历史记录\n'
            }]
        }
        if (window.location.href.includes("code")) {
            this.$loading({
                lock: true, //lock的修改符--默认是false
                text: "加载中，请稍候...", //显示在加载图标下方的加载文案
                background: "rgba(255,255,255,0.8)", //遮罩层颜色
            });
            var url = window.location.href; //获取当前url
            var dz_url = url.split('#')[0]; //获取#/之前的字符串
            var cs = dz_url.split('?')[1]; //获取?之后的参数字符串
            var cs_arr = cs.split('&'); //参数字符串分割为数组
            var cs1 = {};
            for (var i = 0; i < cs_arr.length; i++) { //遍历数组，拿到json对象
                cs1[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
            }
            this.id = cs1.code;
            this.textdata = cs1.state //这样就拿到了参数中的数据

            var config = {
                method: 'get',
                url: 'https://xuqinyang-github.azurewebsites.net/api/HttpTrigger1?code=GdReemTxYFEwbsXixrahXbTwjqEpAJjqM_MPv_LDImWkAzFuziHQNw==&code123=' + this.id,
            };
            var _this = this
            axios(config)
                .then((response) => {
                    if (response.data.includes("gh")) {
                        _this.$cookies.set("token", response.data, {
                            expires: "30D"
                        });
                    }
                    fetch(
                            "https://api.github.com/user", {
                                headers: {
                                    Authorization: "token " + response.data
                                },
                                method: "GET",
                                mode: 'cors',
                            }
                        ).then(response => response.json())
                        .then(json => {
                            if (this.$cookies.isKey('login') == false) {
                                this.$cookies.set("login", json["login"], {
                                    expires: "30D"
                                });
                                this.login = json["login"]
                            }
                            if (typeof this.textarea == 'undefined' || this.textarea == '') {
                                window.location.href = "https://" + location.hostname + location.pathname
                            } else {
                                window.location.href = "https://" + location.hostname + location.pathname + '?state=' + this.textarea
                            }
                        })

                })
        }
        if (this.$cookies.isKey('login') && this.$cookies.isKey('token')) {
            this.login = this.$cookies.get('login')
        }
        this.isTimeOut(this);
    },
    data() {
        return {
            islogin: false,
            ischinese: false,
            textarea: '',
            timeOut: '',
            login: '',
            textdata: '',
            comments: [{
                message: '登录后即可查看历史记录\n',
                url: 'https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae',
                urlmessage: false
            }],
        };
    },
    watch: {
        login: function () {
            var usertoken = this.$cookies.get('token')
            var login = this.$cookies.get('login')
            fetch(
                    "https://api.github.com/repos/xqy2006/music_generation/issues?state=closed&per_page=100&creator=" + login, {
                        headers: {
                            Authorization: "token " + usertoken
                        },
                        method: "GET",
                        mode: 'cors',
                    }
                ).then(response => response.json())
                .then(json => {
                    this.comments = [];
                    json.forEach(comment => {
                        this.comments.push({
                            url: 'https://xqy2006.github.io/music_generation/music/' + comment["number"],
                            urlmessage: true,
                            message: comment["body"].slice(8) + "\n"
                        });
                    });
                })

        },
        textarea: function () {
            if (this.textarea) {
                if (/[\u0020-\u4DFF]/g.test(this.textarea)) {
                    //this.$set(this.formData, "input",value.replace(/[^\u4e00-\u9fa5]/g, ''));
                    this.ischinese = false
                } else {
                    // 验证通过
                    if (/[\u9FA6-\uFFFF]/g.test(this.textarea)) {
                        //this.$set(this.formData, "input",value.replace(/[^\u4e00-\u9fa5]/g, ''));
                        this.ischinese = false
                    } else {
                        if (this.textarea.indexOf("\n") > 0) {
                            this.ischinese = false
                        } else {
                            this.ischinese = true
                        }
                    }

                }
            } else {
                this.ischinese = false
            }

        }
    },
    methods: {
        Chinese() {
            this.textarea = this.textarea.replace(/[^\u4e00-\u9fa5]/g, '')
        },
        Dowloadmp3(url) {
            window.open(url + '.mp3');
        },
        Dowloadmidi(url) {
            window.open(url + '.midi');
        },
        Dowloadxml(url) {
            window.open(url + '.xml');
        },
        Login() {
            if (this.$cookies.isKey('token')) {
                this.$message.error('您已登录');
            } else {
                if (typeof this.textarea == 'undefined' || this.textarea == '') {
                    window.location.href = "https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae"
                } else {
                    window.location.href = "https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae&state=" + this.textarea
                }
            }
        },
        Logout() {
            if (this.$cookies.isKey('token')) {
                if (this.$cookies.isKey('token')) {
                    this.$cookies.remove('token')
                }
                if (this.$cookies.isKey('login')) {
                    this.$cookies.remove('login')
                }
                this.$message({
                    message: '您已退出登录',
                    type: 'success'
                });
                window.location.reload()
            } else {
                if (this.$cookies.isKey('token')) {
                    this.$cookies.remove('token')
                }
                if (this.$cookies.isKey('login')) {
                    this.$cookies.remove('login')
                }
                this.$message.error('您还未登录');
            }
        },
        RefreshComments() {
            if (this.$cookies.isKey('login') && this.$cookies.isKey('token')) {
                var usertoken = this.$cookies.get('token')
                var login = this.$cookies.get('login')
                fetch(
                        "https://api.github.com/repos/xqy2006/music_generation/issues?state=closed&per_page=100&creator=" + login, {
                            headers: {
                                Authorization: "token " + usertoken
                            },
                            method: "GET",
                            mode: 'cors',
                        }
                    ).then(response => response.json())
                    .then(json => {
                        console.log("refresh");
                        this.comments = [];
                        json.forEach(comment => {
                            this.comments.push({
                                url: 'https://xqy2006.github.io/music_generation/music/' + comment["number"],
                                urlmessage: true,
                                message: comment["body"].slice(8) + "\n"
                            });
                        });

                    })

            }
            this.$message({
                message: '刷新成功',
                type: 'success'
            });
        },
        Submit() {
            var data = this.textarea
            if (this.ischinese == false) {
                ElNotification({
                    title: '错误',
                    message: '歌词中包含非中文字符',
                    type: 'error',
                })
            } else {
                if (this.$cookies.isKey('token')) {
                    let loading = this.$loading({
                        lock: true, //lock的修改符--默认是false
                        text: "加载中，请稍候...", //显示在加载图标下方的加载文案
                        background: "rgba(255,255,255,0.8)", //遮罩层颜色
                    });
                    var githubtoken = this.$cookies.get('token')
                    fetch(
                            "https://api.github.com/repos/xqy2006/music_generation/issues", {
                                headers: {
                                    Authorization: "token " + githubtoken,
                                    "Content-Type": 'application/json'
                                },
                                method: "POST",
                                mode: 'cors',
                                body: JSON.stringify({
                                    access_token: githubtoken,
                                    title: 'music_generation',
                                    body: '### 歌词\n\n' + this.textarea,
                                    labels: [
                                        'music_generation'
                                    ]
                                }),
                            }
                        ).then(response => response.json())
                        .then(json => {
                            window.open(json['html_url'], '_blank');
                            loading.close();
                        })
                } else {

                    this.$alert('请先登录GitHub', '未登录GitHub', {
                        confirmButtonText: '登录',
                        callback: action => {
                            if (action == 'confirm') {
                                window.location.href = "https://github.com/login/oauth/authorize/?client_id=Iv1.3834dcfa06a1a6ae&state=" + this.textarea;
                            }
                        },
                    });
                }
                return Promise.resolve();
            }
        },
        startTimer(_this) {
            let that = _this;
            clearInterval(that.timeOut);
            that.timeOut = setInterval(function () {
                if (this.$cookies.isKey('login') && this.$cookies.isKey('token')) {
                    var usertoken = _this.$cookies.get('token')
                    var login = _this.$cookies.get('login')
                    fetch(
                            "https://api.github.com/repos/xqy2006/music_generation/issues?state=closed&per_page=100&creator=" + login, {
                                headers: {
                                    Authorization: "token " + usertoken
                                },
                                method: "GET",
                                mode: 'cors',
                            }
                        ).then(response => response.json())
                        .then(json => {
                            console.log("refresh");
                            _this.comments = [];
                            json.forEach(comment => {
                                _this.comments.push({
                                    url: 'https://xqy2006.github.io/music_generation/music/' + comment["number"],
                                    urlmessage: true,
                                    message: comment["body"].slice(8) + "\n"
                                });
                            });

                        })

                }
            }, 1000 * 60)
        },
        isTimeOut(_this) {
            _this.startTimer(_this);
        },

    }
};
</script>
