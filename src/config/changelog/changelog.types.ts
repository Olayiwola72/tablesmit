export interface ChangelogEntry {
  version: string
  date: string
  changes: {
    type: 'added' | 'fixed' | 'improved' | 'removed'
    description: string
  }[]
}
