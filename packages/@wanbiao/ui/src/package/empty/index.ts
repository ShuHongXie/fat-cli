import { App } from 'vue';
import WbEmpty from './index.vue';
WbEmpty.install = (app: App) => {
  app.component(WbEmpty.name, WbEmpty);
};
export default WbEmpty;
