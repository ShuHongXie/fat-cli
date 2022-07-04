import { App } from 'vue';
import WbLoading from './index.vue';
WbLoading.install = (app: App) => {
  app.component(WbLoading.name, WbLoading);
};
export default WbLoading;
