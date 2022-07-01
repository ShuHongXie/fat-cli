import { App } from 'vue';
import WbList from './index.vue';
WbList.install = (app: App) => {
  app.component(WbList.name, WbList);
};
export default WbList;
