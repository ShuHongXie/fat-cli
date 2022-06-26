import path from 'path'

const resolve = (filePath: string) => {
  return path.join(process.cwd(), filePath)
}

const list = []
;['image'].forEach((name) => {
  list.push({
    input: resolve(`src/components/${name}/index.ts`),
    output: {
      dir: resolve('package/${name}'),
      file: '[name].js'
    }
  })
})

export default list
