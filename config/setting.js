'use strict'

const path = require('path')
const os = require('os')

const srcPath = path.join(__dirname, '../src')
const appPath = path.join(__dirname, '../')
const mainPath = path.join(srcPath, 'main')
const rendererPath = path.join(srcPath, 'renderer')
const assetsPath = path.join(srcPath, 'assets')
const tsconfigPath = path.join(appPath, 'tsconfig.json')
const outputAssetBase = 'native_modules'
const port = 8080
const host = '0.0.0.0'
const cpuSize = os.cpus().length

module.exports = {
  srcPath,
  appPath,
  mainPath,
  rendererPath,
  assetsPath,
  tsconfigPath,
  outputAssetBase,
  port,
  host,
  cpuSize,
  isDev: process.env.NODE_ENV != 'production'
}
