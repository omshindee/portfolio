import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import type { Project } from '../../data/types'
import { categoryLabel } from '../../data/projects'
import { ProjectThumbnail } from './ProjectThumbnail'
import { StatusBadge, Tag } from '../ui/Tag'

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const shownTech = project.tech.slice(0, compact ? 4 : 6)
  const more = project.tech.length - shownTech.length
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xs border border-line bg-surface transition-colors duration-150 hover:border-accent/50">
      <div className="relative border-b border-line">
        <ProjectThumbnail project={project} />
        {project.game && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-xs border border-line-strong bg-chrome/90 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
            <Play size={10} /> browser build
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold leading-tight">
              <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-accent-strong">
                {project.title}
              </Link>
            </h3>
            {project.subtitle && <p className="mt-0.5 truncate font-mono text-[11px] text-fg-dim">{project.subtitle}</p>}
          </div>
          <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-fg-dim transition-colors group-hover:text-accent" aria-hidden="true" />
        </div>
        <p className="text-[13.5px] leading-relaxed text-fg-muted">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {shownTech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {more > 0 && <Tag>+{more}</Tag>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2.5">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[11px] text-fg-dim">{project.categories.map(categoryLabel).join(' · ')}</span>
        </div>
      </div>
    </article>
  )
}
