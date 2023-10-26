import fs from 'fs'
import path from 'path'

export const isDri = (dirPath: string) => {
  try {
    if (!fs.existsSync(dirPath)) {
      return { isDir: false, errorMsg: `directory: ${dirPath} doesn't exist!` }
    }
    const stat = fs.lstatSync(dirPath)
    if (stat.isDirectory()) {
      return { isDir: true }
    } else {
      return { isDir: false, errorMsg: `directory: ${dirPath} is not a folder!` }
    }
  } catch (err: any) {
    return { isDir: false, errorMsg: `unknow error: ${err.message}` }
  }
}

export const readDir = (dirPath: string) => {
  const pathIsDir = isDri(dirPath).isDir
  if (!pathIsDir) {
    return []
  }
  try {
    const fileList = fs.readdirSync(dirPath, { withFileTypes: true })
    return fileList.map(f => {
      return {
        isDir: f.isDirectory(),
        name: f.name,
        path: path.join(dirPath, f.name)
      }
    })
  } catch (err) {
    return []
  }
}
