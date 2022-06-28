import vue from '@vitejs/plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import path from 'path'
import css from 'rollup-plugin-css-only'
import sass from 'rollup-plugin-sass'

const resolve = (filePath) => {
  return path.join(process.cwd(), filePath)
}

const config = []

;['image'].forEach((name) => {
  config.push({
    input: resolve(`src/components/${name}/index.ts`),
    output: {
      dir: resolve(`src/packages`),
      name: `[name].js`
    },
    plugins: [
      typescript(),
      vue({ css: false }),
      css({ output: `${name}.css` })

      // postcss({
      //   // extract: true,
      //   // extractCss: resolve(`src/packages/${name}/index.css`),
      //   // plugins: [autoprefixer(), cssnano()]
      // })
    ],
    external: ['vue']
  })
})

console.log(config)

export default config
