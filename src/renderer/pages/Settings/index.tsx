import React from 'react'
import { ConfigKeys } from '~/constant/config'
import { useTheme } from '~/renderer/component/UseTheme'
import { container } from './styles'
import SettingsComponent from '~/renderer/component/Settings'

const { SettingsAppearance } = SettingsComponent
const Settings: React.FC = () => {
  const appTheme = useTheme()

  return (
    <div className={container(appTheme)}>
      <div key={ConfigKeys.AppearanceTheme}>
        <div className="title">外观</div>
        <div className="items">
          <SettingsAppearance configKey={ConfigKeys.AppearanceTheme} />
        </div>
      </div>
    </div>
  )
}

export default Settings
