const setting = require('./setting')
const relocateLoader = require('@vercel/webpack-asset-relocator-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const cssPlugin = new MiniCssExtractPlugin({
  filename: 'css/[name].[contenthash].css'
})

const tsCheckerPlugin = new ForkTsCheckerWebpackPlugin({
  typescript: {
    diagnosticOptions: {
      semantic: true,
      syntactic: true
    }
  }
})

const eslintPlugin = new ESLintPlugin({
  threads: true,
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  files: setting.appPath,
  fix: true
})

const relocateLoaderPlugin = {
  apply(compiler) {
    compiler.hooks.compilation.tap('webpack-asset-relocator-loader', compilation => {
      relocateLoader.initAssetCache(compilation, setting.outputAssetBase)
    })
  }
}

module.exports = {
  main: {
    dev: [tsCheckerPlugin, eslintPlugin, relocateLoaderPlugin],
    prod: []
  },
  renderer: {
    dev: [cssPlugin, tsCheckerPlugin, eslintPlugin],
    prod: [cssPlugin]
  }
}
