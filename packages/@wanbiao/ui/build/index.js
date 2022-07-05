const { exec } = require('shelljs');
const fg = require('fast-glob');
const fs = require('fs');
const { join } = require('path');

const dev = {
  async buildVite() {
    await exec('rm -rf dist/');
    await exec('vite build');
  },
  async buildRollup() {
    await exec('rollup -c ./build/rollup.config.js');
  },
  // 删除plugin-vue开头的文件
  async deletePluginHelper() {
    const pluginHelperFile = fg.sync('dist/package/plugin-vue*.js').map((fileName) => {
      return [fileName];
    });
    pluginHelperFile.length &&
      fs.rmSync(join(process.cwd(), `./${pluginHelperFile[0]}`), { force: true });
  },
  async start() {
    await this.buildVite();
    // await this.buildRollup();
    // await this.deletePluginHelper();
  }
};

dev.start();
