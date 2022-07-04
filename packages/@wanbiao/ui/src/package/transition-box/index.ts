import { App } from 'vue';
import WbTransitionBox from './index.vue';
WbTransitionBox.install = (app: App) => {
  app.component(WbTransitionBox.name, WbTransitionBox);
};
export default WbTransitionBox;
