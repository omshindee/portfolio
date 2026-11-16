import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Mail, Menu, X } from 'lucide-react'
import { navItems, site } from '../../config/site'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

function isActive(pathname: string, to: string) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to)
}

function SocialLinks({ className = '' }: { className?: string }) {
  const links = [
    site.github && { href: site.github, label: 'GitHub', icon: <GithubIcon size={16} /> },
    site.linkedin && { href: site.linkedin, label: 'LinkedIn', icon: <LinkedinIcon size={16} /> },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[]
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-xs px-2.5 text-[12px] text-fg-muted hover:bg-surface-2 hover:text-fg"
          aria-label={`${l.label} profile (opens in a new tab)`}
        >
          {l.icon}
          <span className="hidden xl:inline">{l.label}</span>
        </a>
      ))}
    </div>
  )
}

export function TopBar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const current = navItems.find((n) => isActive(pathname, n.to))
  const subPath = pathname.startsWith('/projects/') ? `~/projects/${pathname.split('/')[2]}` : current?.path ?? '~'

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-black/40 bg-chrome">
        <div className="mx-auto flex h-13 max-w-[1280px] items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} — overview`}>
            <span className="grid size-7 place-items-center rounded-xs border border-accent/40 bg-accent-soft font-mono text-[11px] font-semibold text-accent-strong">
              {site.initials}
            </span>
            <span className="text-[13px] font-semibold tracking-[0.18em] text-fg">{site.displayName}</span>
          </Link>

          <nav aria-label="Primary" className="ml-4 hidden h-full items-stretch lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                aria-label={item.label}
                className={({ isActive: a }) =>
                  `relative flex items-center whitespace-nowrap px-2.5 text-[12px] font-medium uppercase tracking-[0.1em] transition-colors xl:px-3 ${
                    a || isActive(pathname, item.to)
                      ? 'text-accent-strong after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:bg-accent xl:after:inset-x-3'
                      : 'text-fg-muted hover:text-fg'
                  }`
                }
              >
                {/* full labels on wide screens, short ones in between so the bar never wraps */}
                <span className="hidden xl:inline">{item.label}</span>
                <span className="xl:hidden">{item.short}</span>
              </NavLink>
            ))}
          </nav>

          <SocialLinks className="ml-auto hidden lg:flex" />

          <button
            type="button"
            className="ml-auto inline-flex size-10 items-center justify-center rounded-xs text-fg-muted hover:bg-surface-2 hover:text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* sub-bar: current location as a workspace path */}
      <div className="border-b border-line bg-surface/95 backdrop-blur-none">
        <div className="mx-auto flex h-8 max-w-[1280px] items-center justify-between gap-4 px-4 font-mono text-[11px] text-fg-dim sm:px-6">
          <span className="truncate">
            <span className="text-accent">om@workspace</span>
            <span className="text-fg-dim">:</span>
            <span className="text-fg-muted">{subPath}</span>
          </span>
          <span className="hidden shrink-0 sm:inline">B.Tech CSE · {site.location}</span>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-b border-line bg-chrome shadow-2xl shadow-black/50 lg:hidden">
          <nav aria-label="Primary" className="mx-auto flex max-w-[1280px] flex-col px-2 py-2">
            {navItems.map((item) => {
              const a = isActive(pathname, item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex min-h-12 items-center justify-between rounded-xs px-3 text-[15px] ${
                    a ? 'bg-surface-2 text-accent-strong' : 'text-fg hover:bg-surface'
                  }`}
                  aria-current={a ? 'page' : undefined}
                >
                  {item.label}
                  <span className="font-mono text-[11px] text-fg-dim">{item.path}</span>
                </Link>
              )
            })}
          </nav>
          <div className="mx-auto flex max-w-[1280px] items-center gap-2 border-t border-line px-4 py-3">
            {site.github && (
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xs border border-line-strong bg-surface text-sm text-fg">
                <GithubIcon /> GitHub
              </a>
            )}
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xs border border-line-strong bg-surface text-sm text-fg">
              <LinkedinIcon /> LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xs border border-line-strong bg-surface text-sm text-fg">
              <Mail size={16} /> Email
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
