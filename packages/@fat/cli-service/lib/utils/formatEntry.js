const { isObject, isString } = require("@fat/cli-share-utils");
console.log(isObject);
module.exports = function formatEntry(api, entry) {
  // entry可能是object也有可能是一个单独的
  if (isString(entry)) {
    return entry;
  } else if (isObject(entry)) {
    if (entry.hasOwnProperty("entry") && isString(entry.entry)) {
      return {};
    } else {
      throw new Error("pages为对象时必须配置一个类型为字符串的entry属性");
    }
  } else {
    throw new Error("pages项目配置必须为字符串或者对象");
  }
};
