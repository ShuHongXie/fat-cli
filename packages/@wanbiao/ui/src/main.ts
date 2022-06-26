import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import config from '@/config/index'
import installLazy from '@/directives/lazy'

const app = createApp(App).use(router)

app.config.globalProperties.OSS = config.OSS[process.env.NODE_ENV as 'development' | 'production']
app.config.globalProperties.OSS_STATIC = config.OSS.static as string
app.config.globalProperties.ERROR_IMG = config.PIC.errorPage as string
installLazy(app)
app.mount('#app')
