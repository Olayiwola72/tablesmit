export type CaptionAlignment = 'left' | 'center' | 'right'

export interface CtxMenuState {
  x: number
  y: number
}

export interface TableCaptionProps {
  value: string
  onChange: (caption: string) => void
  alignment: CaptionAlignment
  onAlignmentChange: (align: CaptionAlignment) => void
  tableWidth?: number
  hasBorder?: boolean
  textColor?: string
  bgColor?: string
  onTextColorChange?: (color: string) => void
  onBgColorChange?: (color: string) => void
}
