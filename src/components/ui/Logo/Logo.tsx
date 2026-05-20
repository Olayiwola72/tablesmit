import { siteConfig } from '../../../config/siteConfig'
import type { ReactNode } from 'react'

interface LogoProps {
  variant?: 'full' | 'icon'
  theme?: 'light' | 'dark'
  className?: string
}

/* ── Logo 1 — outlined grid ───────────────────────────── */

function logo1Color(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? '#FFFFFF' : '#1E293B'
}

function Logo1Outline({ fill }: { fill: string }): ReactNode {
  return (
    <rect x="1" y="1" width="30" height="30" rx="6" stroke={fill} strokeWidth="1.5" fill="none" />
  )
}

function Logo1Gridlines({ fill }: { fill: string }): ReactNode {
  return (
    <>
      <line x1="11" y1="5" x2="11" y2="27" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="13" x2="27" y2="13" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
    </>
  )
}

/* ── Logo 2 — T-form (header + column cells) ──────────── */

function logo2Fill(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? '#60A5FA' : '#1E40AF'
}

function logo2WordmarkFill(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? '#FFFFFF' : '#1E293B'
}

/** Shared T-form shapes used in both full and icon variants. */
function Logo2Shapes({ fill }: { fill: string }): ReactNode {
  return (
    <>
      {/* Header row — full opacity */}
      <rect x="0" y="0" width="30" height="10" rx="4" fill={fill} />
      {/* Left column — 28% opacity */}
      <rect x="0" y="13" width="13" height="15" rx="3" fill={fill} opacity={0.28} />
      {/* Right column — 14% opacity (2:1 ratio with left) */}
      <rect x="17" y="13" width="13" height="15" rx="3" fill={fill} opacity={0.14} />
    </>
  )
}

/** Same shapes but positioned inside the 32×32 viewBox for the icon mark. */
function Logo2IconShapes({ fill }: { fill: string }): ReactNode {
  return (
    <>
      <rect x="2" y="2" width="28" height="10" rx="4" fill={fill} />
      <rect x="2" y="15" width="12" height="15" rx="3" fill={fill} opacity={0.28} />
      <rect x="18" y="15" width="12" height="15" rx="3" fill={fill} opacity={0.14} />
    </>
  )
}

/* ── Component ────────────────────────────────────────── */

export function Logo({ variant = 'full', theme = 'light', className }: LogoProps): ReactNode {
  const activeLogo = siteConfig.activeLogo ?? 'logo1'

  const svgProps = {
    role: 'img' as const,
    'aria-label': siteConfig.brand.name,
    className,
    dir: 'ltr' as const,
    style: { direction: 'ltr' as const },
  }

  /* ── Icon mark (32×32) ── */
  if (variant === 'icon') {
    if (activeLogo === 'logo1') {
      const fill = logo1Color(theme)
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
          <title>{siteConfig.brand.name}</title>
          <Logo1Outline fill={fill} />
          <Logo1Gridlines fill={fill} />
        </svg>
      )
    }
    const fill = logo2Fill(theme)
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
        <title>{siteConfig.brand.name}</title>
        <Logo2IconShapes fill={fill} />
      </svg>
    )
  }

  /* ── Full logo (icon + wordmark, 220×48) ── */
  if (activeLogo === 'logo1') {
    const fill = logo1Color(theme)
    return (
      <svg width="220" height="48" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
        <title>{siteConfig.brand.name}</title>
        <g transform="translate(4,8)">
          <Logo1Outline fill={fill} />
          <Logo1Gridlines fill={fill} />
        </g>
        <text x="52" y="30"
          fontFamily="Inter, -apple-system, sans-serif"
          fontSize="22" fontWeight="600" letterSpacing="-0.5"
          textAnchor="start"
          fill={fill}
        >Tablesmit</text>
      </svg>
    )
  }

  const iconFill = logo2Fill(theme)
  const wordFill = logo2WordmarkFill(theme)
  return (
    <svg width="220" height="48" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <title>{siteConfig.brand.name}</title>
      <g transform="translate(4,8)">
        <Logo2Shapes fill={iconFill} />
      </g>
      <text x="46" y="30"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="22" fontWeight="600" letterSpacing="-0.5"
        textAnchor="start"
        fill={wordFill}
      >Tablesmit</text>
    </svg>
  )
}
