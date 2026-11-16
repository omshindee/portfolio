import { Link } from 'react-router-dom'
import { Award, Briefcase, GraduationCap } from 'lucide-react'
import { certifications, education, experience } from '../data/education'
import { categoryLabel, projects, statusLabels } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/Layout'
import { Panel } from '../components/ui/Panel'
import { Tag } from '../components/ui/Tag'

export default function Education() {
  usePageMeta('Experience & Education', 'Education, certifications and project-based engineering experience of Om Shinde.')
  return (
    <>
      <PageHeader title="Experience / Education" description="Academic background and hands-on engineering work." />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Work experience" bodyClassName="p-0">
            <ol className="divide-y divide-line">
              {experience.map((x) => (
                <li key={x.role + x.organization} className="grid gap-3 px-4 py-4 sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:px-5">
                  <div className="hidden size-10 place-items-center rounded-xs border border-line-strong bg-surface-2 text-accent sm:grid">
                    <Briefcase size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-medium leading-snug">{x.role}</h3>
                    <p className="text-[13.5px] text-fg-muted">{x.organization}</p>
                    <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-fg-muted">{x.summary}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {x.focus.map((f) => <Tag key={f}>{f}</Tag>)}
                    </div>
                  </div>
                  <div className="order-first flex gap-3 font-mono text-[12px] sm:order-none sm:flex-col sm:items-end sm:gap-0.5">
                    <span className="text-fg-muted">{x.period}</span>
                    <span className="text-accent">{x.type}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Education" bodyClassName="p-0">
            <ol className="divide-y divide-line">
              {education.map((e) => (
                <li key={e.institution} className="grid gap-3 px-4 py-4 sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:px-5">
                  <div className="hidden size-10 place-items-center rounded-xs border border-line-strong bg-surface-2 text-accent sm:grid">
                    <GraduationCap size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-medium leading-snug">{e.institution}</h3>
                    <p className="text-[13.5px] text-fg-muted">{e.qualification} — {e.field}</p>
                    <p className="mt-0.5 text-[12.5px] text-fg-dim">{e.location}</p>
                  </div>
                  <div className="flex gap-3 font-mono text-[12px] sm:flex-col sm:items-end sm:gap-0.5">
                    <span className="text-fg-muted">{e.period}</span>
                    <span className="text-accent">{e.result}</span>
                    {e.current && <span className="text-fg-dim">in progress</span>}
                  </div>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Project experience" bodyClassName="p-0">
            <ol className="divide-y divide-line">
              {projects.map((p) => (
                <li key={p.slug} className="px-4 py-4 sm:px-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="text-[15px] font-medium">
                      <Link to={`/projects/${p.slug}`} className="hover:text-accent-strong">{p.title}</Link>
                      {p.subtitle && <span className="ml-2 font-mono text-[11.5px] font-normal text-fg-dim">{p.subtitle}</span>}
                    </h3>
                    <span className="font-mono text-[11.5px] text-fg-dim">
                      {statusLabels[p.status]}{p.year ? ` · ${p.year}` : ''}
                    </span>
                  </div>
                  <p className="mt-1 text-[13.5px] text-fg-muted">{p.tagline}</p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {p.implementation.slice(0, 3).map((i) => (
                      <li key={i.title} className="flex gap-2 text-[13px] text-fg-muted">
                        <span className="font-mono text-accent">›</span> {i.title}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-mono text-[11px] text-fg-dim">{p.categories.map(categoryLabel).join(' · ')}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <aside className="flex min-w-0 flex-col gap-5">
          <Panel title="Certifications" as="div">
            <ul className="flex flex-col gap-3">
              {certifications.map((c) => (
                <li key={c.title} className="flex items-start gap-3">
                  <Award size={16} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <div className="text-[13.5px] font-medium">{c.title}</div>
                    <div className="font-mono text-[11.5px] text-fg-dim">{c.year}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Coursework foundations" as="div">
            <p className="text-[13px] leading-relaxed text-fg-muted">
              Data structures & algorithms, object-oriented programming, DBMS, computer networks, operating systems and
              computer architecture.
            </p>
          </Panel>
        </aside>
      </div>
    </>
  )
}
