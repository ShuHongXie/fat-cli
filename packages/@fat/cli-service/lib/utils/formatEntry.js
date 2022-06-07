const { isObject, isString, existFile } = require("@fat/cli-share-utils");
const { isUndefined } = require("lodash");

module.exports = function formatEntry(api, entryMap) {
  if (isUndefined(entryMap)) {
    return {};
  }
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const preloadPlugin = require("@vue/preload-webpack-plugin");
  const htmlWebpackConfig = [];
  const preloadWebpackConfig = [];
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
      preloadWebpackConfig.push(
        new preloadPlugin({
          rel: "preload",
          includeHtmlNames: [`${existEntryFile ? entry : "index"}.html`],
          include: {
            type: "initial",
            entries: [entry],
          },
          fileBlacklist: [/\.map$/],
        })
      );
      preloadWebpackConfig.push(
        new preloadPlugin({
          rel: "prefetch",
          includeHtmlNames: [`${existEntryFile ? entry : "index"}.html`],
          include: {
            type: "asyncChunks",
            entries: [entry],
          },
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
        // html-webpack-plugin
        htmlWebpackConfig.push(
          new HtmlWebpackPlugin({
            ...entryMap[entry],
            chunks: ["chunk-vendors", "chunk-common", entry || "index"],
            template:
              entryMap[entry].template || api.resolve(`./public/index.html`),
          })
        );
        // preload-webpack-plugin
        preloadWebpackConfig.push(
          new preloadPlugin({
            rel: "preload",
            includeHtmlNames: [entryMap[entry].entry],
            include: {
              type: "initial",
              entries: [entryMap[entry].entry],
            },
            fileBlacklist: [/\.map$/],
          })
        );
        preloadWebpackConfig.push(
          new preloadPlugin({
            rel: "prefetch",
            includeHtmlNames: [entryMap[entry].entry],
            include: {
              type: "asyncChunks",
              entries: [entryMap[entry].entry],
            },
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
  return { htmlWebpackConfig, newConfigPagesEntry, preloadWebpackConfig };
};
