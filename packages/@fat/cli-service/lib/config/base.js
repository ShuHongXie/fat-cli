const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
    const resolveLocal = require('../util/resolveLocal')
    const getAssetPath = require('../util/getAssetPath')
    const inlineLimit = 4096

    const genAssetSubPath = dir => {
      return getAssetPath(
        options,
        `${dir}/[name]${options.filenameHashing ? '.[hash:8]' : ''}.[ext]`
      )
    }

    // const genUrlLoaderOptions = dir => {
    //   return {
    //     limit: inlineLimit,
    //     // use explicit fallback to avoid regression in url-loader>=1.1.0
    //     fallback: {
    //       loader: require.resolve('file-loader'),
    //       options: {
    //         name: genAssetSubPath(dir)
    //       }
    //     }
    //   }
    // }

    webpackConfig
      .mode('development')
      .context(api.service.context)
      .entry('app')
        .add('./src/main.js')
        .end()
      .output
        .path(api.resolve(options.outputDir))
        .filename(isLegacyBundle ? '[name]-legacy.js' : '[name].js')
        .publicPath(options.publicPath)
  }
}

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
