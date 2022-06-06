module.exports = function getAssetPath(options, path) {
  return options.assetsDir ? path.join(options.assetsDir, path) : path;
};
