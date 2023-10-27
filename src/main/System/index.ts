import { app } from 'electron'
import optimist from 'optimist'
import path from 'path'

class System {
  processInit = () => {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
    if (typeof process.setFdLimit === 'function') {
      process.setFdLimit(1024)
    }
  }

  appInit = () => {
    if (process.env.HTTP_PROXY) {
      app.commandLine.appendSwitch('proxy-server', process.env.HTTP_PROXY)
      app.commandLine.appendSwitch('proxy-bypass-list', '<local>;')
    }
    if (process.env.HTTPS_PROXY) {
      app.commandLine.appendSwitch('proxy-server', process.env.HTTPS_PROXY)
      app.commandLine.appendSwitch('proxy-bypass-list', '<local>;')
    }
    app.enableSandbox()
    app.setAppUserModelId('com.squirrel.edisonmail.edisonmail')
  }

  private declareOptions = (argv: string[]) => {
    const options = optimist(argv)
    options.usage(
      'EdisonMail\n\nUsage: edisonmail [options]\n\nRun EdisonMail: The open source extensible email client\n\n`edisonmail --dev` to start the client in dev mode.\n\n`edisonmail --test` to run unit tests.'
    )
    options.alias('d', 'dev').boolean('d').describe('d', 'Run in development mode.')
    options
      .alias('b', 'background')
      .boolean('b')
      .describe('b', 'Start Mailspring in the background')
    return options
  }

  private parseCommandLine = (argv: string[]) => {
    const options = this.declareOptions(argv.slice(1))
    const args = options.argv
    const devMode = args['dev']
    const background = args['background']
    const urlsToOpen: string[] = []
    const pathsToOpen: string[] = []
    const resourcePath = path.normalize(path.resolve(path.dirname(path.dirname(__dirname))))
    let ignoreNext = false
    // args._ is all of the non-hyphenated options.
    for (const arg of args._) {
      if (ignoreNext) {
        ignoreNext = false
        continue
      }
      if (arg.includes('executed-from') || arg.includes('squirrel')) {
        ignoreNext = true
        continue
      }
      // Skip the argument if it's part of the main electron invocation.
      if (path.resolve(arg) === resourcePath) {
        continue
      }
      if (arg.startsWith('mailto:') || arg.startsWith('edisonmail:')) {
        urlsToOpen.push(arg)
      } else if (arg[0] !== '-' && /[/|\\]/.test(arg)) {
        pathsToOpen.push(arg)
      }
    }

    return {
      devMode,
      background,
      urlsToOpen,
      pathsToOpen
    }
  }

  getOptions = () => {
    return this.parseCommandLine(process.argv)
  }
}

export default new System()
