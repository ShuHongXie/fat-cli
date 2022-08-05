const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  devtool: isProd ? "none" : "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "[name].[chunkhash].js",
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, "../public"),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/inline",
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
        generator: {
          filename: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.scss$/,
        use: isProd
          ? ["vue-style-loader", "css-loader", "sass-loader"]
          : [
              MiniCssExtractPlugin.loader,
              "vue-style-loader",
              "css-loader",
              "sass-loader",
            ],
      },
    ],
  },
  performance: {
    hints: false,
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: "common.[chunkhash].css",
        }),
      ]
    : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()],
};
