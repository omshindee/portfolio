import { Link } from 'react-router-dom'
import { site } from '../../config/site'

export function StatusBar() {
  return (
    <footer className="mt-12 border-t border-line bg-chrome">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-4 font-mono text-[11px] text-fg-dim sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" /> {site.name}
          </span>
          <span>React · TypeScript · Tailwind</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link to="/projects" className="hover:text-fg">projects</Link>
          <Link to="/contact" className="hover:text-fg">contact</Link>
          {site.github && (
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">github</a>
          )}
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">linkedin</a>
        </div>
      </div>
    </footer>
  )
}
