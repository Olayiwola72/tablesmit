import type { ExportOptions, ExportStrategy } from '../export.types'
import { siteConfig } from '../../../config/siteConfig'
import { downloadUrl } from '../utils'

export class ImageExporter implements ExportStrategy {
  private readonly mime: 'image/png' | 'image/jpeg'

  constructor(mime: 'image/png' | 'image/jpeg') {
    this.mime = mime
  }

  async export(element: HTMLElement, options: ExportOptions): Promise<void> {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 3,
      useCORS: true,
      onclone: (clonedDoc: Document): void => {
        clonedDoc.querySelectorAll('[data-export-hide]').forEach(el => el.remove())
        const style = clonedDoc.createElement('style')
        style.textContent = '[class*="hover\\:"] { transition: none !important; }'
        clonedDoc.head.appendChild(style)
      },
    })
    const extension = this.mime === 'image/png' ? 'png' : 'jpeg'
    downloadUrl(
      canvas.toDataURL(this.mime, options.quality ?? 0.94),
      `${options.filename ?? siteConfig.exportFileBaseName}.${extension}`,
    )
  }
}
