import { Link } from 'react-router-dom'
import { skillGroups } from '../data/skills'
import { projects } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/Layout'
import { Panel } from '../components/ui/Panel'

/** Projects whose tech list mentions a skill (loose match), to show where it was used. */
function usedIn(skill: string) {
  const s = skill.toLowerCase()
  return projects.filter((p) => p.tech.some((t) => t.toLowerCase() === s || t.toLowerCase().startsWith(`${s} `)))
}

export default function Skills() {
  usePageMeta('Technical Skills', 'Languages, backend, frontend, systems, databases and tools used by Om Shinde.')
  return (
    <>
      <PageHeader
        title="Technical Skills"
        description="Grouped by area. Where a skill is used in a project on this site, the project is linked."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((g) => (
          <Panel key={g.id} title={g.label} aside={<span className="font-mono">{g.items.length}</span>} bodyClassName="p-0">
            <ul className="divide-y divide-line">
              {g.items.map((item) => {
                const used = usedIn(item)
                return (
                  <li key={item} className="flex min-h-10 flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-2">
                    <span className="text-[13.5px] text-fg">{item}</span>
                    {used.length > 0 && (
                      <span className="flex flex-wrap gap-x-2 font-mono text-[11px]">
                        {used.map((p) => (
                          <Link key={p.slug} to={`/projects/${p.slug}`} className="text-fg-dim hover:text-accent">
                            {p.title.toLowerCase()}
                          </Link>
                        ))}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </Panel>
        ))}
      </div>
    </>
  )
}
