["exit", "file", "validate", "type"].forEach((method) => {
  Object.assign(exports, require(`./${method}`));
});

exports.chalk = require("chalk");
