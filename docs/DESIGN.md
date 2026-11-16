# Design & Architecture Plan

## 1. Design direction — "engineering workspace"

The site borrows the *interface language* of a classic desktop client (dark blue‑grey chrome, compact
uppercase tab navigation, flat panels with header strips, a library-style sidebar) and pairs it with
GitHub's project-centric presentation and Linear's spacing and type. It is a developer profile, not a store.

| Element | Treatment |
|---|---|
| Palette | Blue‑grey base `#171d26`, darker chrome `#10151c`, panels `#1e2632`, muted blue accent `#66a6d9`. No gradients, no glass. |
| Type | Inter for UI, JetBrains Mono for metadata (paths, status, tech tags). Small, dense, readable. |
| Chrome | Title bar with uppercase tabs + a sub‑bar showing the current route as a path (`~/projects/aegis`). |
| Panels | Square-ish (2px radius), 1px borders, an uppercase header strip. Information dense. |
| Motion | Only colour/border transitions (150ms). Respects `prefers-reduced-motion`. |
| Footer | IDE-style status bar. |

Identity cues that keep it from being a clone: path-style breadcrumbs, monospace metadata, schematic SVG
thumbnails (architecture diagrams, not cover art), status dots, and terminal-flavoured labels.

## 2. Information architecture

| Route | Purpose |
|---|---|
| `/` Overview | Profile header, featured projects (above the fold on desktop), interests, skill summary, education, links |
| `/about` | Bio, engineering philosophy, technical & learning interests |
| `/projects` | Project explorer: library sidebar (search + category tree) and a card grid; `?category=` filter |
| `/projects/:slug` | Reusable detail page: overview, problem, architecture, tech, implementation, screenshots, challenges, links, optional in-browser game |
| `/skills` | Categorised skills, no ratings |
| `/education` | Education, certification, project-based experience |
| `/contact` | Email, LinkedIn, GitHub, location |

Categories: **Software Engineering** (AEGIS, Techy), **Cybersecurity** (AEGIS), **Game Development** (Kitty Lander).
A project may belong to several categories.

## 3. Architecture

```
src/
  config/site.ts            single source for name, headline, links, site URL
  data/                     centralised content (typed)
    types.ts  projects.ts  skills.ts  education.ts
  components/
    layout/                 TopBar, SubBar, StatusBar, Layout, ScrollToTop
    ui/                     Panel, Tag, StatusBadge, BrandIcons, ButtonLink
    projects/               ProjectCard, ProjectThumbnail, ArchitectureDiagram
    game/GamePlayer.tsx     Unity WebGL loader (click-to-play)
  hooks/usePageMeta.ts      per-route <title> / description
  pages/                    one file per route (lazy-loaded except Overview)
public/
  games/<slug>/Build/...    Unity builds live here, outside src/
  _headers  robots.txt  sitemap.xml  favicon.svg
```

- **Data-driven**: every page reads from `src/data`. Adding a project = adding one object.
- **Games**: a project gets a `game` block (build folder + file names + `available` flag). `GamePlayer`
  does nothing until the visitor presses Play, then verifies the loader exists, injects Unity's
  `*.loader.js`, calls `createUnityInstance`, shows progress, supports fullscreen, reports errors and
  calls `Quit()` on unmount. Multiple games work because nothing is hard-coded to one build.
- **Performance**: route-level code splitting, no images required (SVG thumbnails), fonts with
  `display=swap`, Unity never downloaded unless requested.

## 4. Responsive behaviour

- **Desktop (≥1024px)**: tab bar, two-column overview (main + sidebar), projects explorer with a fixed
  sidebar and 2–3 column grid, detail pages with an info sidebar.
- **Tablet (640–1023px)**: sidebars drop below main content, 2-column grids.
- **Mobile (<640px)**: title bar collapses to a menu sheet with 44px targets, project categories become
  a scrollable chip row, single-column cards, full-width actions. No horizontal page scroll.

## 5. Deployment (Cloudflare Pages)

Build command `npm run build`, output `dist`. Pages serves SPA fallback automatically (no `404.html`).
`public/_headers` sets long-lived caching for hashed assets and Unity files. See README.
