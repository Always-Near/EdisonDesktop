import React from 'react'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { notification } from './styles'
import { withTheme } from '../UseTheme'

type Props = {
  appTheme: AppTheme
}

type State = {
  text: string
  error: boolean
}

const notificationRef = React.createRef<Notification>()

class Notification extends React.Component<Props, State> {
  private timer: NodeJS.Timeout | null = null
  constructor(props: Props) {
    super(props)
    this.state = {
      text: '',
      error: false
    }
  }

  show = (option: NotificationOption) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    const { message, duration = 2000, error = false } = option
    this.setState(
      {
        text: ''
      },
      () => {
        this.setState(
          {
            text: message,
            error
          },
          () => {
            this.timer = setTimeout(() => {
              this.setState({ text: '' })
            }, duration)
          }
        )
      }
    )
  }

  render() {
    const { appTheme } = this.props
    const { text, error } = this.state
    if (!text) {
      return null
    }
    return <div className={notification(appTheme, error)}>{text}</div>
  }
}

const WithThemeNotification = withTheme(Notification)

export { WithThemeNotification, notificationRef }

type NotificationOption = { message: string; duration?: number; error?: boolean }

export default {
  show: (option: NotificationOption) => {
    notificationRef.current?.show(option)
  }
}
