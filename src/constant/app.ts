export const Theme = {
  DARK: 'dark',
  LIGHT: 'light'
} as const

export const ThemeMode = {
  DARK: 'dark',
  LIGHT: 'light',
  AUTO: 'system'
} as const

export const ThemeOptionsName = {
  [ThemeMode.DARK]: '深色',
  [ThemeMode.LIGHT]: '浅色',
  [ThemeMode.AUTO]: '跟随系统'
} as const
