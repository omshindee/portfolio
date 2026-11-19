import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, ImageIcon } from 'lucide-react'
import { categoryLabel, getProject, projects } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { Panel } from '../components/ui/Panel'
import { StatusBadge, Tag } from '../components/ui/Tag'
import { ButtonLink } from '../components/ui/ButtonLink'
import { GithubIcon } from '../components/ui/BrandIcons'
import { ProjectThumbnail } from '../components/projects/ProjectThumbnail'
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram'
import { GamePlayer } from '../components/game/GamePlayer'
import NotFound from './NotFound'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'screenshots', label: 'Screenshots' },
  { id: 'challenges', label: 'Challenges' },
]

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  usePageMeta(project ? project.title : 'Project not found', project?.tagline)

  if (!project) return <NotFound />

  const idx = projects.indexOf(project)
  const next = projects[(idx + 1) % projects.length]
  const toc = project.game ? [{ id: 'play', label: 'Play' }, ...sections] : sections

  return (
    <article>
      <Link to="/projects" className="mb-4 inline-flex items-center gap-1.5 font-mono text-[12px] text-fg-muted hover:text-accent">
        <ArrowLeft size={13} /> projects
      </Link>

      {/* header */}
      <header className="mb-5 grid gap-5 border-b border-line pb-5 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <Link key={c} to={`/projects?category=${c}`}>
                <Tag tone="accent">{categoryLabel(c)}</Tag>
              </Link>
            ))}
          </div>
          <h1 className="text-[28px] font-semibold tracking-tight sm:text-[32px]">{project.title}</h1>
          {project.subtitle && <p className="mt-0.5 font-mono text-[12.5px] text-fg-dim">{project.subtitle}</p>}
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-fg-muted">{project.tagline}</p>
          <div className="mt-3">
            <StatusBadge status={project.status} note={project.statusNote} />
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {project.repo ? (
              <ButtonLink href={project.repo} variant="primary"><GithubIcon size={14} /> Repository</ButtonLink>
            ) : (
              <span className="inline-flex min-h-9 items-center gap-2 rounded-xs border border-dashed border-line-strong px-3.5 text-[13px] text-fg-dim">
                <GithubIcon size={14} /> Repository link coming soon
              </span>
            )}
            {project.demo && (
              <ButtonLink href={project.demo}><ExternalLink size={14} /> Live demo</ButtonLink>
            )}
            {project.game && (
              <ButtonLink href="#play" variant={project.repo ? 'secondary' : 'primary'}>Play in browser</ButtonLink>
            )}
          </div>
        </div>
        <div className="overflow-hidden rounded-xs border border-line">
          <ProjectThumbnail project={project} />
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-w-0 flex-col gap-5">
          {project.game && (
            <section id="play" className="scroll-mt-28">
              <GamePlayer game={project.game} />
            </section>
          )}

          <Panel title="Overview" id="overview" className="scroll-mt-28">
            <div className="prose-body max-w-3xl text-[15px] leading-relaxed text-fg-muted">
              {project.overview.map((p) => <p key={p}>{p}</p>)}
            </div>
          </Panel>

          <Panel title="Problem statement" id="problem" className="scroll-mt-28">
            <p className="max-w-3xl text-[15px] leading-relaxed text-fg-muted">{project.problem}</p>
          </Panel>

          <Panel title="Technical architecture" id="architecture" className="scroll-mt-28">
            <p className="mb-4 max-w-3xl text-[14px] leading-relaxed text-fg-muted">{project.architecture.summary}</p>
            <ArchitectureDiagram layers={project.architecture.layers} />
          </Panel>

          <Panel title="Key implementation details" id="implementation" className="scroll-mt-28" bodyClassName="divide-y divide-line">
            {project.implementation.map((item) => (
              <div key={item.title} className="px-4 py-3.5 sm:px-5">
                <h3 className="text-[14px] font-medium">{item.title}</h3>
                <p className="mt-1 max-w-3xl text-[13.5px] leading-relaxed text-fg-muted">{item.detail}</p>
              </div>
            ))}
          </Panel>

          <Panel title="Screenshots" id="screenshots" className="scroll-mt-28">
            {project.screenshots.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {project.screenshots.map((s) => (
                  <figure key={s.src} className="flex flex-col overflow-hidden rounded-xs border border-line bg-base">
                    <img
                      src={s.src}
                      alt={s.caption}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto block h-auto max-h-[700px] w-full object-contain object-center"
                    />
                    <figcaption className="border-t border-line px-3 py-2 text-[12px] text-fg-muted">{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xs border border-dashed border-line-strong px-4 py-6 text-[13px] text-fg-dim">
                <ImageIcon size={18} className="shrink-0" /> Screenshots will be added here.
              </div>
            )}
          </Panel>

          <Panel title="Challenges & solutions" id="challenges" className="scroll-mt-28" bodyClassName="divide-y divide-line">
            {project.challenges.map((c) => (
              <div key={c.challenge} className="grid gap-2 px-4 py-3.5 sm:grid-cols-2 sm:gap-5 sm:px-5">
                <div>
                  <div className="label mb-1">Challenge</div>
                  <p className="text-[13.5px] leading-relaxed text-fg">{c.challenge}</p>
                </div>
                <div>
                  <div className="label mb-1 !text-accent">Solution</div>
                  <p className="text-[13.5px] leading-relaxed text-fg-muted">{c.solution}</p>
                </div>
              </div>
            ))}
          </Panel>
        </div>

        {/* info sidebar */}
        <aside className="flex min-w-0 flex-col gap-5 lg:sticky lg:top-[100px] lg:self-start">
          <Panel title="Project info" as="div" bodyClassName="p-0">
            <dl className="divide-y divide-line text-[13px]">
              <div className="flex justify-between gap-3 px-4 py-2.5">
                <dt className="text-fg-dim">Status</dt>
                <dd><StatusBadge status={project.status} /></dd>
              </div>
              {project.year && (
                <div className="flex justify-between gap-3 px-4 py-2.5">
                  <dt className="text-fg-dim">Year</dt>
                  <dd className="font-mono text-fg-muted">{project.year}</dd>
                </div>
              )}
              {project.highlights?.map((h) => (
                <div key={h.label} className="flex justify-between gap-3 px-4 py-2.5">
                  <dt className="text-fg-dim">{h.label}</dt>
                  <dd className="text-right font-mono text-fg-muted">{h.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel title="Technologies" as="div">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </Panel>

          <Panel title="On this page" as="div" bodyClassName="p-2" className="hidden lg:block">
            <nav className="flex flex-col">
              {toc.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="rounded-xs px-3 py-1.5 text-[13px] text-fg-muted hover:bg-surface-2 hover:text-fg">
                  {s.label}
                </a>
              ))}
            </nav>
          </Panel>

          {next && next.slug !== project.slug && (
            <Link to={`/projects/${next.slug}`} className="group rounded-xs border border-line bg-surface p-4 hover:border-accent/50">
              <div className="label">Next project</div>
              <div className="mt-1 text-[14px] font-medium group-hover:text-accent-strong">{next.title} →</div>
              <div className="mt-0.5 text-[12.5px] text-fg-muted">{next.tagline}</div>
            </Link>
          )}
        </aside>
      </div>
    </article>
  )
}
