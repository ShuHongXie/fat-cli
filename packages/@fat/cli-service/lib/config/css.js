const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = (plugin, options) => {
  const getAssetPath = require("../utils/formatAsset");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  const maxLimit = 4 * 1024; // 4kb
  const isProd = process.env.NODE_ENV === "production";
  const {
    extract = isProd,
    modules = false,
    sourceMap = false,
    loaderOptions = {},
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
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            // 将 CSS 转化成 CommonJS 模块
            {
              loader: "css-loader",
              options: loaderOptions.css,
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: Object.assign(
                  {
                    config: true,
                    plugins: [
                      ["postcss-preset-env"],
                      ["postcss-short", { prefix: "fat" }],
                    ],
                  },
                  loaderOptions.postcss || {}
                ),
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // 将 JS 字符串生成为 style 节点
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            // 将 CSS 转化成 CommonJS 模块
            {
              loader: "css-loader",
              options: loaderOptions.css,
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: Object.assign(
                  {
                    config: true,
                    plugins: [
                      ["postcss-preset-env"],
                      ["postcss-short", { prefix: "fat" }],
                    ],
                  },
                  loaderOptions.postcss || {}
                ),
              },
            },
            // 将 Sass 编译成 CSS
            {
              loader: "sass-loader",
              options: {
                // 强标定dart-sass 这样即使有node-sass的包也会使用dart-sass
                implementation: require("sass"),
                sassOptions: Object.assign(
                  {
                    // fibers包解决 dart-sass异步编译的速度过慢问题(Node16版本下不适用)
                    // fiber: require("fibers"),
                  },
                  loaderOptions.sass || {}
                ),
              },
            },
          ],
        },
      ],
    },
    plugins: [],
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
  };

  if (extract) {
    cssConfig.plugins.push(
      // MiniCssExtractPlugin提取css到独立的配置文件中
      new MiniCssExtractPlugin({
        // 与 webpackOptions.output 中的选项相似
        // 所有的选项都是可选的
        filename: filename,
        chunkFilename: filename,
      })
    );
  }

  plugin.addBuildItConfig(cssConfig);
};
