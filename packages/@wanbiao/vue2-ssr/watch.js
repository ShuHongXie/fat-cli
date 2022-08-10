const webpack = require("webpack");
const { merge } = require("webpack-merge");
const chokidar = require("chokidar");
const clientConfig = require("./build/webpack.client");
const serverConfig = require("./build/webpack.client");
const { createBundleRenderer } = require("vue-server-renderer");

module.exports = function createWatch(app, path) {
  // 1. 增加webpack-koa-middleware核心配置
  clientConfig.plugins.push(
    ...[
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]
  );
  clientConfig.mode = "development";
  clientConfig.entry.unshift("webpack-hot-middleware/client");

  const clientCompiler = webpack(clientConfig, (err, stats) => {
    console.log("客户端bundle开始打包");
    console.log(err, stats.errors);
    clientCompiler.close((closeErr) => {
      // ...
    });
  });

  // app.use(
  //   require("webpack-dev-middleware")(clientCompiler, {
  //     publicPath: clientConfig.output.publicPath,
  //     serverSideRender: true,
  //   })
  // );

  // clientCompiler.run((err, stats) => {
  //   console.log("客户端bundle开始打包");
  //   console.log(err, stats);
  //   // compiler.close((closeErr) => {
  //   //   // ...
  //   // });
  // });
  app.use(require("koa-webpack-hot-middleware")(clientCompiler));

  // chokidar.watch(["src/**", "build/**"]).on("all", (event, path) => {
  //   console.log(event, path);
  // });
};
