import { BrowserWindow, nativeTheme } from 'electron'
import { ThemeMode } from '~/constant/app'
import { ConfigKey, ConfigKeys, ConfigValue } from '~/constant/config'
import { EventParams, MainSendEventName } from '~/constant/event'
import { EventListener } from '~/utils/EventListener'
import GraphqlServer from '../Graphql'

class Config {
  private listenerMaping = new EventListener()

  private initAppearanceTheme = (theme?: Values<typeof ThemeMode>) => {
    if (theme) {
      nativeTheme.themeSource = theme
    }
    this.addListener(ConfigKeys.AppearanceTheme, value => {
      nativeTheme.themeSource = value as Values<typeof ThemeMode>
    })
  }

  initConfig = async () => {
    const configData = await GraphqlServer.handleRequester().GetConfig()
    const AppearanceTheme = configData?.config?.AppearanceTheme
    this.initAppearanceTheme(AppearanceTheme as Values<typeof ThemeMode>)
  }

  addListener = <K extends ConfigKey>(key: K, callback: (value: ConfigValue<K>) => void) => {
    this.listenerMaping.addEventListener(key, callback)
  }

  removeListener = <K extends ConfigKey>(key: K, callback: (value: ConfigValue<K>) => void) => {
    this.listenerMaping.removeEventListener(key, callback)
  }

  private sendToWebContents = <K extends Values<typeof MainSendEventName>>(
    key: K,
    value: EventParams[K]
  ) => {
    const allWindows = BrowserWindow.getAllWindows()
    allWindows.forEach(item => {
      item.webContents.send(key, value)
    })
  }

  onChange = <K extends ConfigKey>(key: K, value: ConfigValue<K>) => {
    this.listenerMaping.emitEvent(key, value)
    this.sendToWebContents(MainSendEventName.OnConfigChange, { key: key, value: value })
  }

  onDarkModeUpdate = () => {
    this.sendToWebContents(MainSendEventName.OnDarkModeUpdate, nativeTheme.shouldUseDarkColors)
  }
}

export default new Config()
