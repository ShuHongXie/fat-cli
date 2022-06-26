/*
 * @Author: 谢树宏
 * @Date: 2022-01-25 10:06:18
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-06-26 23:21:01
 * @FilePath: /electron-mp-ci/script/dev/rollup.js
 */

import loadConfigFile from 'rollup/dist/loadConfigFile'
import path from 'path'
import rollup from 'rollup'
import vue from '@vitejs/plugin-vue'
import typescript from 'rollup-plugin-typescript2'

console.log(__dirname)

const buildMain = function () {
  loadConfigFile('./config.ts', {
    // format: 'cjs',
    plugin: [vue(), typescript()],
    external: ['vue']
  }).then(async ({ options, warnings }) => {
    console.log(`开始构建---`)
    warnings.flush()

    for (const optionsObj of options) {
      const bundle = await rollup.rollup(optionsObj)
      await Promise.all(optionsObj.output.map(bundle.write))
    }
  })
}

module.exports = buildMain
