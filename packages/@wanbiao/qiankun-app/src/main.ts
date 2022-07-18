import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import '@/assets/icons';
import '@/permission';

const { mockXHR } = require('../mock');
mockXHR();

import { registerMicroApps } from 'qiankun';

registerMicroApps(
  [
    {
      name: 'micro-qiankun-app',
      entry: '//localhost:9001',
      container: '#container',
      activeRule: '/micro'
    }
  ],
  {
    // @ts-ignore
    beforeLoad: (app) => console.log('before load', app.name),
    // @ts-ignore
    beforeMount: [(app) => console.log('before mount', app.name)]
  }
);

import SvgIcon from './components/SvgIcon/index.vue';
const app = createApp(App);
app.component('svg-icon', SvgIcon);
app.use(ElementPlus).use(store).use(router).mount('#app');
