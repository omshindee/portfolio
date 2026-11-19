import { site } from '../config/site'
import { interests, learning, principles } from '../data/education'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/Layout'
import { Panel } from '../components/ui/Panel'
import { ButtonLink } from '../components/ui/ButtonLink'

export default function About() {
  usePageMeta('About', `About ${site.name}: background, engineering philosophy and technical interests.`)
  return (
    <>
      <PageHeader title="About" description={site.headline}>
        <ButtonLink to="/projects" variant="secondary">Projects</ButtonLink>
        <ButtonLink to="/contact" variant="primary">Get in touch</ButtonLink>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Background">
            <div className="prose-body max-w-3xl text-[15px] leading-relaxed text-fg-muted">
              <p className="text-fg">{site.intro}</p>
              <p>
                I’m a Computer Science Engineering undergraduate at Bharati Vidyapeeth (Deemed to be University), after
                completing a Diploma in Information Technology. My foundations are in Java, C++, data structures and
                algorithms, DBMS and core systems subjects such as operating systems, computer networks and computer
                architecture.
              </p>
              <p>
                Most of my learning happens by building. I've developed full-stack applications
                using Spring Boot and React, built an ASP.NET Core MVC-based quiz and assessment
                platform with SQL Server, and worked on an endpoint monitoring and incident
                response platform combining a C++ Windows agent, Spring Boot server, Python ML
                service, SDN sensor and React dashboard.
              </p>
              <p>
                I’m most interested in the parts of software that are usually hidden — how processes and threads behave, how
                data moves across a network, and how separate services stay reliable when something fails.
              </p>
            </div>
          </Panel>

          <Panel title="Engineering philosophy" bodyClassName="grid gap-px bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="bg-surface p-4 sm:p-5">
                <div className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, '0')}</div>
                <div className="mt-1 text-[14px] font-medium">{p.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{p.detail}</p>
              </div>
            ))}
          </Panel>
        </div>

        <aside className="flex min-w-0 flex-col gap-5">
          <Panel title="Technical interests" as="div">
            <ul className="flex flex-col gap-3">
              {interests.map((i) => (
                <li key={i.title} className="border-l-2 border-accent/40 pl-3">
                  <div className="text-[13.5px] font-medium">{i.title}</div>
                  <div className="text-[12.5px] leading-relaxed text-fg-muted">{i.detail}</div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Currently learning" as="div">
            <ul className="flex flex-col gap-2">
              {learning.map((l) => (
                <li key={l} className="flex gap-2 text-[13px] text-fg-muted">
                  <span className="font-mono text-accent">›</span>
                  {l}
                </li>
              ))}
            </ul>
          </Panel>
        </aside>
      </div>
    </>
  )
}
