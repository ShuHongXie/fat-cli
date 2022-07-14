import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import '@/styles/index.scss';

import '@/assets/icons';

const { mockXHR } = require('../mock');
mockXHR();

import SvgIcon from './components/SvgIcon/index.vue';
const app = createApp(App);
app.component('svg-icon', SvgIcon);
app.use(ElementPlus).use(store).use(router).mount('#app');
