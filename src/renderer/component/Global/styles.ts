import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const globalTop = (appTheme: AppTheme) => css`
  width: 100%;
  height: 0px;
  position: absolute;
  top: 0;
  left: 0;
  zindex: 100;
`
export const globalBottom = (appTheme: AppTheme) => css`
  width: 100%;
  height: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  zindex: 100;
`
