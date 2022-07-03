import vue from '@vitejs/plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const resolve = (filePath) => {
  return path.join(process.cwd(), filePath);
};

const config = {
  input: {},
  output: [],
  plugins: [
    // terser(),
    vue(),
    typescript(),
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
};
['image', 'button', 'empty', 'icon', 'list', 'load', 'loading', 'transition-box'].forEach(
  (name) => {
    config.input[name] = resolve(`src/components/${name}/index.ts`);
    config.output.push({
      dir: resolve(`packages/${name}`),
      name: `index.js`
    });
  }
);

export default config;
