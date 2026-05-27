import type { ReactNode } from 'react'
import type { LogoProps } from './Logo.types'
import { brand } from '../../../config/brand/brandConfig'

function fillColor(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? '#60A5FA' : '#1E40AF'
}

function wordmarkFill(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? '#FFFFFF' : '#1E293B'
}

function LogoShapes({ fill }: { fill: string }): ReactNode {
  return (
    <>
      <rect x="0" y="0" width="30" height="10" rx="4" fill={fill} />
      <rect x="0" y="13" width="13" height="15" rx="3" fill={fill} opacity={0.28} />
      <rect x="17" y="13" width="13" height="15" rx="3" fill={fill} opacity={0.14} />
    </>
  )
}

function IconShapes({ fill }: { fill: string }): ReactNode {
  return (
    <>
      <rect x="2" y="2" width="28" height="10" rx="4" fill={fill} />
      <rect x="2" y="15" width="12" height="15" rx="3" fill={fill} opacity={0.28} />
      <rect x="18" y="15" width="12" height="15" rx="3" fill={fill} opacity={0.14} />
    </>
  )
}

export function Logo({ variant = 'full', theme = 'light', className }: LogoProps): ReactNode {
  const svgProps = {
    role: 'img' as const,
    'aria-label': brand.name,
    className,
    dir: 'ltr' as const,
    style: { direction: 'ltr' as const },
  }

  if (variant === 'icon') {
    const fill = fillColor(theme)
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
        <title>{brand.name}</title>
        <IconShapes fill={fill} />
      </svg>
    )
  }

  const iconFill = fillColor(theme)
  const wordFill = wordmarkFill(theme)
  return (
    <svg width="220" height="48" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <title>{brand.name}</title>
      <g transform="translate(4,8)">
        <LogoShapes fill={iconFill} />
      </g>
      <text x="46" y="30"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="22" fontWeight="600" letterSpacing="-0.5"
        textAnchor="start"
        fill={wordFill}
      >{brand.name}</text>
    </svg>
  )
}
