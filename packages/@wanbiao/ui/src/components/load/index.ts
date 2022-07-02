import { App } from 'vue';
import WbLoad from './index.vue';
WbLoad.install = (app: App) => {
  app.component(WbLoad.name, WbLoad);
};
export default WbLoad;
