import { colors } from '../../config/colors/colorsConfig'

export function getContrastText(hex: string): string {
  const normalized = hex.replace('#', '')
  const red = Number.parseInt(normalized.slice(0, 2), 16)
  const green = Number.parseInt(normalized.slice(2, 4), 16)
  const blue = Number.parseInt(normalized.slice(4, 6), 16)
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000
  return brightness > colors.contrastText.threshold
    ? colors.contrastText.lightBackgroundText
    : colors.contrastText.darkBackgroundText
}
