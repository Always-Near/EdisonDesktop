import React, { useCallback, useEffect, useState } from 'react'
import { ThemeMode, ThemeOptionsName } from '~/constant/app'
import { ConfigKeys } from '~/constant/config'
import Select from '~/renderer/component/Select'

const ThemeOptionList = Object.values(ThemeOptionsName)

type Props = {
  configKey: Values<typeof ConfigKeys>
}

const SettingsAppearance: React.FC<Props> = ({ configKey }: Props) => {
  const [choose, setChoose] = useState<string>(ThemeOptionList[0])

  const get = async () => {
    const config = await window.Graphql.GetConfig()
    const AppearanceTheme = config?.config?.AppearanceTheme
    return AppearanceTheme
  }

  const set = async (themeMode: Values<typeof ThemeMode>) => {
    await window.Graphql.UpdateConfig({ key: configKey, value: themeMode })
  }

  useEffect(() => {
    get().then(result => {
      if (result) {
        setChoose(ThemeOptionsName[result as Values<typeof ThemeMode>])
      }
    })
  }, [])

  const update = useCallback((value: string) => {
    setChoose(value)
    const mode = Object.keys(ThemeOptionsName).find(
      key => ThemeOptionsName[key as Values<typeof ThemeMode>] === value
    )
    if (mode) {
      set(mode as Values<typeof ThemeMode>)
    }
  }, [])

  return (
    <Select
      data={ThemeOptionList.map(item => item)}
      value={choose}
      onChange={value => update(value)}
    />
  )
}

export default SettingsAppearance
