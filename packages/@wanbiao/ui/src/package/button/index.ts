import { App } from 'vue';
import WbButton from './index.vue';
WbButton.install = (app: App) => {
  app.component(WbButton.name, WbButton);
};
export default WbButton;
