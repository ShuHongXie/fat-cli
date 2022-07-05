import { App } from 'vue';
import WbList from './index.vue';
WbList.install = (app: App) => {
  console.log('开始调用list');
  app.component(WbList.name, WbList);
};
export default WbList;
