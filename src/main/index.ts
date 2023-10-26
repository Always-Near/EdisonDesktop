import { app } from 'electron'
import Application from './Application'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

app.enableSandbox()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', Application.start)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', Application.onActivate)
