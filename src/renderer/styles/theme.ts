import { Theme } from '~/constant/app'

const BaseColors = {
  white: '#ffffff',
  black: '#000000',
  transparentBlack: 'rgba(0,0,0,0.4)'
} as const

const Fonts = {
  extraExtraLarge: 40,
  extraLarge: 36,
  large: 24,
  medium: 20,
  small: 16,
  extraSmall: 14,
  extraExtraSmall: 12
} as const

const Spacing = {
  xxsmall: 4,
  xsmall: 8,
  small: 12,
  medium: 20,
  large: 24,
  xlarge: 40,
  guttersmall: 50,
  gutter: 80,
  header: 10,
  footer: 0,
  maxWidth: 700,
  headerTop: 25,
  xxsWidth: 50,
  xsWidth: 100,
  width: 200,
  lWidth: 300,
  xlWidth: 400,
  xxlWidth: 500
} as const

const LightTheme = {
  ...BaseColors,
  primary: '#136aee',
  primaryOpacity: 'rgba(19, 106, 238, 0.5)',
  active: '#1de9b6',
  activeOpacity: 'rgba(29, 233, 182, 0.5)',
  green: '#31d76e',
  red: '#ff485f',
  yellow: '#ffd41a',
  orange: '#ffa115',
  purple: '#755cf2',
  teal: '#59dce4',
  textUltraLight: '#CECECE',
  textLight: '#999999',
  textMedium: '#666666',
  textDark: '#000001',
  primaryBackground: '#fffffe',
  secondaryBackground: '#f6f9fc',
  card: '#fffefe',
  orangeLight: '#FFF5E6',
  redLight: '#fff2f4',
  greenLight: '#E5FAED',
  divider: '#ebebeb',
  background: '#fffffe',
  statusBarColor: '#1641d6'
} as const

const DarkTheme = {
  ...BaseColors,
  primary: '#2D7EF7',
  primaryOpacity: 'rgba(45, 126, 247, 0.5)',
  active: '#1de9b6',
  activeOpacity: 'rgba(29, 233, 182, 0.5)',
  green: '#51DD84',
  red: '#FD6478',
  yellow: '#FFDB3D',
  orange: '#FEAF39',
  purple: '#9582F5',
  teal: '#7FE4EA',
  textUltraLight: '#666666',
  textLight: '#999999',
  textMedium: '#CECECE',
  textDark: '#FFFFFF',
  primaryBackground: '#171717',
  secondaryBackground: '#262626',
  card: '#252525',
  orangeLight: '#423627',
  redLight: '#2F2123',
  greenLight: '#2B2E2C',
  divider: '#323233',
  background: '#121212',
  statusBarColor: '#1641d6'
} as const

const Shadow =
  '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)'

const ThemeExcludeColors = {
  Shadow,
  fontSizes: Fonts,
  spacing: Spacing,
  borderRadius: 10,
  labelBacakgroundOpacity: 0.2
} as const

export const AppTheme = (theme: Values<typeof Theme>) => {
  if (theme === Theme.DARK) {
    return { ...ThemeExcludeColors, colors: DarkTheme }
  }
  return { ...ThemeExcludeColors, colors: LightTheme }
}

export type Theme = ReturnType<typeof AppTheme>
