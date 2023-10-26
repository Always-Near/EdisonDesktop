import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const notification = (appTheme: AppTheme, error: boolean) => css`
  position: absolute;
  right: ${appTheme.spacing.xlarge}px;
  padding: ${appTheme.spacing.small}px ${appTheme.spacing.medium}px;
  background: ${error ? appTheme.colors.red : appTheme.colors.primary};
  border-radius: 5px;
  animation: notificationPop 0.3s ease-out 1;
  animation-fill-mode: forwards;

  @keyframes notificationPop {
    from {
      top: 0px;
    }
    to {
      top: -${appTheme.spacing.gutter}px;
    }
  }
`
