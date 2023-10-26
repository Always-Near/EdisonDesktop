import { ipcRenderer } from 'electron'
import { RendererInvokeEventName, MainSendEventName, EventParams } from '~/constant/event'

export default class IPC {
  static invoke = <E extends Values<typeof RendererInvokeEventName>>(
    eventName: E,
    params: EventParams[E]
  ) => {
    return ipcRenderer.invoke(eventName, params)
  }

  static on = <E extends Values<typeof MainSendEventName>>(
    eventName: E,
    listener: (event: Electron.IpcRendererEvent, params: EventParams[E]) => void
  ) => {
    ipcRenderer.on(eventName, listener)
  }

  static removeListener = <E extends Values<typeof MainSendEventName>>(
    eventName: E,
    listener: (event: Electron.IpcRendererEvent, params: EventParams[E]) => void
  ) => {
    ipcRenderer.removeListener(eventName, listener)
  }
}
