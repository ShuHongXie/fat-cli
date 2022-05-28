const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const validateWebpackConfig = require("../utils/validateWebpackConfig");

// module.exports = () => ({
//   entry: [
//     // Runtime code for hot module replacement
//     "webpack/hot/dev-server.js",
//     // Dev server client for web socket transport, hot and live reload logic
//     "webpack-dev-server/client/index.js?hot=true&live-reload=true",
//     path.resolve(process.cwd(), "./index.js"),
//   ],
// });
const defaults = {
  host: "0.0.0.0",
  port: 8080,
  https: false,
};

module.exports = (plugin, options) => {
  plugin.registerCommand("serve", {}, async () => {
    const webpackConfig = plugin.resolveWebpackConfig();
    console.log("serveConfig", webpackConfig, options);

    // 检测配置错误
    validateWebpackConfig(webpackConfig, plugin, options);
    const entryMap = webpackConfig.entry;
    const entryConfig = [
      // Runtime code for hot module replacement
      "webpack/hot/dev-server.js",
      // Dev server client for web socket transport, hot and live reload logic
      "webpack-dev-server/client/index.js?hot=true&live-reload=true",
    ];
    for (const entryPath in entryMap) {
      entryConfig.push(entryMap[entryPath]);
    }
    webpackConfig.entry = entryConfig;
    // 本地devServer和用户自定义devServer混合

    const mergeDevServerConfig = Object.assign(
      options.devServer,
      webpackConfig.devServer || {}
    );

    const https = mergeDevServerConfig.https || defaults.https;
    const port = mergeDevServerConfig.prot || defaults.port;

    const config = merge(webpackConfig, {
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
        new webpack.HotModuleReplacementPlugin(),
      ],
      stats: "errors-only",
    });
    // webpack配置
    const compiler = webpack(config);
    // 使用hotModuleRplacementPlugin时 hot和client选项必须为false
    // https://webpack.docschina.org/guides/hot-module-replacement
    const devServerConfig = {
      hot: false,
      client: false,
      port: port,
      https,
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
