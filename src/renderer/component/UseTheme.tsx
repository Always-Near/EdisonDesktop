import React, { useEffect, useMemo, useState } from 'react'
import { Theme } from '~/constant/app'
import { AppTheme } from '~/renderer/styles/theme'

let themeInit: Values<typeof Theme> = Theme.LIGHT

const isDarkMode = async () => {
  const appInfo = await window.Graphql.GetAppInfo()
  const isDarkMode = appInfo?.app?.isDarkMode
  return isDarkMode
}

isDarkMode().then(result => {
  if (result) {
    themeInit = Theme.DARK
  } else {
    themeInit = Theme.LIGHT
  }
})

export function useTheme() {
  const [theme, setTheme] = useState<Values<typeof Theme>>(themeInit)
  const onDarkModeUpdate = (event: Electron.IpcRendererEvent, value: boolean) => {
    if (value) {
      setTheme(Theme.DARK)
      themeInit = Theme.DARK
    } else {
      setTheme(Theme.LIGHT)
      themeInit = Theme.LIGHT
    }
  }
  useEffect(() => {
    window.ThemeEvent.addListener(onDarkModeUpdate)
    return () => {
      window.ThemeEvent.removeListener(onDarkModeUpdate)
    }
  }, [])

  return useMemo(() => AppTheme(theme), [theme])
}

export function withTheme<P>(Component: React.ComponentType<P>) {
  type TodoPreview = Omit<P, 'appTheme'>

  return React.forwardRef((props: TodoPreview, ref) => {
    const theme = useTheme()
    return <Component ref={ref} {...(props as P)} appTheme={theme} />
  })
}
