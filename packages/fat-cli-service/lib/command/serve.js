const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");

module.exports = (plugin) => {
  plugin.registerCommand("serve", {}, async () => {});
};

module.exports.defaultModes = {
  serve: "development",
};
