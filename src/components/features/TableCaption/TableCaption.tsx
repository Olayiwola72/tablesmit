import { useState, type ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'

export function TableCaption({
  value,
  onChange,
}: {
  value: string
  onChange: (caption: string) => void
}): ReactNode {
  const [editing, setEditing] = useState(false)

  if (!editing && !value) {
    return (
      <button
        type="button"
        className="mb-2 w-full text-left text-sm italic text-text-muted hover:text-text-secondary"
        onClick={() => setEditing(true)}
      >
        {siteConfig.labels.tableCaptionPlaceholder}
      </button>
    )
  }

  if (editing) {
    return (
      <input
        type="text"
        value={value}
        autoFocus
        placeholder={siteConfig.labels.tableCaptionPlaceholder}
        className="mb-2 w-full border-0 bg-transparent p-0 text-sm font-medium text-text-primary outline-none focus:ring-0"
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => setEditing(false)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') setEditing(false)
        }}
      />
    )
  }

  return (
    <p
      className="mb-2 cursor-text text-sm font-medium text-text-primary"
      onClick={() => setEditing(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') setEditing(true)
      }}
    >
      {value}
    </p>
  )
}
