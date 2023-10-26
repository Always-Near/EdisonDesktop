import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const tabList = (appTheme: AppTheme) => css`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${appTheme.colors.divider};
  position: relative;
`

export const tabItem = (
  { colors, fontSizes, spacing }: AppTheme,
  small: boolean,
  active: boolean
) => css`
  position: relative;
  overflow: hidden;

  .text {
    color: ${active ? colors.active : colors.textMedium};
    font-size: ${small ? fontSizes.extraSmall : fontSizes.small}px;
    line-height: ${small ? fontSizes.extraSmall : fontSizes.small}px;
    padding: ${spacing.medium}px;
    cursor: pointer;
    z-index: 2;
    position: relative;
  }

  .click-style {
    background: ${colors.activeOpacity};
    border-radius: 50%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
    visibility: ${active ? 'visible' : 'hidden'};
    ${active ? 'animation: ripple 0.5s ease-out;' : null}
    animation-fill-mode: forwards;

    @keyframes ripple {
      from {
        width: 0px;
        height: 0px;
        opacity: 1;
      }
      to {
        width: 100px;
        height: 100px;
        opacity: 0;
      }
    }
  }
`

export const activeBar = ({ colors, spacing }: AppTheme, width: number, translateX: number) => css`
  position: absolute;
  bottom: 0;
  width: ${width}px;
  height: ${spacing.xxsmall}px;
  transform: translateX(${translateX}px);
  background: ${colors.active};
  transition: all 0.3s linear;
`
