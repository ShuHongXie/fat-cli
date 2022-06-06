#!/usr/bin/env node

const Service = require("../lib/Service");

// usr/bin/env 以node为解释器
// console.log(process.argv);

const rawArgv = ["serve"]; // process.argv.slice(2)
const service = new Service(process.cwd());
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

service.run(args._[0]);
