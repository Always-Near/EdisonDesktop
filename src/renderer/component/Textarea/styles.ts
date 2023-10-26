import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const textarea = (appTheme: AppTheme) => css`
  width: 100%;
  box-sizing: border-box;
  padding: ${appTheme.spacing.medium}px;
  border-radius: 10px;
  background: ${appTheme.colors.secondaryBackground};
  resize: none;
  color: ${appTheme.colors.textDark};
  line-height: ${appTheme.fontSizes.large}px;
  outline: none;
`
