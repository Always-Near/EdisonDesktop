import { clipboard, dialog } from 'electron'

export const clipboardWriteText = (text: string) => {
  clipboard.writeText(text)
}

export const showMessageBox = (message: string) => {
  dialog.showMessageBox({ message })
}
