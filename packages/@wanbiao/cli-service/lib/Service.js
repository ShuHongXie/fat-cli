const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const path = require("path");
const Plugin = require("./Plugin");
const { merge } = require("webpack-merge");
const { existFile, chalk } = require("@wanbiao/cli-share-utils");
const defaultsDeep = require("lodash.defaultsdeep");
const { defaults } = require("./config/options");

module.exports = class Service {
  constructor(context, { plugins = {} } = {}) {
    // 当前路径
    this.context = context;
    // webpack原生配置
    this.webpackRawConfigFns = [];
    // webpack-chain独立配置
    // this.webpackChainFns = [];
    // 其他内置的附加文件的基础webpack配置
    this.buitInConfig = [];
    // 负担执行命令
    this.commands = {};
    // 负担相关配置项
    this.userConfig = {};
    // 当前插件
    this.plugins = this.resolvePlugins(plugins);
    // 当前的模式
    this.mode = this.plugins.reduce(
      (modes, current) => Object.assign(modes, current.apply.defaultModes),
      {}
    );
  }
  // webpack-chain配置解析
  // 文档地址 https://github.com/neutrinojs/webpack-chain
  // resolveChainableWebpackConfig() {
  //   const chainableConfig = new Config();
  //   // apply chains
  //   this.webpackChainFns.forEach((fn) => fn(chainableConfig));
  //   return chainableConfig;
  // }
  resolveBuildInWebpackConfig() {}

  resolveWebpackConfig() {
    let config = {};
    this.buitInConfig.forEach((conf) => {
      config = merge(config, conf);
    });

    this.webpackRawConfigFns.forEach((fn) => {
      config = merge(config, fn);
    });
    console.log("resolveConfig", config);
    return config;
  }
  // 初始化
  init(mode) {
    // 环境变量加载
    if (mode) {
      this.loadEnv(mode);
    }
    this.loadEnv();
    const userConfig = this.loadUserConfig();
    this.userConfig = defaultsDeep(defaults(), userConfig);
    // 插件应用
    this.plugins.forEach(({ id, apply }) => {
      apply(new Plugin(id, this), this.userConfig);
    });
    // 收集webpack-chain配置和configureWebpack配置
    // 2022-05-25 webpack-chain决定不采用 configureWebpack只采用配置形式
    const { configureWebpack } = this.userConfig;
    // if (chainWebpack) {
    //   this.webpackChainFns.push(chainWebpack);
    // }
    if (configureWebpack) {
      this.webpackRawConfigFns.push(configureWebpack);
    }
  }
  // 执行主流程
  run(name) {
    const mode = name === "build" ? "development" : "production";
    this.init(mode);
    return this.commands[name](this.userConfig);
  }
  // 用户配置加载 仅支持外部链接文件
  loadUserConfig() {
    const defaultFileName = ["./xsh.config.js"];
    let configPath;
    // 获取配置地址
    for (const item of defaultFileName) {
      const filePath = path.resolve(process.cwd(), item);
      if (existFile(filePath)) {
        configPath = filePath;
        break;
      }
    }
    console.log(configPath);
    if (configPath) {
      let independentConfig;
      try {
        // 加载配置文件
        independentConfig = require(configPath);
        if (!independentConfig || typeof independentConfig !== "object") {
          console.log(
            `加载错误 ${chalk.bold(configPath)}: 配置文件应该导出为对象`
          );
          configPath = null;
        }
      } catch (e) {
        console.log(`Error loading ${chalk.bold(configPath)}:`);
        throw e;
      }

      // 某些配置初始化
      ensureSlash(independentConfig, "publicPath");
      if (typeof independentConfig.publicPath === "string") {
        independentConfig.publicPath = independentConfig.publicPath.replace(
          /^\.\//,
          ""
        );
      }
      removeSlash(independentConfig, "outputDir");

      return independentConfig;
    }

    return {};
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
    console.log("进入resolve");
    const formatPlugins = (id) => ({
      id: id.replace(/^.\//, "built-it:"),
      apply: require(id),
    });

    const defaultPlugins = [
      "./command/serve",
      "./command/build",
      "./config/base",
      "./config/css",
      "./config/eslint",
      "./config/app",
    ].map(formatPlugins);
    return defaultPlugins;
  }
};

// 增加路径后面的 / 比如 xxxx/xxx  变成xxxx/xxx/
function ensureSlash(config, key) {
  const val = config[key];
  if (typeof val === "string") {
    config[key] = val.replace(/([^/])$/, "$1/");
  }
}

// 去除路径后面的/  比如 xxxx/xxx/ 槟城xxxx/xxx
function removeSlash(config, key) {
  if (typeof config[key] === "string") {
    config[key] = config[key].replace(/\/$/g, "");
  }
}
