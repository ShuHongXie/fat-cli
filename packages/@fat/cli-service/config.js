const { merge } = require("webpack-merge");
const path = require("path");
const hwp = require("html-webpack-plugin");

const defaults = {
  mode: "development",
  entry: {
    main: path.resolve(process.cwd(), `./src/main.js`),
    main1: path.resolve(process.cwd(), `./src/main1.js`),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(process.cwd(), `./src`),
  },
  plugins: [
    new hwp({
      filename: "main.html",
      chunks: ["main"],
    }),
  ],
};

const copy = {
  plugins: [
    new hwp({
      filename: "main1.html",
      chunks: ["main1"],
    }),
  ],
};

module.exports = merge(defaults, copy);

console.log(merge(defaults, copy));
