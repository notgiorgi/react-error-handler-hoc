import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

var env = process.env.NODE_ENV
var pkg = require('./package.json')

var config = {
  entry: 'src/index.js',
  sourceMap: true,
  plugins: [
    resolve({}),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  dest: pkg['main'],
  format: 'es'
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
