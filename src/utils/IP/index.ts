type StringIp = [string, string, string, string]
type NumberIp = [number, number, number, number]

/**
 * the param should be like 24 or ["00000000", "11111111", "11110001", "00001000"] or [255, 255, 255, 248]
 */
export const resolveSubnetMask = (mask: number | StringIp | NumberIp) => {
  const maskCIDR =
    typeof mask === 'number'
      ? mask
      : mask
          .map(item =>
            typeof item === 'string' ? item.padStart(8, '0') : item.toString(2).padStart(8, '0')
          )
          .join('')
          .replace(/0.*$/g, '').length
  const list: [Array<'0' | '1'>, Array<'0' | '1'>, Array<'0' | '1'>, Array<'0' | '1'>] = [
    new Array(8).fill('').map((item, idx) => (idx < maskCIDR ? '1' : '0')),
    new Array(8).fill('').map((item, idx) => (idx + 8 < maskCIDR ? '1' : '0')),
    new Array(8).fill('').map((item, idx) => (idx + 16 < maskCIDR ? '1' : '0')),
    new Array(8).fill('').map((item, idx) => (idx + 24 < maskCIDR ? '1' : '0'))
  ]
  return {
    cidr: maskCIDR,
    binary: list.map(item => item.join('')) as StringIp,
    dec: list.map(item => parseInt(item.join(''), 2)) as NumberIp,
    hex: list.map(item => parseInt(item.join(''), 2).toString(16)) as StringIp,
    canUse: parseInt(new Array(32 - maskCIDR).fill('1').join(''), 2) - 1 || 0,
    canUseAll: parseInt(new Array(32 - maskCIDR).fill('1').join(''), 2) + 1 || 0
  }
}

/**
 * the param should be like [255, 255, 255, 248]
 */
export const resolveNetId = (ip: NumberIp, decMask: NumberIp) => {
  return ip.map((item, idx) => item & decMask[idx]) as NumberIp
}

/**
 * the param should be like [255, 255, 255, 248]
 */
export const resolveBroadcastAddress = (ip: NumberIp, binaryMask: StringIp) => {
  return ip.map((item, idx) => {
    const maskBinary = binaryMask[idx]
    const ipBinary = item.toString(2).padStart(8, '0')
    let str = ''
    for (let i = 0; i < ipBinary.length; i++) {
      if (maskBinary[i] === '1') {
        str += ipBinary[i]
      } else {
        str += '1'
      }
    }
    return parseInt(str, 2)
  }) as NumberIp
}
