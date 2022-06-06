const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (plugin, options) => {
  const getAssetPath = require("../utils/formatAsset");
  const formatEntry = require("../utils/formatEntry");
  const entry = {},
    output = {};
  // html-webpack-plugin默认配置，用户可能配置了pages
  // 如果配置了pages那么相应的entry，output都需要做单独处理
  const isProd = process.env.NODE_ENV === "production";
  const { htmlWebpackConfig, newConfigPagesEntry = [] } = formatEntry(options);
  newConfigPagesEntry.forEach((config) => {
    entry[config.entryName] = config.entryPath;
  });
  newConfigPagesEntry.forEach((config) => {
    output;
  });

  const outputFileName = getAssetPath(
    options,
    `js/[name]${isProd && options.filenameHashing ? ".[contenthash:8]" : ""}.js`
  );

  const appConfig = {
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

  // html-wepback-plugin处理
  if (htmlWebpackConfig && htmlWebpackConfig.length) {
    appConfig.plugins = appConfig.plugins.concat(htmlWebpackConfig);
  } else {
    appConfig.plugins.push(
      new HtmlWebpackPlugin({
        template: require("path").resolve(
          process.cwd(),
          "./lib/config/default.html"
        ),
        templateParameters: {
          title: "我giao",
        },
      })
    );
  }

  plugin.addBuildItConfig(appConfig);
};
