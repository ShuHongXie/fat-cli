const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const { resolve } = require("./utils");

module.exports = merge(baseConfig, {
  entry: [resolve("./src/entry-client.js")],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      minChunks: Infinity,
    },
  },
  plugins: [
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
  ],
});
