import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from './TopBar'
import { StatusBar } from './StatusBar'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center font-mono text-xs text-fg-dim" role="status">
      loading…
    </div>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-xs focus:bg-accent focus:px-3 focus:py-2 focus:text-chrome"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <TopBar />
      <main id="main" className="mx-auto w-full max-w-[1280px] flex-1 px-4 pt-5 sm:px-6 sm:pt-6">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <StatusBar />
    </div>
  )
}

/** Consistent page heading used by every route. */
export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-[22px] font-semibold sm:text-2xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-[14px] text-fg-muted">{description}</p>}
      </div>
      {children && <div className="flex shrink-0 flex-wrap gap-2">{children}</div>}
    </div>
  )
}
