const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const path = require("path");
const fs = require("fs");
const Plugin = require("./Plugin");
const { existFile } = require("../utils/file");

module.exports = class Service {
  constructor(context, { plugins = {} } = {}) {
    this.context = context;
    this.commands = {};
    this.plugins = this.resolvePlugins(plugins);
    this.mode = this.plugins.reduce(
      (modes, current) => Object.assign(modes, current.apply.defaultModes),
      {}
    );
    console.log(this.mode);
  }
  // 初始化
  init(mode) {
    // 环境变量加载
    if (mode) {
      this.loadEnv(mode);
    }
    this.loadEnv();
    // 插件应用
    this.plugins.forEach(({ id, apply }) => {
      apply(new Plugin(id, this));
    });
  }
  // 执行主流程
  run(name) {
    const mode = name === "build" ? "development" : "production";
    this.init(mode);
    return this.commands[name]();
  }
  // 用户配置加载
  loadUserConfig() {
    const defaultFileName = ["./fat.config.js"];
    let configPath;
    for (const item of defaultFileName) {
      let path = path.resolve(process.pwd(), item);
      if (existFile()) {
        configPath = path;
      }
    }
  }
  // 环境变量加载
  loadEnv(mode) {
    /*
      .env                # 在所有的环境中被载入
      .env.local          # 在所有的环境中被载入，但会被 git 忽略
      .env.[mode]         # 只在指定的模式中被载入
      .env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
    */
    const basePath = path.resolve(
      this.context,
      `.env${mode ? `.${mode}` : ``}`
    );
    const localPath = `${basePath}.local`;

    const load = (path) => {
      try {
        if (existFile(path)) {
          const env = dotenv.config({ path, debug: false });
          dotenvExpand.expand(env);
        }
      } catch (e) {
        // console.log(e.toString().indexOf("ENOENT"));
      }
    };

    load(basePath);
    load(localPath);
  }

  // 初始化插件 插件解析
  resolvePlugins() {
    const formatPlugins = (id) => ({
      id: id.replace(/^.\//, "built-it:"),
      apply: require(id),
    });

    const defaultPlugins = ["./command/serve", "./command/build"].map(
      formatPlugins
    );

    return defaultPlugins;
  }
};
