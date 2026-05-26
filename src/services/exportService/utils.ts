const UNSAFE_FILENAME_CHARS = new Set(['<', '>', ':', '"', '/', '\\', '|', '?', '*'])
const RESERVED_WINDOWS_FILENAMES = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i

export function sanitizeSpreadsheetValue(value: string): string {
  return /^[=+\-@\t]/.test(value) ? `'${value}` : value
}

export function sanitizeFilename(filename: string, fallback: string): string {
  const cleaned = Array.from(filename, (char) => {
    const code = char.charCodeAt(0)
    return code <= 31 || code === 127 || UNSAFE_FILENAME_CHARS.has(char) ? '-' : char
  })
    .join('')
    .replace(/\s+/g, ' ')
    .replace(/^[.-]+|[.-]+$/g, '')
    .trim()
    .slice(0, 120)

  if (!cleaned || RESERVED_WINDOWS_FILENAMES.test(cleaned)) return fallback
  return cleaned
}

export function filenameWithExtension(filename: string | undefined, fallback: string, extension: string): string {
  return `${sanitizeFilename(filename ?? fallback, fallback)}.${extension}`
}

export function fixTableBordersForExport(doc: Document): void {
  const table = doc.querySelector('table')
  if (!table) return

  table.style.borderCollapse = 'separate'
  table.style.borderSpacing = '0'

  const cells = table.querySelectorAll<HTMLElement>('td, th')
  if (cells.length === 0) return

  const firstCellBorder = cells[0].style.border
  const hasBorder = firstCellBorder && firstCellBorder !== 'none' && firstCellBorder !== ''

  if (hasBorder) {
    cells.forEach((cell) => {
      cell.style.border = 'none'
      cell.style.borderRight = firstCellBorder
      cell.style.borderBottom = firstCellBorder
    })

    const firstRowCells = table.querySelectorAll<HTMLElement>('tr:first-child td, tr:first-child th')
    firstRowCells.forEach((cell) => { cell.style.borderTop = firstCellBorder })

    table.querySelectorAll('tr').forEach((row) => {
      const firstCell = row.querySelector<HTMLElement>('td, th')
      if (firstCell) firstCell.style.borderLeft = firstCellBorder
    })
  }
}

export function downloadUrl(url: string, filename: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.rel = 'noopener'
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()

  if (url.startsWith('blob:')) {
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }
}
