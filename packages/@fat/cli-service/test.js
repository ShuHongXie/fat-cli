// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require("webpack-chain");

// Instantiate the configuration with a new API
const config = new Config();

// Make configuration changes using the chain API.
// Every API call tracks a change to the stored configuration.

config
  // Interact with entry points
  .entry("index")
  .add("src/index.js")
  .end()
  // Modify output settings
  .output.path("dist")
  .filename("[name].bundle.js");

// Create named rules which can be modified later
config.module
  .rule("mjs")
  .test(/\.mjs$/)
  .include.add(/node_modules/)
  .end()
  .type("javascript/auto");

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig();
