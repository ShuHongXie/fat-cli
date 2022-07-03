export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

import { app } from '@storybook/vue3';
import config from '@/config/index';
import installLazy from '@/directives/lazy';

app.config.globalProperties.OSS = config.OSS['production'];
app.config.globalProperties.OSS_STATIC = config.OSS.static;
app.config.globalProperties.ERROR_IMG = config.PIC.errorPage;
installLazy(app);
