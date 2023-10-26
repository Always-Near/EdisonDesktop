import React from 'react'
import { triangle } from './styles'

type Props = { size: number; color: string; className?: string }

const Triangle: React.FC<Props> = ({ size, color, className = '' }: Props) => {
  return <div className={`${triangle(size, color)} ${className}`} />
}

export default Triangle
