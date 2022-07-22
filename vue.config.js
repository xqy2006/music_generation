module.exports = {
	publicPath: './', //项目的公共路径
    devServer: {    //开发用的服务器配置
        proxy: {
            '/api': {
                target: 'https://xuqinyang-github.azurewebsites.net/api/HttpTrigger1',  //这里是目标服务器地址
                changeOrigin: true, //是否改变源地址
                ws: true,  //是否支持websocket协议
                pathRewrite: {  //路径重写
                    '^/api': ''       //这里一定要为空
                }
            }
        }
    }
}
