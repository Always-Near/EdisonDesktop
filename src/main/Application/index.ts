import { app } from 'electron'
import path from 'path'
import AppConfig from '~/config'
import BrowserWindowManagement from '../BrowserWindowManagement'
import Config from '../Config'
import GraphqlServer from '../Graphql'
import IPCListener from '../IPCListener'
import { EnvEnum } from '~/config/constant'

class Application {
  start = () => {
    if (AppConfig.currentEnv() === EnvEnum.dev) {
      app.dock.setIcon(path.join(process.cwd(), 'src/assets/icon/icon_circle.png'))
    }
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
