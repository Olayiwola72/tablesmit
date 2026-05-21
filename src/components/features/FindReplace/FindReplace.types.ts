export interface FindReplaceProps {
  query: string
  setQuery: (value: string) => void
  replaceText: string
  setReplaceText: (value: string) => void
  matchIndex: number
  totalMatches: number
  onNext: () => void
  onPrev: () => void
  onReplace: () => void
  onReplaceAll: () => void
  onClose: () => void
  replaceMode: boolean
}
