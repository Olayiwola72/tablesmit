import type { ExportOptions, ExportStrategy } from '../export.types'
import { EXPORT_QUALITY_PRESETS, exportFileBaseName } from '../../../config/export/exportConfig'
import { downloadUrl, filenameWithExtension, fixTableBordersForExport } from '../utils'

export class ImageExporter implements ExportStrategy {
  private readonly mime: 'image/png' | 'image/jpeg'

  constructor(mime: 'image/png' | 'image/jpeg') {
    this.mime = mime
  }

  async export(element: HTMLElement, options: ExportOptions): Promise<void> {
    const { default: html2canvas } = await import('html2canvas')
    const scale = options.scale ?? EXPORT_QUALITY_PRESETS.high.scale
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale,
      useCORS: true,
      onclone: (clonedDoc: Document): void => {
        clonedDoc.querySelectorAll('[data-export-hide]').forEach(el => el.remove())
        fixTableBordersForExport(clonedDoc)
        const style = clonedDoc.createElement('style')
        style.textContent = '[class*="hover\\:"] { transition: none !important; }'
        clonedDoc.head.appendChild(style)
      },
    })
    const extension = this.mime === 'image/png' ? 'png' : 'jpeg'
    const quality = options.quality ?? EXPORT_QUALITY_PRESETS.high.jpegQuality
    downloadUrl(
      canvas.toDataURL(this.mime, quality),
      filenameWithExtension(options.filename, exportFileBaseName, extension),
    )
  }
}
