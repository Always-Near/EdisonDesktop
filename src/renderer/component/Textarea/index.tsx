import React, { TextareaHTMLAttributes } from 'react'
import { useTheme } from '../UseTheme'
import { textarea } from './styles'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...otherProps }: Props, ref) => {
    const appTheme = useTheme()
    const allClassName = `${textarea(appTheme)} ${className || ''}`

    return <textarea ref={ref} {...otherProps} className={allClassName} />
  }
)

export default Textarea
