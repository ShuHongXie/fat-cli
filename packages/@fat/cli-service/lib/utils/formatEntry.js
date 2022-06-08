const { isObject, isString, existFile } = require("@fat/cli-share-utils");
const { isUndefined } = require("lodash");

module.exports = function formatEntry(api, options) {
  const entryMap = options.pages;
  if (isUndefined(entryMap)) {
    return {};
  }
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const preloadPlugin = require("@vue/preload-webpack-plugin");
  const htmlWebpackConfig = [];
  const preloadWebpackConfig = [];
  const newConfigPagesEntry = {};
  for (const entry in entryMap) {
    // 判断public文件夹下是否存在当前文件，没有的话就使用public/index.html为默认
    // 传入文件地址

    // entry可能是object也有可能是一个单独的string
    if (isString(entryMap[entry])) {
      const filePath = api.resolve(entryMap[entry]);
      const preloadFilePath = path.join(
        api.getCwd(),
        options.outputDir,
        entryMap[entry]
      );
      console.log("~~~~~~~~~!", entry);
      const existEntryFile = existFile(filePath);
      if (existEntryFile) {
        htmlWebpackConfig.push(
          new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), "./lib/config/default.html"),
            inject: "body",
            templateParameters: {
              title: entryMap[entry].title || "",
            },
            filename: `${entry}.html`,
            chunks: ["chunk-vendors", "chunk-common", entry],
          })
        );
        preloadWebpackConfig.push(
          new preloadPlugin({
            rel: "preload",
            includeHtmlNames: [preloadFilePath],
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
            includeHtmlNames: [preloadFilePath],
            include: {
              type: "asyncChunks",
              entries: [entry],
            },
          })
        );
        newConfigPagesEntry[entry] = entryMap[entry];
      } else {
        throw new Error(`当前配置为${entryMap[entry]}的模板不存在`);
      }
    } else if (isObject(entryMap[entry])) {
      if (
        entryMap[entry].hasOwnProperty("entry") &&
        isString(entryMap[entry].entry)
      ) {
        const filePath = api.resolve(entryMap[entry].entry);
        const preloadFilePath = path.join(
          api.getCwd(),
          options.outputDir,
          entryMap[entry].entry
        );
        const existEntryFile = existFile(filePath);
        if (existEntryFile) {
          // html-webpack-plugin
          htmlWebpackConfig.push(
            new HtmlWebpackPlugin({
              ...entryMap[entry],
              templateParameters: {
                title: entryMap[entry].title || "",
              },
              inject: "body",
              chunks: ["chunk-vendors", "chunk-common", entry],
              template: entryMap[entry].template
                ? api.resolve(entryMap[entry].template)
                : path.resolve(process.cwd(), "./lib/config/default.html"),
            })
          );
          // preload-webpack-plugin
          preloadWebpackConfig.push(
            new preloadPlugin({
              rel: "preload",
              includeHtmlNames: [preloadFilePath],
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
              includeHtmlNames: [preloadFilePath],
              include: {
                type: "asyncChunks",
                entries: [entryMap[entry].entry],
              },
            })
          );
          newConfigPagesEntry[entry] = entryMap[entry].entry;
        } else {
          throw new Error(`当前配置为${entryMap[entry].entry}的模板不存在`);
        }
      } else {
        throw new Error("pages为对象时必须配置一个类型为字符串的entry属性");
      }
    } else {
      throw new Error("pages项配置必须为字符串或者对象");
    }
  }
  return { htmlWebpackConfig, newConfigPagesEntry, preloadWebpackConfig };
};
