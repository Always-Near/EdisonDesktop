import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const switchClass = (appTheme: AppTheme, enable: boolean) => css`
  display: flex;
  align-items: center;
  height: 100%;

  .box {
    height: ${appTheme.spacing.large}px;
    width: ${appTheme.spacing.large * 2}px;
    border-radius: ${appTheme.spacing.large}px;
    border: 2px solid ${appTheme.colors.divider};
    background: ${enable ? appTheme.colors.active : appTheme.colors.primaryBackground};

    div {
      height: ${appTheme.spacing.large}px;
      width: ${appTheme.spacing.large}px;
      border-radius: ${appTheme.spacing.large}px;
      background: ${appTheme.colors.white};
      box-shadow: 0 0 0 2px ${appTheme.colors.divider};
      transform: translateX(${enable ? appTheme.spacing.large : 0}px);
      transition: all 0.3s linear;
    }
  }
`
