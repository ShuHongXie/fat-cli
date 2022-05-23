

module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
    const resolveLocal = require('../util/resolveLocal')
    const getAssetPath = require('../util/getAssetPath')
    const inlineLimit = 4096

    const genAssetSubPath = dir => {
      return getAssetPath(
        options,
        `${dir}/[name]${options.filenameHashing ? '.[hash:8]' : ''}.[ext]`
      )
    }

    // const genUrlLoaderOptions = dir => {
    //   return {
    //     limit: inlineLimit,
    //     // use explicit fallback to avoid regression in url-loader>=1.1.0
    //     fallback: {
    //       loader: require.resolve('file-loader'),
    //       options: {
    //         name: genAssetSubPath(dir)
    //       }
    //     }
    //   }
    // }

    webpackConfig
      .mode('development')
      .context(api.service.context)
      .entry('app')
        .add('./src/main.js')
        .end()
      .output
        .path(api.resolve(options.outputDir))
        .filename(isLegacyBundle ? '[name]-legacy.js' : '[name].js')
        .publicPath(options.publicPath)
        webpackConfig.module
      .noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/)

    webpackConfig.module
      .rule('mjs')
        .test(/\.mjs$/)
        .include
          .add(/node_modules/)
          .end()
        .type('javascript/auto')
    // vue-loader模板解析
    webpackConfig.module
      .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
        .end()
      .loader(requuire('vue-loader'))
      .end()

    webpackConfig
      .plugin('vue-loader')
        .use(require('vue-loader-v16').VueLoaderPlugin)

    // -----静态资源处理
  }
}
