module.exports = (api, options) => {
  console.log(api, options);
  const getAssetPath = require("../utils/formatAsset");
  const genAssetSubPath = (dir) => {
    return getAssetPath(
      options,
      `${dir}/[name]${options.filenameHashing ? ".[hash:8]" : ""}.[ext]`
    );
  };

  return {
    entry: [
      // 运行时代码热更新
      "webpack/hot/dev-server.js",
      // 本地服务器socket转换 Dev server client for web socket transport, hot and live reload logic
      "webpack-dev-server/client/index.js?hot=true&live-reload=true",
      api.resolve("./src/main.js"),
    ],
    output: {
      filename: "[name].bundle.js",
      path: api.resolve("./dist"),
      publicPath: options.publicPath,
      clean: true,
    },
    devtool: "inline-source-map",
    modules: {
      // vue等大型库已经对commonjs有版本支持，所以不需要再次解析，这样可以提高加载速度
      noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
      rules: [
        {
          test: /\.mjs$/,
          exclude: /(node_modules|bower_components)/,
          use: {},
          type: "javascript/auto",
        },
        {
          test: /\.vue$/,
          loader: require("vue-loader"),
        },
        // webpack5使用新的asset module替代url-loader,raw-loader,file-loader
        // resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，
        // 否则会被视为 resource 模块类型。
        {
          test: /(jpe?g|png|gif|webp)(\?.*)?$)/,
          type: "asset",
          generator: {
            // 自定义名称，会覆盖output.assetModuleFilename配置
            filename: genAssetSubPath("img"),
          },
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // 默认是小于8kb时会生成base64的url
            },
          },
        },
        // svg图片不进行base64编码，因为base64编码会破坏svg的文件标识符
        {
          test: /\.(svg)(\?.*)?$/,
          type: "asset/resource",
          generator: {
            filename: genAssetSubPath("img"),
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: "asset",
          generator: {
            // 自定义名称，会覆盖output.assetModuleFilename配置
            filename: genAssetSubPath("media"),
          },
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // 默认是小于8kb时会生成base64的url
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          type: "asset",
          generator: {
            // 自定义名称，会覆盖output.assetModuleFilename配置
            filename: genAssetSubPath(""),
          },
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // 默认是小于8kb时会生成base64的url
            },
          },
        },
      ],
    },
    plugins: [
      // Plugin for hot module replacement
      new webpack.HotModuleReplacementPlugin(),
      // html-wepback-plugin
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), "./lib/config/default.html"),
        templateParameters: {
          title: "谢大人的框架",
        },
      }),
      // vue-loader
      new require("vue-loader").VueLoaderPlugin(),
    ],
  };
};

// module.exports = (api, options) => {
//   api.chainWebpack(webpackConfig => {
//     const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
//     const resolveLocal = require('../util/resolveLocal')
//     const getAssetPath = require('../util/getAssetPath')
//     const inlineLimit = 4096

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
