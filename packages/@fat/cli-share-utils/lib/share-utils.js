"use strict";

["exit", "file", "validate"].forEach((method) => {
  exports[method] = require(`./lib/${m}`);
});

exports.chalk = require("chalk");
