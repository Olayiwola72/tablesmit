export const LATEX_ESCAPE_MAP: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
  '_': '\\_',
  '%': '\\%',
  '&': '\\&',
  '#': '\\#',
  '$': '\\$',
} as const

export const LATEX_UNESCAPE_MAP: Record<string, string> =
  Object.fromEntries(
    Object.entries(LATEX_ESCAPE_MAP).map(([char, escaped]) => [escaped, char]),
  )

export const LATEX_COLUMN_ALIGN = 'l'
