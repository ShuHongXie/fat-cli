["exit", "file", "validate"].forEach((method) => {
  Object.assign(exports, require(`./${method}`));
});

exports.chalk = require("chalk");
