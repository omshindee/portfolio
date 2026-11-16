import { usePageMeta } from '../hooks/usePageMeta'
import { ButtonLink } from '../components/ui/ButtonLink'

export default function NotFound() {
  usePageMeta('Not found')
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <p className="font-mono text-[12px] text-fg-dim">
        <span className="text-warn">error</span>: 404 — path not found
      </p>
      <h1 className="text-xl font-semibold">This page doesn’t exist</h1>
      <p className="text-[14px] text-fg-muted">The link may be outdated, or the project may have moved.</p>
      <div className="flex gap-2">
        <ButtonLink to="/" variant="primary">Overview</ButtonLink>
        <ButtonLink to="/projects">Projects</ButtonLink>
      </div>
    </div>
  )
}
