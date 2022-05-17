const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const defaultConfig = require("../config/base")();

module.exports = (plugin, options) => {
  plugin.registerCommand("serve", {}, async () => {
    const config = merge(defaultConfig, {
      mode: "development",
      plugins: [
        new FriendlyErrorsWebpackPlugin({
          // 成功的时候输出
          compilationSuccessInfo: {
            // messages: [`Your application is running here: http://localhost:8080`]
          },
          // 是否每次都清空控制台
          clearConsole: true,
        }),
      ],
      stats: "errors-only",
    });
    // webpack配置
    const compiler = webpack(config);
    const devServerConfig = {
      hot: false,
      client: false,
      port: 8888,
    };

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
