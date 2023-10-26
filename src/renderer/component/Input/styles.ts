import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const input = (appTheme: AppTheme, error: boolean, active: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${appTheme.spacing.medium}px;
  border-radius: 5px;
  border: 1px solid
    ${error ? appTheme.colors.red : active ? appTheme.colors.active : appTheme.colors.divider};
  outline: none;
  position: relative;
  box-sizing: border-box;

  ${error ? 'animation: inputShake 0.3s ease-out 1;' : ''}

  input {
    line-height: ${appTheme.fontSizes.small}px;
    font-size: ${appTheme.fontSizes.small}px;
    color: ${appTheme.colors.textDark};
    background: none;
    outline: none;
    border: none;
    width: 100%;
    flex: 1;
  }

  .title {
    color: ${error
      ? appTheme.colors.red
      : active
      ? appTheme.colors.active
      : appTheme.colors.textLight};
    line-height: ${appTheme.fontSizes.extraExtraSmall}px;
    font-size: ${appTheme.fontSizes.extraExtraSmall}px;
    padding: 0 ${appTheme.spacing.xxsmall}px;
    position: absolute;
    top: -${appTheme.fontSizes.extraExtraSmall / 2}px;
    left: ${appTheme.spacing.medium}px;
    background: ${appTheme.colors.primaryBackground};
  }

  .layout-placehold {
    height: 0;
    overflow: hidden;
  }

  @keyframes inputShake {
    0% {
      transform: translateX(0px);
    }
    25% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0px);
    }
  }
`
