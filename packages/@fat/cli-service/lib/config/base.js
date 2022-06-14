module.exports = (plugin, options) => {
  const getAssetPath = require("../utils/formatAsset");
  const { VueLoaderPlugin } = require("vue-loader");
  const path = require("path");
  const maxLimit = 4 * 1024; // 4kb
  const genAssetSubPath = (dir) => {
    return getAssetPath(
      options,
      `${dir}/[name]${options.filenameHashing ? ".[hash:8]" : ""}.[ext]`
    );
  };
  console.log(
    "cwd",
    process.cwd(),
    path.resolve(process.cwd(), "public/index.html"),
    path.join(process.cwd(), "/node_modules/@fat/cli-service")
  );
  // 增加默认配置
  const baseConfig = {
    devtool: "inline-source-map",
    // context: path.join(process.cwd(), "/node_modules/@fat/cli-service"),
    module: {
      // vue等大型库已经对commonjs有版本支持，所以不需要再次解析，这样可以提高加载速度
      // noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
      rules: [
        {
          test: /\.mjs$/,
          exclude: /(node_modules|bower_components)/,
          use: {},
          type: "javascript/auto",
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
        // webpack5使用新的asset module替代url-loader,raw-loader,file-loader
        // resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，
        // 否则会被视为 resource 模块类型。
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          type: "asset",
          generator: {
            // 自定义名称，会覆盖output.assetModuleFilename配置
            filename: genAssetSubPath("img"),
          },
          parser: {
            dataUrlCondition: {
              maxSize: maxLimit, // 默认是小于8kb时会生成base64的url
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
              maxSize: maxLimit, // 默认是小于8kb时会生成base64的url
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
              maxSize: maxLimit, // 默认是小于8kb时会生成base64的url
            },
          },
        },
      ],
    },
    resolve: {
      preferRelative: true,
      symlinks: false,
    },
    plugins: [
      // vue-loader
      new VueLoaderPlugin(),
    ],
  };

  plugin.addBuildItConfig(baseConfig);
};
