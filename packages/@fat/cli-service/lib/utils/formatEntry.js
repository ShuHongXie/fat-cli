const { isObject, isString, existFile } = require("@fat/cli-share-utils");
const { isUndefined } = require("lodash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = function formatEntry(api, entryMap) {
  if (isUndefined(entryMap)) {
    return {};
  }
  const htmlWebpackConfig = [];
  const newConfigPagesEntry = [];
  for (const entry in entryMap) {
    // 判断public文件夹下是否存在当前文件，没有的话就使用public/index.html为默认
    const existEntryFile = existFile(api.resolve(`./public/${entry}.html`));
    // entry可能是object也有可能是一个单独的
    if (isString(entry)) {
      htmlWebpackConfig.push(
        new HtmlWebpackPlugin({
          template: api.resolve(
            `./public/${existEntryFile ? entry : "index"}.html`
          ),
          filename: `${existEntryFile ? entry : "index"}.html`,
          chunks: ["chunk-vendors", "chunk-common", entry || "index"],
        })
      );
      newConfigPagesEntry.push({
        entryName: entry,
        entryPath: entryMap[entry],
        outputFileName: entry || "index",
      });
    } else if (isObject(entry)) {
      if (
        entryMap[entry].hasOwnProperty("entry") &&
        isString(entryMap[entry].entry)
      ) {
        htmlWebpackConfig.push(
          new HtmlWebpackPlugin({
            ...entryMap[entry],
            chunks: ["chunk-vendors", "chunk-common", entry || "index"],
            template:
              entryMap[entry].template || api.resolve(`./public/index.html`),
          })
        );
        newConfigPagesEntry.push({
          entryName: entry,
          entryPath: entryMap[entry],
        });
      } else {
        throw new Error("pages为对象时必须配置一个类型为字符串的entry属性");
      }
    } else {
      throw new Error("pages项目配置必须为字符串或者对象");
    }
  }
  return { htmlWebpackConfig, newConfigPagesEntry };
};
