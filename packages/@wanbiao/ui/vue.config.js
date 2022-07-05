const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack(config) {
    config.resolve.alias['@wb-ui'] = path.resolve(__dirname, './src');
    config.resolve.alias['@wb'] = path.resolve(__dirname, './dist/package');
  }
});
