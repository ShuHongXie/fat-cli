import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import glob from 'fast-glob';
import { dirname, join, relative } from 'path';

const resolve = (filePath) => {
  return join(process.cwd(), filePath);
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': resolve('src'),
      '@wb-ui': resolve('src')
    }
  },
  plugins: [
    vue(),
    dts({
      cleanVueFileName: true,
      staticImport: true,
      outputDir: './',
      entryRoot: ''
      // beforeWriteFile(filePath, content) {
      //   filePath = filePath.replace(`dist${slash}package`, 'dist');
      //   console.log(filePath);
      // }
    })
  ],
  build: {
    lib: {
      entry: resolve('/src/package/index.ts'),
      name: 'wb-ui',
      fileName: 'index',
      formats: ['es']
    },
    minify: false,
    rollupOptions: {
      external: ['vue'],
      input: {
        index: './src/package/index.ts'
        // ...Object.fromEntries(entries(`./src/package/directives/*.ts`)),
        // ...Object.fromEntries(entries(`./src/package/utils/*.ts`))
      },
      output: {
        dir: './package',
        // entryFileNames: (chunkInfo) => {
        //   const path = chunkInfo.facadeModuleId?.split(slash) as string[];
        //   return path[path.length - 2] === 'package'
        //     ? `${chunkInfo.name}.js`
        //     : `${path[path.length - 2]}/${path[path.length - 1].replace(/\.ts/, '.js')}`;
        // },
        entryFileNames: '[name].js',
        globals: {
          vue: 'Vue'
        }
      }
    }
    // rollupOptions: {
    //   // 请确保外部化那些你的库中不需要的依赖
    //   external: ['vue'],
    //   input: {
    //     directives: './src/package/directives'
    //   },
    //   output: {
    //     dir: './dist',
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     assetFileNames: '[name][extname]'
    //     // entryFileNames: `index.js`
    //     // chunkFileNames: `[name].js`
    //   }
    // }
  }
});
