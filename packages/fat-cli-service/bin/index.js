#!/usr/bin/env node

// usr/bin/env 以node为解释器
console.log(process.argv);

const minimist = require("minimist");
const rawArgv = ["build"]; // process.argv.slice(2)
const args = require("minimist")(rawArgv, {
  boolean: [
    // build
    "modern",
    "report",
    "report-json",
    "inline-vue",
    "watch",
    // serve
    "open",
    "copy",
    "https",
    // inspect
    "verbose",
  ],
});

console.log(args);
