const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const { merge } = require("webpack-merge");
const defaultConfig = require("../config/base")();

module.exports = (plugin) => {
  plugin.registerCommand("serve", {}, async () => {
    const config = merge(defaultConfig, {
      mode: "development",
    });
    // webpack配置
    const compiler = webpack(config);
    const devServerConfig = { hot: false, client: false, port: 8888 };

    // `hot` and `client` options are disabled because we added them manually
    // param1: 自身的devServer设置 param2 webpack实例
    const server = new webpackDevServer(devServerConfig, compiler);

    (async () => {
      await server.start();
      console.log("dev server is running");
    })();
  });
};

module.exports.defaultModes = {
  serve: "development",
};
