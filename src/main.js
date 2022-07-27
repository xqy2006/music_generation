import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import VueCookies from 'vue-cookies';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

app.use(ElementPlus)
app.use(VueCookies)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
