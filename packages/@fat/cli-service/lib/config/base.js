const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => ({
  entry: [
    // Runtime code for hot module replacement
    "webpack/hot/dev-server.js",
    // Dev server client for web socket transport, hot and live reload logic
    "webpack-dev-server/client/index.js?hot=true&live-reload=true",
    path.resolve(process.cwd(), "./index.js"),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  plugins: [
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "./lib/config/default.html"),
      templateParameters: {
        title: "谢大人的框架",
      },
    }),
  ],
});
