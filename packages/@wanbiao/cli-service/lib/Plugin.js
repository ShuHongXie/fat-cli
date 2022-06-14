/*
 * @Author: 谢树宏 384180258@qq.com
 * @Date: 2022-05-17 16:25:22
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-05-26
 * @FilePath: /fat-cli/packages/@wanbiao/cli-service/lib/Plugin.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
module.exports = class Plugin {
  constructor(id, service = {}) {
    this.id = id;
    this.service = service;
  }

  registerCommand(name, opt, fn) {
    this.service.commands[name] = fn;
  }

  resolveWebpackConfig() {
    return this.service.resolveWebpackConfig();
  }
  // 增加默认导入
  addBuildItConfig(config) {
    this.service.buitInConfig.push(config);
  }

  getCwd() {
    return this.service.context;
  }

  resolve(_path) {
    return path.resolve(this.service.context, _path);
  }
};
