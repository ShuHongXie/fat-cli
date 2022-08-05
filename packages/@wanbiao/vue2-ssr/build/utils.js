const path = require("path");

exports.resolve = (p) => {
  return path.resolve(process.cwd(), p);
};
