import type { ReactNode } from 'react'

export interface ContentCardProps {
  linkTo: string
  title: string
  description: string
  learnMoreLabel: string
  featured?: boolean
  featuredLabel?: string
  date?: string
  metadata?: ReactNode
}
