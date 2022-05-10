module.exports = (plugin) => {
  plugin.registerCommand("build", {}, async () => {});
};

exports.defaultModes = {
  build: "production",
};
