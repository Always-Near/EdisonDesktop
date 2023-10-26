import React, { useState } from 'react'
import { useTheme } from '../UseTheme'
import { switchClass } from './styles'

type Props = {
  enable: boolean
  onChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ enable, onChange }: Props) => {
  const appTheme = useTheme()
  const [value, setValue] = useState(enable)

  return (
    <div
      className={switchClass(appTheme, value)}
      onClick={() => {
        const newValue = !value
        setValue(newValue)
        onChange(newValue)
      }}
    >
      <div className="box">
        <div />
      </div>
    </div>
  )
}

export default Switch
