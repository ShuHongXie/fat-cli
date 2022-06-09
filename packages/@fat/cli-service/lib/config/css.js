const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = (plugin, options) => {
  const getAssetPath = require("../utils/formatAsset");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const maxLimit = 4 * 1024; // 4kb
  const isProd = process.env.NODE_ENV === "production";
  const {
    extract = isProd,
    modules = false,
    sourceMap = false,
    loaderOptions: {},
  } = options.css;
  const filename = getAssetPath(
    options,
    `css/[name]${
      isProd && options.filenameHashing ? ".[contenthash:8]" : ""
    }.css`
  );

  // 增加默认配置
  const cssConfig = {
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // 将 JS 字符串生成为 style 节点
            "style-loader",
            // 将 CSS 转化成 CommonJS 模块
            {
              loader: "css-loader",
              options: loaderOptions.css,
            },
            // 将 Sass 编译成 CSS
            {
              loader: "sass-loader",
              options: Object.assign(loaderOptions.sass || {}, {
                // 强标定dart-sass 这样即使有node-sass的包也会使用dart-sass
                implementation: require("sass"),
                sassOptions: {
                  fiber: require("fibers"),
                },
              }),
            },
          ],
        },
      ],
    },
    plugins: [],
  };

  if (extract) {
    cssConfig[1].use.unshift(MiniCssExtractPlugin.loader);
    cssConfig.push(
      new MiniCssExtractPlugin({
        // 与 webpackOptions.output 中的选项相似
        // 所有的选项都是可选的
        filename: filename,
        chunkFilename: filename,
      })
    );
  }

  plugin.addBuildItConfig(baseConfig);
};
