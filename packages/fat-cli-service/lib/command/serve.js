module.exports = (plugin) => {
  plugin.registerCommand("serve", {}, async () => {});
};

module.exports.defaultModes = {
  serve: "development",
};
