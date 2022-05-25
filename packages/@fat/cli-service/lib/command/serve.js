const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const { validate } = require("@fat/cli-share-utils");
const validateWebpackConfig = require("../utils/validateWebpackConfig");

// module.exports = () => ({
//   entry: [
//     // Runtime code for hot module replacement
//     "webpack/hot/dev-server.js",
//     // Dev server client for web socket transport, hot and live reload logic
//     "webpack-dev-server/client/index.js?hot=true&live-reload=true",
//     path.resolve(process.cwd(), "./index.js"),
//   ],
//   output: {
//     filename: "[name].bundle.js",
//     path: path.resolve(__dirname, "dist"),
//     clean: true,
//   },
//   devtool: "inline-source-map",
//   plugins: [
//     // Plugin for hot module replacement
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       template: path.resolve(process.cwd(), "./lib/config/default.html"),
//       templateParameters: {
//         title: "谢大人的框架",
//       },
//     }),
//   ],
// });

module.exports = (plugin, options) => {
  plugin.registerCommand("serve", {}, async () => {
    const webpackConfig = plugin.resolveWebpackConfig();
    console.log("serveConfig", webpackConfig, options);

    // 检测配置错误
    validateWebpackConfig(webpackConfig, plugin, options);

    const devServerConfig = Object.assign(
      options.devServer,
      webpackConfig.devServer || {}
    );

    const config = merge(
      {},
      {
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
      }
    );
    // webpack配置
    const compiler = webpack(config);
    // const devServerConfig = {
    //   hot: false,
    //   client: false,
    //   port: 8888,
    // };

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
