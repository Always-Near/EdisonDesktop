import { EventParams, MainSendEventName } from '~/constant/event'
import IPC from '../common/IPC'

export default {
  addListener: (
    listener: (
      event: Electron.IpcRendererEvent,
      params: EventParams[typeof MainSendEventName.OnConfigChange]
    ) => void
  ) => {
    IPC.on(MainSendEventName.OnConfigChange, listener)
  },
  removeListener: (
    listener: (
      event: Electron.IpcRendererEvent,
      params: EventParams[typeof MainSendEventName.OnConfigChange]
    ) => void
  ) => {
    IPC.removeListener(MainSendEventName.OnConfigChange, listener)
  }
}
