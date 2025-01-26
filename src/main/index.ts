import { app, Event } from 'electron'
import Application from './Application'
import System from './System'

System.processInit()
System.appInit()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

const options = System.getOptions()

if (!options.devMode) {
  // for single instance check
  const otherInstanceRunning = !app.requestSingleInstanceLock()
  if (otherInstanceRunning) {
    console.log('Exiting because another instance of the app is already running.')
    app.exit(1)
  }
}

const urlsToOpen: string[] = [...options.urlsToOpen]
const pathsToOpen: string[] = [...options.pathsToOpen]
const onOpenUrlBeforeReady = (event: Event, url: string) => {
  event.preventDefault()
  urlsToOpen.push(url)
}
const onOpenFileBeforeReady = (event: Event, file: string) => {
  event.preventDefault()
  pathsToOpen.push(file)
}

app.on('open-url', onOpenUrlBeforeReady)
app.on('open-file', onOpenFileBeforeReady)
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  app.removeListener('open-file', onOpenFileBeforeReady)
  app.removeListener('open-url', onOpenUrlBeforeReady)
  Application.start({
    devMode: options.devMode,
    urlsToOpen,
    pathsToOpen
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', Application.onActivate)
