const { createSchema, validate } = require("@wanbiao/cli-share-utils");

const schema = createSchema((joi) =>
  joi.object({
    publicPath: joi.string().allow(""),
    outputDir: joi.string(),
    assetsDir: joi.string().allow(""),
    indexPath: joi.string(),
    filenameHashing: joi.boolean(),
    runtimeCompiler: joi.boolean(),
    transpileDependencies: joi.array(),
    productionSourceMap: joi.boolean(),
    parallel: joi.alternatives().try(joi.boolean(), joi.number().integer()),
    devServer: joi.object(),
    pages: joi.object().pattern(
      /\w+/,
      joi.alternatives().try(
        joi.string().required(),
        joi.array().items(joi.string().required()),

        joi
          .object()
          .keys({
            entry: joi
              .alternatives()
              .try(
                joi.string().required(),
                joi.array().items(joi.string().required())
              )
              .required(),
          })
          .unknown(true)
      )
    ),
    crossorigin: joi.string().valid("", "anonymous", "use-credentials"),
    integrity: joi.boolean(),

    // css
    css: joi.object({
      // TODO: deprecate this after joi 16 release
      modules: joi.boolean(),
      requireModuleExtension: joi.boolean(),
      extract: joi.alternatives().try(joi.boolean(), joi.object()),
      sourceMap: joi.boolean(),
      loaderOptions: joi.object({
        css: joi.object(),
        sass: joi.object(),
        scss: joi.object(),
        less: joi.object(),
        stylus: joi.object(),
        postcss: joi.object(),
      }),
    }),

    // webpack
    chainWebpack: joi.func(),
    configureWebpack: joi.alternatives().try(joi.object(), joi.func()),

    // known runtime options for built-in plugins
    lintOnSave: joi.any().valid(true, false, "error", "warning", "default"),
    // pwa: joi.object(),

    // 3rd party plugin options
    // pluginOptions: joi.object(),
  })
);

exports.validate = (options, cb) => {
  validate(options, schema, cb);
};

// #2110
// https://github.com/nodejs/node/issues/19022
// in some cases cpus() returns undefined, and may simply throw in the future
function hasMultipleCores() {
  try {
    return require("os").cpus().length > 1;
  } catch (e) {
    return false;
  }
}

exports.defaults = () => ({
  // 构建后的公共地址
  publicPath: "/",

  // 构建文件夹
  outputDir: "dist",

  // 静态文件夹地址
  assetsDir: "",

  // 主页地址
  indexPath: "index.html",

  // whether filename will contain hash part
  filenameHashing: true,

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
  // 不过，对所有的依赖都进行转译可能会降低构建速度。如果对构建性能有所顾虑，你可以只转译部分特定的依赖：给本选项传一个数组，列出需要转译的第三方包包名或正则表达式即可。
  transpileDependencies: [
    /* string or regex */
  ],

  // 构建环境使用sourcemap
  productionSourceMap: !process.env.VUE_CLI_TEST,

  // 是否为 Babel 或 TypeScript 使用 thread-loader。
  // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: hasMultipleCores(),

  // 多页配置
  pages: undefined,

  // <script type="module" crossorigin="use-credentials">
  // #1656, #1867, #2025
  crossorigin: undefined,

  // subresource integrity
  integrity: false,

  css: {
    // extract: true,
    // modules: false,
    // sourceMap: false,
    // loaderOptions: {}
  },
  /*
  Type: boolean | 'warning' | 'default' | 'error'
  Default: 'default'
  是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'default'。这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
  设置为 error 将会使得 eslint-loader 把 lint 警告也输出为编译错误，这意味着 lint 警告将会导致编译失败。
  */
  lintOnSave: "default",
  // devServer配置
  devServer: {
    /*
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {}
  */
  },
});
