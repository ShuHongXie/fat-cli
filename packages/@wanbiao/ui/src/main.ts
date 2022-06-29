import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import image from '../packages/image/image.js'

import config from '@/config/index'
import installLazy from '@/directives/lazy'

const app = createApp(App).use(router)
app.use(image)

app.config.globalProperties.OSS = config.OSS[process.env.NODE_ENV as 'development' | 'production']
app.config.globalProperties.OSS_STATIC = config.OSS.static as string
app.config.globalProperties.ERROR_IMG = config.PIC.errorPage as string
installLazy(app)
app.mount('#app')
