import BrowserWindowManagement from '../BrowserWindowManagement'
import Config from '../Config'
import GraphqlServer from '../Graphql'
import IPCListener from '../IPCListener'

class Application {
  start = (options: any) => {
    IPCListener.registListener()
    GraphqlServer.startApolloServer()
    Config.initConfig()
    BrowserWindowManagement.initMainWindow()
  }

  onActivate = () => {
    BrowserWindowManagement.onAppActivate()
  }
}

export default new Application()
