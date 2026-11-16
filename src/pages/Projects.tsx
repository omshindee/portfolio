import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, FolderOpen, Layers, Search } from 'lucide-react'
import type { CategoryId } from '../data/types'
import { categories, categoryLabel, projects, projectsInCategory } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/Layout'
import { ProjectCard } from '../components/projects/ProjectCard'

export default function Projects() {
  usePageMeta('Projects', 'Software engineering, cybersecurity and game development projects by Om Shinde.')
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const raw = params.get('category')
  const active = categories.some((c) => c.id === raw) ? (raw as CategoryId) : null

  const setCategory = (id: CategoryId | null) => {
    const next = new URLSearchParams(params)
    if (id) next.set('category', id)
    else next.delete('category')
    setParams(next, { replace: true })
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      if (active && !p.categories.includes(active)) return false
      if (!q) return true
      return [p.title, p.subtitle, p.tagline, ...p.tech].join(' ').toLowerCase().includes(q)
    })
  }, [active, query])

  const activeCategory = categories.find((c) => c.id === active)

  return (
    <>
      <PageHeader
        title="Projects"
        description="Engineering work grouped by area. Each project has a detail page covering the problem, architecture and implementation."
      />

      {/* mobile / tablet category chips */}
      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden" role="tablist" aria-label="Project categories">
        {[{ id: null, label: 'All' }, ...categories].map((c) => {
          const on = active === c.id
          return (
            <button
              key={c.label}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setCategory(c.id as CategoryId | null)}
              className={`min-h-10 shrink-0 rounded-xs border px-3.5 text-[13px] ${
                on ? 'border-accent/60 bg-accent-soft text-accent-strong' : 'border-line bg-surface text-fg-muted'
              }`}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* library sidebar */}
        <aside className="hidden lg:block" aria-label="Project library">
          <div className="sticky top-[100px] overflow-hidden rounded-xs border border-line bg-surface">
            <label className="flex items-center gap-2 border-b border-line px-3 py-2">
              <Search size={14} className="text-fg-dim" />
              <span className="sr-only">Search projects</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or tech"
                className="w-full bg-transparent text-[13px] text-fg placeholder:text-fg-dim focus:outline-none"
              />
            </label>
            <nav className="py-1.5 text-[13px]">
              <button
                type="button"
                onClick={() => setCategory(null)}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-left ${
                  !active ? 'bg-accent-soft text-accent-strong' : 'text-fg-muted hover:bg-surface-2 hover:text-fg'
                }`}
              >
                <span className="inline-flex items-center gap-2"><Layers size={14} /> All projects</span>
                <span className="font-mono text-[11px] text-fg-dim">{projects.length}</span>
              </button>
              {categories.map((c) => {
                const list = projectsInCategory(c.id)
                const on = active === c.id
                return (
                  <div key={c.id} className="mt-1">
                    <button
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`flex w-full items-center justify-between px-3 py-1.5 text-left font-mono text-[11px] uppercase tracking-[0.1em] ${
                        on ? 'bg-accent-soft text-accent-strong' : 'text-fg-dim hover:bg-surface-2 hover:text-fg'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2"><FolderOpen size={13} /> {c.label}</span>
                      <span>{list.length}</span>
                    </button>
                    <ul>
                      {list.map((p) => (
                        <li key={p.slug}>
                          <Link
                            to={`/projects/${p.slug}`}
                            className="group flex items-center justify-between py-1.5 pl-8 pr-3 text-fg-muted hover:bg-surface-2 hover:text-fg"
                          >
                            <span className="truncate">{p.title}</span>
                            <ChevronRight size={13} className="text-fg-dim opacity-0 group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </nav>
          </div>
        </aside>

        <section aria-live="polite" className="min-w-0">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2">
            <h2 className="text-[15px] font-semibold">
              {activeCategory ? activeCategory.label : 'All projects'}
              <span className="ml-2 font-mono text-[12px] font-normal text-fg-dim">({visible.length})</span>
            </h2>
            {activeCategory && <p className="text-[12.5px] text-fg-muted">{activeCategory.description}</p>}
          </div>

          {visible.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-xs border border-dashed border-line-strong px-4 py-10 text-center text-[13px] text-fg-muted">
              No projects match “{query}”{active ? ` in ${categoryLabel(active)}` : ''}.
            </div>
          )}
        </section>
      </div>
    </>
  )
}
