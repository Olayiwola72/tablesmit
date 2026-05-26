export interface CopyDropdownProps {
  onCopyExcelData: () => void
  onCopyCsv: () => void
  onCopyMarkdown: () => void
  onCopyLatex: () => void
  onCopyImage: () => void
  onCopyHtml: () => void
  isCopyingImage?: boolean
}
