import { ipcMain, nativeTheme } from 'electron'
import { EventParams, RendererInvokeEventName } from '~/constant/event'
import Config from '../Config'
import GraphqlServer from '../Graphql'

class IPCListener {
  registerListener() {
    ipcMain.handle(
      RendererInvokeEventName.Graphql,
      (event, params: EventParams[typeof RendererInvokeEventName.Graphql]) => {
        return GraphqlServer.handleGraphql(params)
      }
    )
    nativeTheme.addListener('updated', () => {
      Config.onDarkModeUpdate()
    })
  }

  removeListener() {
    ipcMain.removeHandler(RendererInvokeEventName.Graphql)
    nativeTheme.removeAllListeners()
  }
}

export default new IPCListener()
