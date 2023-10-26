import React from 'react'
import { WithThemeNotification, notificationRef } from '../Notification'
import { useTheme } from '../UseTheme'
import { globalBottom, globalTop } from './styles'

const Global: React.FC = () => {
  const appTheme = useTheme()
  return (
    <>
      <div className={globalTop(appTheme)}></div>
      <div className={globalBottom(appTheme)}>
        <WithThemeNotification ref={notificationRef} />
      </div>
    </>
  )
}

export default Global
