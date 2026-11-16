import type { ReactNode } from 'react'
import type { ProjectStatus } from '../../data/types'
import { statusLabels } from '../../data/projects'

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  const tones = {
    default: 'border-line-strong/70 bg-surface-2 text-fg-muted',
    accent: 'border-accent/30 bg-accent-soft text-accent-strong',
  }
  return (
    <span className={`inline-flex items-center rounded-xs border px-1.5 py-0.5 font-mono text-[11px] leading-4 ${tones[tone]}`}>
      {children}
    </span>
  )
}

const statusStyles: Record<ProjectStatus, string> = {
  active: 'text-accent-strong',
  completed: 'text-ok',
  prototype: 'text-warn',
  planned: 'text-fg-dim',
}

export function StatusBadge({ status, note }: { status: ProjectStatus; note?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
      <span className={`size-1.5 rounded-full bg-current ${statusStyles[status]}`} aria-hidden="true" />
      <span className={statusStyles[status]}>{statusLabels[status]}</span>
      {note && <span className="normal-case tracking-normal text-fg-dim">· {note}</span>}
    </span>
  )
}
