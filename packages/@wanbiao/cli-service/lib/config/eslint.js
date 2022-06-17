const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = (plugin, options) => {
  const getAssetPath = require("../utils/formatAsset");
  const ESLintPlugin = require("eslint-webpack-plugin");
  const isProd = process.env.NODE_ENV === "production";

  const filename = getAssetPath(
    options,
    `css/[name]${
      isProd && options.filenameHashing ? ".[contenthash:8]" : ""
    }.css`
  );

  // 增加默认配置
  const eslintConfig = {
    plugins: [
      new ESLintPlugin({
        context: process.cwd(),
        threads: options.parallel,
        failOnError: options.lintOnSave === "error",
        failOnWarning: options.lintOnSave === "warning",
        quiet: false,
        fix: !!options.lintOnSave,
        files: ["src/**/*.{js,vue}"],
        extensions: [".js", ".vue", "src"],
      }),
    ],
  };

  plugin.addBuildItConfig(eslintConfig);
};
