// Writes dist/sitemap.xml after `vite build`. Set SITE_URL to your deployed domain.
import { readFileSync, writeFileSync } from 'node:fs'

const site = (process.env.SITE_URL || 'https://omshinde.pages.dev').replace(/\/$/, '')
const projectsSrc = readFileSync(new URL('../src/data/projects.ts', import.meta.url), 'utf8')
const slugs = [...projectsSrc.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1])
const routes = ['/', '/about', '/projects', '/skills', '/education', '/contact', ...slugs.map((s) => `/projects/${s}`)]
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${site}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../dist/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml: ${routes.length} routes for ${site}`)
