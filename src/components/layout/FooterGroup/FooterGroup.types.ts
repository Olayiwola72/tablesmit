export interface FooterLinkItem {
  label: string
  href?: string
  external?: boolean
}

export interface FooterGroupProps {
  title: string
  links: FooterLinkItem[]
}
