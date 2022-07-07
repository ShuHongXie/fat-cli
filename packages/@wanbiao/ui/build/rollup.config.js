import vue from '@vitejs/plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import glob from 'fast-glob';

const resolve = (filePath) => {
  return path.join(process.cwd(), filePath);
};

const slash = ['darwin', 'linux'].includes(process.platform) ? '/' : '\\';

const formatFileName = (fileName) => {
  let formatFile = fileName;
  formatFile = formatFile.split(slash);
  return formatFile;
};

const entries = (globPattern) => {
  return glob.sync(globPattern).map((fileName) => {
    const fielName = formatFileName(fileName);
    const formatFielName = fielName[fielName.length - 1].slice(0, -3);
    const formatFielPath = fielName.join(slash);
    return [formatFielName, formatFielPath];
  });
};

console.log(entries(`./src/package/directives/*.ts`));
console.log(Object.fromEntries(entries(`./src/package/directives/*.ts`)));

const config = {
  input: {},
  output: {
    dir: resolve(`package`),
    entryFileNames: (chunkInfo) => {
      // 针对components下的目录 多了一层 所以这里需要进行一次判断,防止打包到其他位置
      const path = chunkInfo.facadeModuleId?.split(slash);
      if (path[path.length - 3] === 'components') {
        return path.slice(-3).join('/').replace('.ts', '.js');
      } else {
        return path.slice(-2).join('/').replace('.ts', '.js');
      }
    }
  },
  plugins: [
    terser(),
    vue(),
    typescript({
      tsconfig: resolve('./src/package/tsconfig.json'),
      include: ['src/package/**/*.ts']
    }),

    postcss({
      extensions: ['css', 'scss'],
      extract: true,
      minimize: true,
      plugins: [autoprefixer(), cssnano()]
    }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    })
  ],
  external: ['vue']
  // makeAbsoluteExternalsRelative: false
};
['image', 'button', 'empty', 'icon', 'list', 'load', 'loading', 'transition-box'].forEach(
  (name) => {
    config.input[name] = resolve(`src/package/components/${name}/index.ts`);
  }
);

config.input = Object.assign(
  {},
  config.input,
  Object.fromEntries(entries(`./src/package/directives/*.ts`))
);

export default config;
