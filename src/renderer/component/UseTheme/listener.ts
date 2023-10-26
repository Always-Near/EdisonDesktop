import { Theme } from '~/constant/app'
import { EventListener } from '~/utils/EventListener'

class ThemeListener {
  constructor() {
    window.ThemeEvent.addListener((event: Electron.IpcRendererEvent, isDark: boolean) =>
      this.onDarkModeUpdate(isDark)
    )
    this.init()
  }

  private listenerMaping = new EventListener()
  private listenerKey = 'theme'

  private isDark: Values<typeof Theme> = Theme.LIGHT

  get value() {
    return this.isDark
  }

  private init = async () => {
    const appInfo = await window.Graphql.GetAppInfo()
    const isDarkMode = appInfo?.app?.isDarkMode
    this.isDark = isDarkMode ? Theme.DARK : Theme.LIGHT
    this.listenerMaping.emitEvent(this.listenerKey, this.isDark)
  }

  private onDarkModeUpdate = (isDark: boolean) => {
    this.isDark = isDark ? Theme.DARK : Theme.LIGHT
    this.listenerMaping.emitEvent(this.listenerKey, this.isDark)
  }

  addListener = (callback: (mode: Values<typeof Theme>) => void) => {
    this.listenerMaping.addEventListener(this.listenerKey, callback)
  }

  removeListener = (callback: (mode: Values<typeof Theme>) => void) => {
    this.listenerMaping.removeEventListener(this.listenerKey, callback)
  }
}

export default new ThemeListener()
