import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = ({ colors }: AppTheme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${colors.primaryBackground};

  .title {
    width: 75px;
    flex: 0 0 auto;
    color: ${colors.textDark};
  }

  .items {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
`
