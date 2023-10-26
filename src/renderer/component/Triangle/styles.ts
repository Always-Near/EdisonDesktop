import { css } from 'emotion'

export const triangle = (size: number, color: string) => css`
  width: 0;
  height: 0;
  border-top: ${size}px solid ${color};
  border-right: ${size}px solid transparent;
  border-left: ${size}px solid transparent;
  box-sizing: border-box;
`
