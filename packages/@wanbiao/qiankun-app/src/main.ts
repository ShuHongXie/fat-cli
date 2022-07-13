import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import '@/styles/index.scss';

const { mockXHR } = require('../mock');
mockXHR();

import SvgIcon from './components/SvgIcon/index.vue';

const req = require.context('./icons/svg', false, /\.svg$/);
console.log(req);

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
requireAll(req);

const app = createApp(App);
app.component('svg-icon', SvgIcon);
app.use(ElementPlus).use(store).use(router).mount('#app');
