import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (el) el.setAttribute(attr, value)
}

/** Updates <title>, description, canonical and OG tags for the current route. */
export function usePageMeta(title: string | null, description?: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — Software Engineer`
    const desc = description ?? site.intro
    const url = `${site.url}${pathname === '/' ? '' : pathname}`
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('link[rel="canonical"]', 'href', url)
  }, [title, description, pathname])
}
