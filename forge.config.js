module.exports = {
  packagerConfig: {
    icon: './src/assets/icon/icon_circle.icns'
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'EdisonDesktop',
        icon: './src/assets/icon/icon_circle.icns',
        overwrite: true
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './config/webpack.config.main',
        renderer: {
          config: './config/webpack.config.renderer',
          nodeIntegration: false,
          entryPoints: [
            {
              name: 'main_window',
              html: './src/renderer/index.html',
              js: './src/renderer/index.tsx',
              preload: {
                js: './src/preload/index.ts'
              }
            }
          ]
        }
      }
    }
  ]
}
