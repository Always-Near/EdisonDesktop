import React from 'react'
import { useTheme } from '../UseTheme'
import { radio } from './styles'

type Props = {
  checked: boolean
  title: string
  onChange: (value: boolean) => void
}

const Radio: React.FC<Props> = ({ checked, title, onChange }: Props) => {
  const appTheme = useTheme()

  return (
    <div
      className={radio(appTheme, checked)}
      onClick={() => {
        onChange(!checked)
      }}
    >
      <div>
        <span></span>
      </div>
      {title}
    </div>
  )
}

export default Radio
