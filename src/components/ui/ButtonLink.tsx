import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex min-h-9 items-center justify-center gap-2 rounded-xs border px-3.5 text-[13px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50'

export const buttonVariants: Record<Variant, string> = {
  primary: `${base} border-accent/60 bg-accent/90 text-chrome hover:bg-accent-strong`,
  secondary: `${base} border-line-strong bg-surface-2 text-fg hover:border-accent/50 hover:bg-surface-3`,
  ghost: `${base} border-transparent text-fg-muted hover:bg-surface-2 hover:text-fg`,
}

interface Props {
  to?: string
  href?: string
  variant?: Variant
  children: ReactNode
  className?: string
  ariaLabel?: string
}

/** Internal links use the router; external links open in a new tab. */
export function ButtonLink({ to, href, variant = 'secondary', children, className = '', ariaLabel }: Props) {
  const cls = `${buttonVariants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }
  const external = href?.startsWith('http')
  return (
    <a
      href={href}
      className={cls}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
