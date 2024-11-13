import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import '@/assets/cust-elementplus.scss'
import '@/assets/icon/iconfont.css'
import '@/assets/base.scss'
import Request from './utlis/Request'
import message from './utlis/Message'
import Api from './utlis/Api'
import * as Pinia from 'pinia'
import Layout from './components/Layout.vue'


import router from '@/router'

const app=createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(Pinia.createPinia())

app.component("Layout",Layout)

app.config.globalProperties.Request=Request;
app.config.globalProperties.message=message;
app.config.globalProperties.Api=Api;

app.mount('#app');


