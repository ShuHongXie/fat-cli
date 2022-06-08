const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (plugin, options) => {
  const getAssetPath = require("../utils/formatAsset");
  const formatEntry = require("../utils/formatEntry");

  // html-webpack-plugin默认配置，用户可能配置了pages
  // 如果配置了pages那么相应的entry，output都需要做单独处理
  const isProd = process.env.NODE_ENV === "production";
  const preloadPlugin = require("@vue/preload-webpack-plugin");
  const {
    htmlWebpackConfig,
    preloadWebpackConfig,
    newConfigPagesEntry = [],
  } = formatEntry(plugin, options);
  console.log(htmlWebpackConfig, preloadWebpackConfig);
  console.log("------");
  console.log(newConfigPagesEntry);

  const outputFileName = getAssetPath(
    options,
    `js/[name]${isProd && options.filenameHashing ? ".[contenthash:8]" : ""}.js`
  );

  const appConfig = {
    entry:
      !newConfigPagesEntry || Object.keys(newConfigPagesEntry).length
        ? newConfigPagesEntry
        : { app: plugin.resolve("./src/main.js") },
    output: {
      filename: outputFileName,
      chunkFilename: outputFileName,
      path: plugin.resolve(`./${options.outputDir}`),
      publicPath: options.publicPath,
      clean: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "initial",
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [],
  };

  // html-wepback-plugin，preload-webpack-plugin处理
  // 多个长度在方法里面已经处理了
  // else逻辑处理单个长度
  if (htmlWebpackConfig && htmlWebpackConfig.length) {
    appConfig.plugins = appConfig.plugins.concat(htmlWebpackConfig);
    appConfig.plugins = appConfig.plugins.concat(preloadWebpackConfig);
  } else {
    // html-webpack-plugin
    appConfig.plugins.push(
      new HtmlWebpackPlugin({
        template: require("path").resolve(
          process.cwd(),
          "./lib/config/default.html"
        ),
        inject: "body",
        templateParameters: {
          title: "我giao",
        },
      })
    );
    // preoload-webpack-plugin
    appConfig.plugins.push(
      new preloadPlugin({
        rel: "preload",
        include: "initial",
        fileBlacklist: [/\.map$/, /hot-update\.js$/],
      })
    );
    appConfig.plugins.push(
      new preloadPlugin({
        rel: "prefetch",
        include: "asyncChunks",
      })
    );
  }

  plugin.addBuildItConfig(appConfig);
};
