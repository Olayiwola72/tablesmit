export interface BreadcrumbSegment {
  label: string
  to?: string
}

export interface BreadcrumbProps {
  segments: BreadcrumbSegment[]
}
