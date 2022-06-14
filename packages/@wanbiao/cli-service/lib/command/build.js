const webpack = require("webpack");

module.exports = (plugin) => {
  plugin.registerCommand("build", {}, async () => {
    console.log("12321");
  });
};

exports.defaultModes = {
  build: "production",
};
