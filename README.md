# Om Shinde — Portfolio

Personal engineering portfolio. React + TypeScript + Vite + Tailwind CSS + React Router + Lucide.
Design and architecture notes: [docs/DESIGN.md](docs/DESIGN.md).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build to dist/, write dist/sitemap.xml
npm run preview    # serve the production build
```

## Editing content

| What | File |
|---|---|
| Name, headline, email, GitHub / LinkedIn, site URL | `src/config/site.ts` |
| Projects (explorer, detail pages, overview, experience) | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Education, certifications, interests, principles | `src/data/education.ts` |
| Project screenshots / thumbnails | put images in `public/projects/<slug>/` and reference them in `projects.ts` |
| Browser games | `public/games/` — see [public/games/README.md](public/games/README.md). Update Kitty Lander with `npm run sync:kitty-lander` |

When you change the deployed domain, update `site.url` in `src/config/site.ts`, the URLs in `index.html`
and `public/robots.txt`, and set `SITE_URL` for the sitemap.

## Deploy to Cloudflare Pages (free)

1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, pick the repository.
3. Build settings: framework preset **Vite** (or none), build command `npm run build`,
   output directory `dist`. Optionally add the environment variable `SITE_URL=https://<your-domain>`
   and `NODE_VERSION=22`.
4. Save and deploy. Every push to the main branch redeploys; pull requests get preview URLs.

The Kitty Lander build in `public/games/kitty-lander/` (~14.4 MB, Brotli) is committed and deployed with the site;
`public/_headers` tells Cloudflare to serve its `.br` files with `Content-Encoding: br`.

Client-side routes (`/projects/aegis`, …) work because Pages serves `index.html` for unknown paths when
the project has no `404.html`. `public/_headers` adds security headers and long-term caching for hashed assets.
