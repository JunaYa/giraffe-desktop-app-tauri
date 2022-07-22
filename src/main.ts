import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import type { LogtoConfig } from '@logto/vue'
import { createLogto } from '@logto/vue'
import App from './App.vue'
import registerTrack from './common/directives/track'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import Axios from './apis/ajax'

const config: LogtoConfig = {
  endpoint: 'https://3001-logtoio-logto-icf8geyvtc5.ws-us54.gitpod.io',
  appId: '4B1rrU3ptVn2ko0kJixbj',
}

const app = createApp(App)
app.use(createLogto, config)

// 全局注册元素自动埋点指令
registerTrack(app)
if (import.meta.env.PROD) {
  // 向追踪服务报告错误
  app.config.errorHandler = (err, instance, info) => {
    track('app-error', {
      err,
      instance,
      info,
    })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const head = createHead()
app.use(head)
app.use(router)
app.provide('$http', Axios)
app.mount('#app')
