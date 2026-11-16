import type { ReactNode } from 'react'

interface PanelProps {
  title?: ReactNode
  /** Right-aligned content in the header strip (count, link…) */
  aside?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  as?: 'section' | 'div' | 'aside'
  id?: string
}

/** Flat content panel with an optional uppercase header strip. */
export function Panel({ title, aside, children, className = '', bodyClassName = 'p-4 sm:p-5', as = 'section', id }: PanelProps) {
  const Tag = as
  return (
    <Tag id={id} className={`rounded-xs border border-line bg-surface ${className}`}>
      {title && (
        <header className="flex min-h-10 items-center justify-between gap-3 border-b border-line bg-surface-2/60 px-4 sm:px-5">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-muted">{title}</h2>
          {aside && <div className="flex shrink-0 items-center text-xs text-fg-dim">{aside}</div>}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </Tag>
  )
}
