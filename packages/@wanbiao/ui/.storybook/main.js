const path = require('path');

module.exports = {
  stories: ['../src/package/**/*.(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss' // scss语法支持
  ],
  webpackFinal: async (config, { configType }) => {
    // console.log(config.plugins[1].userOptions, configType);
    // config.plugins[1].userOptions.meta['referrer'] = 'no-referrer';
    // meta['referrer'] = 'no-referrer'
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    config.resolve.alias['@wb-ui'] = path.resolve(__dirname, '../src');
    return config;
  },
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-webpack5'
  }
};
