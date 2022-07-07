import components from './components';
import installLazyDirective from './directives/lazy';

import type { App } from 'vue';

const install = (app: App): void => {
  for (const key in components) {
    console.log(key, components[key]);
    const item = components[key];
    app.use(item);
  }
  installLazyDirective(app);
};

export default { install, title: '总入口' };
