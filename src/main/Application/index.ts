import BrowserWindowManagement from '../BrowserWindowManagement'
import Config from '../Config'
import GraphqlServer from '../Graphql'
import IPCListener from '../IPCListener'
import System, { SystemOptions } from '../System'

class Application {
  private shellStartTime: number
  private options?: SystemOptions
  private userDataDir = ''

  constructor() {
    this.shellStartTime = Date.now()
  }

  start = (options: SystemOptions) => {
    this.options = options
    this.userDataDir = System.setupUserDataDir(options)
    IPCListener.registerListener()
    GraphqlServer.startApolloServer()
    Config.initConfig()
    BrowserWindowManagement.initMainWindow()

    console.log(this.shellStartTime)
    console.log(this.options)
    console.log(this.userDataDir)
  }

  onActivate = () => {
    BrowserWindowManagement.onAppActivate()
  }
}

export default new Application()
