const setting = require('./setting')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

module.exports = {
  devtool: setting.isDev ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
    alias: {
      '~': `${setting.srcPath}`
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      maxSize: 1024 * 1024,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: rules.renderer
  },
  plugins: setting.isDev ? plugins.renderer.dev : plugins.renderer.prod
}
