import React from 'react'
import close from '~/assets/svg/close.svg'
import comparer from '~/assets/svg/comparer.svg'
import decoder from '~/assets/svg/decoder.svg'
import dict from '~/assets/svg/dict.svg'
import home from '~/assets/svg/home.svg'
import intruder from '~/assets/svg/intruder.svg'
import note from '~/assets/svg/note.svg'
import output from '~/assets/svg/output.svg'
import project from '~/assets/svg/project.svg'
import settings from '~/assets/svg/settings.svg'
import tool from '~/assets/svg/tool.svg'

const IconMap = {
  Close: close,
  Comparer: comparer,
  Decoder: decoder,
  Dictionary: dict,
  Home: home,
  Intruder: intruder,
  Note: note,
  Output: output,
  Project: project,
  Settings: settings,
  Tool: tool
} as const

const SVGSizes = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 44,
  xl: 72
} as const

export type IconName = keyof typeof IconMap
export type IconSize = keyof typeof SVGSizes

type Props = {
  name: IconName
  size: IconSize
  color?: string
}

const Icon: React.FC<Props> = ({ name, size, color = '#000' }: Props) => {
  const { id, viewBox } = IconMap[name]
  const svgSize = SVGSizes[size]
  return (
    <svg height={svgSize} width={svgSize} viewBox={`${viewBox}`} stroke={color}>
      <use xlinkHref={`#${id}`} />
    </svg>
  )
}

export default Icon
