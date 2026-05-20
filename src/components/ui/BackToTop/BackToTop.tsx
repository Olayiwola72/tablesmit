import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop({ threshold = 400 }: { threshold?: number }): ReactNode {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = (): void => setVisible(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-4 z-30 flex h-10 w-10 items-center justify-center
                 rounded-full border border-border bg-white shadow-sm transition-opacity
                 hover:bg-surface dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}
