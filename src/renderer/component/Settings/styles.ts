import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const settingNotePathBox = ({ spacing }: AppTheme) => css`
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  .input-flex {
    flex: 1;
  }

  .save-btn {
    margin-left: ${spacing.small}px;
  }
`
