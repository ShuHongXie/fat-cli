import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import glob from 'fast-glob';
import { dirname, join, relative } from 'path';

const resolve = (filePath) => {
  return join(process.cwd(), filePath);
};

const formatFileName = (fileName: string) => {
  let formatFile: string | string[] = fileName;
  formatFile = formatFile.split(process.platform === 'darwin' ? '/' : '\\');
  if (formatFile[formatFile.length - 2] === 'package') {
    return 'index';
  } else {
    return formatFile[formatFile.length - 2];
  }
};

const entries = glob.sync(`./src/package/*/index.ts`).map((fileName) => {
  const formatFile = formatFileName(fileName);
  return [formatFile, fileName];
});
console.log(resolve('/src/package/index.ts'));

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': resolve('src'),
      '@wb-ui': resolve('src')
    }
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve('/src/package/index.ts'),
      name: 'wb-ui'
      // fileName: 'wb-ui',
      // formats: ['es']
    },
    minify: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
    // rollupOptions: {
    //   // 请确保外部化那些你的库中不需要的依赖
    //   external: ['vue'],
    //   input: {
    //     index: './src/package/index.ts'
    //   },
    //   output: {
    //     dir: './dist',
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     assetFileNames: '[name][extname]',
    //     entryFileNames: `index.js`
    //     // chunkFileNames: `[name].js`
    //   }
    // }
  }
});
