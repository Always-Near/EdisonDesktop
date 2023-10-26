import React, { ButtonHTMLAttributes } from 'react'
import { useTheme } from '../UseTheme'
import { button } from './styles'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string
}

const Button: React.FC<Props> = ({ title, className, ...otherProps }: Props) => {
  const appTheme = useTheme()
  return (
    <button className={`${button(appTheme)} ${className || ''}`} {...otherProps}>
      {title}
    </button>
  )
}

export default Button
