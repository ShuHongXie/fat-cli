import { App } from 'vue';
import WbIcon from './index.vue';
WbIcon.install = (app: App) => {
  app.component(WbIcon.name, WbIcon);
};
export default WbIcon;
