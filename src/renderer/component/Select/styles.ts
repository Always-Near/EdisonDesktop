import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const selectBox = (appTheme: AppTheme, active: boolean) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: ${appTheme.fontSizes.small}px;
  font-size: ${appTheme.fontSizes.small}px;
  padding: ${appTheme.spacing.medium}px;
  color: ${appTheme.colors.textDark};
  border-radius: 5px;
  border: 1px solid ${active ? appTheme.colors.active : appTheme.colors.divider};
  outline: none;
  position: relative;
  box-sizing: border-box;

  .title {
    color: ${active ? appTheme.colors.active : appTheme.colors.textLight};
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
`

export const icon = (appTheme: AppTheme, active: boolean) => css`
  margin-left: ${appTheme.spacing.medium}px;
  transition: all 0.3s linear;
  transform: rotate(${active ? 180 : 0}deg);
`

export const selectList = (appTheme: AppTheme, height: number) => css`
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: ${height}px;
  z-index: 10;
  background: ${appTheme.colors.secondaryBackground};
  padding: ${appTheme.spacing.xsmall}px 0;
  border-radius: 5px;
  box-shadow: ${appTheme.Shadow};

  .selectItem {
    padding: ${appTheme.spacing.small}px ${appTheme.spacing.medium}px;

    &:hover {
      background: ${appTheme.colors.textUltraLight};
    }

    &.active {
      background: ${appTheme.colors.activeOpacity};
    }
  }
`
