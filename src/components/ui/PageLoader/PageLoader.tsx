import type { ReactNode } from 'react'

export function PageLoader(): ReactNode {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
        <rect x="1" y="1" width="30" height="30" rx="6" stroke="#1E293B" strokeWidth="1.5" fill="none" />
        <line x1="11" y1="5" x2="11" y2="27" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="13" x2="27" y2="13" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="animate-pulse text-sm text-text-muted">Loading...</p>
    </div>
  )
}
