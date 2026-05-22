import { useEffect } from 'react'
import type { RefObject } from 'react'

function sanitizePrintableClone(element: HTMLElement): void {
  element.querySelectorAll('script, iframe, object, embed').forEach((node) => node.remove())
  element.querySelectorAll('*').forEach((node) => {
    for (const attribute of Array.from(node.attributes)) {
      if (attribute.name.toLowerCase().startsWith('on')) {
        node.removeAttribute(attribute.name)
      }
    }
  })
}

export function usePrintTable(tableRef: RefObject<HTMLDivElement>): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      const isCtrl = e.ctrlKey || e.metaKey
      if (!isCtrl || e.key !== 'p') return

      const target = e.target as HTMLElement
      if (target.closest('[contenteditable]')) return

      e.preventDefault()

      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.right = '-9999px'
      iframe.style.bottom = '-9999px'
      iframe.style.width = '0'
      iframe.style.height = '0'
      document.body.appendChild(iframe)

      const win = iframe.contentWindow
      if (!win) { document.body.removeChild(iframe); return }

      const caption = document.querySelector<HTMLElement>('[data-table-caption]')
      const container = tableRef.current
      let bodyHTML = ''
      if (caption) {
        const clone = caption.cloneNode(true) as HTMLElement
        clone.querySelectorAll('[data-print-hide]').forEach(el => el.remove())
        sanitizePrintableClone(clone)
        bodyHTML += clone.outerHTML
      }
      if (container) {
        const clone = container.cloneNode(true) as HTMLElement
        clone.querySelectorAll('[data-print-hide]').forEach(el => el.remove())
        sanitizePrintableClone(clone)
        bodyHTML += clone.outerHTML
      }

      const cssRules: string[] = []
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule instanceof CSSMediaRule && /print/i.test(rule.media.mediaText)) continue
            cssRules.push(rule.cssText)
          }
        } catch { /* cross-origin sheet — skip */ }
      }

      const printCSS = `@media print {
  body { margin:2cm; }
  @page { margin:2cm; size:A4 landscape; }
  td, th { print-color-adjust:exact; -webkit-print-color-adjust:exact; }
  [data-print-hide] { display:none !important; }
}`

      const doc = win.document
      doc.open()
      doc.write(`<!DOCTYPE html>
<html>
<head>
  <style>${cssRules.join('\n')}</style>
  <style>${printCSS}</style>
</head>
<body>${bodyHTML}</body>
</html>`)
      doc.close()

      win.addEventListener('load', () => {
        setTimeout(() => { win.print(); document.body.removeChild(iframe) }, 300)
      })
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [tableRef])
}
