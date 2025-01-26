import { clipboard, dialog } from 'electron'
import util from 'util'

export const consoleInspect = (message: string) => {
  console.log(util.inspect(message, true, 7, true))
}

export const clipboardWriteText = (text: string) => {
  clipboard.writeText(text)
}

export const showMessageBox = (message: string) => {
  dialog.showMessageBox({ message })
}
