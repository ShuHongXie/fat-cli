import vue from '@vitejs/plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from 'path';
import { terser } from 'rollup-plugin-terser';
import { RollupOptions, OutputOptions } from 'rollup';

type Input = { [entryAlias: string]: string };

const resolve = (filePath: string) => {
  return path.join(process.cwd(), filePath);
};

const config: RollupOptions = {
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
    })
  ],
  external: ['vue']
};
['image'].forEach((name) => {
  (config.input as Input)[name] = resolve(`src/package/${name}/index.ts`).toString();
  (config.output as OutputOptions[]).push({
    dir: resolve(`packages/${name}`),
    name: `index.js`
  });
});

export default config;
