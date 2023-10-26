import React, { useEffect, useMemo, useState } from 'react'
import { Theme } from '~/constant/app'
import ThemeListener from './listener'
import { AppTheme } from '~/renderer/styles/theme'

export function useTheme() {
  const [theme, setTheme] = useState<Values<typeof Theme>>(ThemeListener.value)
  const onDarkModeUpdate = (mode: Values<typeof Theme>) => {
    setTheme(mode)
  }
  useEffect(() => {
    ThemeListener.addListener(onDarkModeUpdate)
    return () => {
      ThemeListener.removeListener(onDarkModeUpdate)
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
