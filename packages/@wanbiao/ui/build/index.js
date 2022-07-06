const { exec } = require('shelljs');
const fg = require('fast-glob');
const fs = require('fs');
const { join, resolve } = require('path');
const cwd = process.cwd();

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
  // 同步移动在package里面的index.d.ts
  async moveDts() {
    console.log(resolve(cwd, './src.d.ts'));
    const filePath = resolve(cwd, './dist/package/index.d.ts');
    // 获取buffer流
    const bf = fs.readFileSync(filePath, 'utf-8');
    // 同步写入
    fs.writeFileSync(resolve(cwd, './dist/index.d.ts'), bf);
    // 删除原始移动的文件
    fs.rmSync(filePath);
  },
  async start() {
    await this.buildVite();
    await this.buildRollup();
    await this.moveDts();
    // await this.deletePluginHelper();
  }
};

dev.start();
