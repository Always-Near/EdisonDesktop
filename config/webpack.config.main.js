const setting = require('./setting')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

module.exports = {
  entry: './src/main/index.ts',
  devtool: setting.isDev ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '~': `${setting.srcPath}`
    }
  },
  // externals: ['better-sqlite3'],
  module: {
    rules: rules.main
  },
  plugins: setting.isDev ? plugins.main.dev : plugins.main.prod
}
