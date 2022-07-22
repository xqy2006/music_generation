import Vue from 'vue'
import App from './components/App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 vue-ele-form
import EleForm from 'vue-ele-form'
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false

// 注册 element-ui
Vue.use(ElementUI)

// 注册 vue-ele-form
Vue.use(EleForm)
Vue.use(VueCookies)

new Vue({
  render: h => h(App)
}).$mount('#app')