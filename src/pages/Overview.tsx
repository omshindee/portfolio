import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Mail, MapPin } from 'lucide-react'
import { site } from '../config/site'
import { categories, projects, projectsInCategory } from '../data/projects'
import { skillSummary } from '../data/skills'
import { education, experience, interests } from '../data/education'
import { usePageMeta } from '../hooks/usePageMeta'
import { Panel } from '../components/ui/Panel'
import { Tag } from '../components/ui/Tag'
import { ButtonLink } from '../components/ui/ButtonLink'
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons'
import { ProjectCard } from '../components/projects/ProjectCard'

export default function Overview() {
  usePageMeta(null)
  const featured = projects.filter((p) => p.featured)
  const current = education[0]

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex min-w-0 flex-col gap-5">
        {/* profile header — compact, not a marketing hero */}
        <section className="rounded-xs border border-line bg-surface" aria-labelledby="profile-name">
          <div className="flex gap-4 p-4 sm:gap-6 sm:p-6">
            <img
              src={site.photo}
              alt={`Portrait of ${site.name}`}
              width={480}
              height={600}
              fetchPriority="high"
              decoding="async"
              className="hidden h-[200px] w-[160px] shrink-0 rounded-xs border border-line-strong object-cover sm:block lg:h-[225px] lg:w-[180px]"
            />
            <div className="min-w-0 flex-1 sm:self-center">
              <div className="flex items-center gap-3">
                <img
                  src={site.photoSmall}
                  alt=""
                  width={240}
                  height={300}
                  decoding="async"
                  className="h-[70px] w-14 shrink-0 rounded-xs border border-line-strong object-cover sm:hidden"
                />
                <h1 id="profile-name" className="text-[24px] font-semibold tracking-[0.06em] sm:text-[30px]">
                  {site.displayName}
                </h1>
              </div>
              <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-accent sm:mt-1 sm:text-[12.5px]">{site.headline}</p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg">{site.intro}</p>
              <p className="mt-2 hidden max-w-2xl text-[14px] leading-relaxed text-fg-muted sm:block">
                Computer Science undergraduate with strong foundations in Java, C++, data structures and algorithms and
                DBMS. I build REST APIs, database-driven applications and multi-service systems, most recently an endpoint
                monitoring and incident response platform.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11.5px] text-fg-dim">
                <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {site.location}</span>
                <span className="inline-flex items-center gap-1.5"><GraduationCap size={13} /> B.Tech CSE · {current.period}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-line px-4 py-3 sm:flex sm:flex-wrap sm:px-6">
            <ButtonLink to="/projects" variant="primary" className="col-span-2 min-h-11 sm:min-h-9">
              View projects <ArrowRight size={14} />
            </ButtonLink>
            {site.github && (
              <ButtonLink href={site.github} className="min-h-11 sm:min-h-9">
                <GithubIcon size={14} /> GitHub
              </ButtonLink>
            )}
            <ButtonLink href={site.linkedin} className="min-h-11 sm:min-h-9">
              <LinkedinIcon size={14} /> LinkedIn
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="ghost" className="min-h-11 sm:min-h-9">
              <Mail size={14} /> <span className="sm:hidden">Email</span>
              <span className="hidden sm:inline">{site.email}</span>
            </ButtonLink>
          </div>
        </section>

        <Panel
          title="Featured projects"
          aside={
            <Link to="/projects" className="font-mono text-[11px] text-accent hover:text-accent-strong">
              all projects →
            </Link>
          }
          bodyClassName="p-3 sm:p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} compact />
            ))}
          </div>
        </Panel>

        <Panel title="Project categories" bodyClassName="divide-y divide-line">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/projects?category=${c.id}`}
              className="flex min-h-12 items-center justify-between gap-4 px-4 py-3 hover:bg-surface-2 sm:px-5"
            >
              <div className="min-w-0">
                <div className="text-[14px] font-medium">{c.label}</div>
                <div className="text-[12.5px] text-fg-muted">{c.description}</div>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-fg-dim">{projectsInCategory(c.id).length} project{projectsInCategory(c.id).length === 1 ? '' : 's'}</span>
            </Link>
          ))}
        </Panel>
      </div>

      {/* sidebar */}
      <aside className="flex min-w-0 flex-col gap-5">
        <Panel title="Currently exploring" as="div">
          <ul className="flex flex-col gap-3">
            {interests.map((i) => (
              <li key={i.title} className="border-l-2 border-accent/40 pl-3">
                <div className="text-[13.5px] font-medium">{i.title}</div>
                <div className="text-[12.5px] leading-relaxed text-fg-muted">{i.detail}</div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Skill summary"
          as="div"
          aside={<Link to="/skills" className="font-mono text-[11px] text-accent hover:text-accent-strong">details →</Link>}
        >
          <div className="flex flex-col gap-3.5">
            {skillSummary.map((g) => (
              <div key={g.id}>
                <div className="label mb-1.5">{g.label}</div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Experience"
          as="div"
          aside={<Link to="/education" className="font-mono text-[11px] text-accent hover:text-accent-strong">details →</Link>}
        >
          <div className="flex flex-col gap-4">
            {experience.map((x) => (
              <div key={x.role + x.organization}>
                <div className="text-[13.5px] font-medium leading-snug">{x.role}</div>
                <div className="text-[12.5px] text-fg-muted">{x.organization}</div>
                <div className="mt-0.5 font-mono text-[11px] text-fg-dim">{x.period} · {x.type}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Education" as="div">
          <div className="flex flex-col gap-4">
            {education.map((e) => (
              <div key={e.institution}>
                <div className="text-[13.5px] font-medium leading-snug">{e.institution}</div>
                <div className="text-[12.5px] text-fg-muted">{e.qualification} · {e.field}</div>
                <div className="mt-0.5 font-mono text-[11px] text-fg-dim">{e.period} · {e.result}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Links" as="div" bodyClassName="flex flex-col p-2">
          {site.github && (
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-2.5 rounded-xs px-3 text-[13.5px] text-fg-muted hover:bg-surface-2 hover:text-fg">
              <GithubIcon size={15} /> GitHub
            </a>
          )}
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-2.5 rounded-xs px-3 text-[13.5px] text-fg-muted hover:bg-surface-2 hover:text-fg">
            <LinkedinIcon size={15} /> LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="flex min-h-10 items-center gap-2.5 rounded-xs px-3 text-[13.5px] text-fg-muted hover:bg-surface-2 hover:text-fg">
            <Mail size={15} /> Email
          </a>
        </Panel>
      </aside>
    </div>
  )
}
