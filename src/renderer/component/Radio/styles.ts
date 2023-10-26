import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const radio = (appTheme: AppTheme, active: boolean) => css`
  display: flex;
  align-items: center;
  color: ${appTheme.colors.textDark};
  line-height: ${appTheme.spacing.large}px;
  font-size: ${appTheme.fontSizes.extraSmall}px;
  padding: 0 ${appTheme.spacing.xsmall}px;

  div {
    height: ${appTheme.spacing.large}px;
    width: ${appTheme.spacing.large}px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${appTheme.spacing.large / 2}px;

    &:hover {
      background-color: rgba(29, 233, 182, 0.3);
    }
  }

  span {
    display: block;
    height: ${appTheme.spacing.xsmall}px;
    width: ${appTheme.spacing.xsmall}px;
    border-radius: ${appTheme.spacing.xsmall / 2}px;
    background: ${active ? appTheme.colors.active : 'none'};
    box-shadow: 0 0 0 2px ${appTheme.colors.primaryBackground},
      0 0 0 4px ${active ? appTheme.colors.active : appTheme.colors.textLight};
  }
`
