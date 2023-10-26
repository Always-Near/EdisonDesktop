import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const button = (appTheme: AppTheme) => css`
  color: ${appTheme.colors.background};
  font-size: ${appTheme.fontSizes.extraSmall}px;
  line-height: ${appTheme.fontSizes.small}px;
  padding: ${appTheme.spacing.small}px ${appTheme.spacing.medium}px;
  cursor: pointer;
  background: ${appTheme.colors.active};
  border-radius: 5px;
  border: none;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.7;
  }
`
