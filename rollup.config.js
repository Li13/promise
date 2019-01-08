import path from 'path'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

const resolve = _path => path.resolve(__dirname, _path)

let builds = {
  'cjs': {
    file: resolve('dist/promise.common.js'),
    format: 'cjs'
  },
  'esm': {
    file: resolve('dist/promise.esm.js'),
    format: 'es'
  },
  'dev': {
    file: resolve('dist/promise.js'),
    format: 'umd',
    env: 'development'
  },
  'prod': {
    file: resolve('dist/promise.min.js'),
    format: 'umd',
    env: 'production'
  }
}

function getConfig (name) {
  const opts = builds[name]
  let config = {
    input: resolve('src/index.js'),
    output: {
      file: opts.file,
      format: opts.format,
      name: 'promise'
    },
    plugins: [
      buble()
    ]
  }

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))

    if (opts.env === 'production') {
      config.plugins.push(terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      }))
    }
  }

  return config
}

export default getConfig(process.env.TARGET || 'cjs')
