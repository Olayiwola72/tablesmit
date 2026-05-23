export function parseMarkdownTable(markdown: string): string[][] | null {
  const lines = markdown.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)

  let separatorIndex = -1
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    if (/^\|[\s\-:|]+\|$/.test(line)) {
      separatorIndex = i
      break
    }
  }

  if (separatorIndex === -1) return null
  if (separatorIndex < 1 || separatorIndex >= lines.length - 1) return null

  const rows: string[][] = []

  const header = parseMarkdownRow(lines[separatorIndex - 1]!)
  if (!header) return null
  rows.push(header)

  for (let i = separatorIndex + 1; i < lines.length; i++) {
    const row = parseMarkdownRow(lines[i]!)
    if (row) rows.push(row)
  }

  const maxCols = Math.max(...rows.map((r) => r.length))
  return rows.map((r) => {
    while (r.length < maxCols) r.push('')
    return r
  })
}

function parseMarkdownRow(line: string): string[] | null {
  if (!line.startsWith('|') || !line.endsWith('|')) return null
  const inner = line.slice(1, -1)
  return inner.split('|').map((cell) => cell.trim())
}
