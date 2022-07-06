import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import config from '@/config/index';
import installLazy from '@/directives/lazy';

import WbUI from '../dist';
import '../dist/style.css';
// import WbList from './package/list';
// import all from './package';
// console.log(all);

const app = createApp(App).use(router).use(WbUI);

app.config.globalProperties.OSS = config.OSS[process.env.NODE_ENV as 'development' | 'production'];
app.config.globalProperties.OSS_STATIC = config.OSS.static as string;
app.config.globalProperties.ERROR_IMG = config.PIC.errorPage as string;
installLazy(app);
app.mount('#app');
