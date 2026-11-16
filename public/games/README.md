# Browser game builds

Unity Web builds live here, separate from the React source. Each game gets its own folder,
served from the same domain as the portfolio.

## Kitty Lander

```
public/games/kitty-lander/
  index.html              the game's own page (used inside an iframe, in ?embed=1 mode)
  Build/
    Web.loader.js
    Web.framework.js.br   Brotli-compressed
    Web.data.br
    Web.wasm.br
```

The build is about **14.4 MB** and uses **Brotli** compression. Cloudflare Pages serves the `.br`
files with `Content-Encoding: br` thanks to the generated block in `public/_headers`;
`npm run dev` / `npm run preview` do the same through the `unity-brotli` plugin in `vite.config.ts`.

### Updating the game

1. In Unity (kitty-lander project, `web-build` branch): **Kitty Lander > Build Web (Cloudflare Pages)**.
2. In this folder: `npm run sync:kitty-lander`
   (copies `Builds/Web` into `public/games/kitty-lander/` and refreshes the header rules in
   `public/_headers`; set `KITTY_LANDER_BUILD` if the Unity project is somewhere else).
3. `npm run build`, check with `npm run preview`, then deploy.

### How it is embedded

`src/data/projects.ts` sets `game.embedUrl` to `/games/kitty-lander/index.html?embed=1`, so
`GamePlayer` loads the game in a same-origin iframe after the visitor presses **Play in browser**.
The game page reports `progress` / `ready` / `error` with `postMessage`, which drives the player's
loading bar and error state. The iframe keeps the game's keyboard capture away from the rest of the
site and frees all of its memory when the visitor leaves the page.

## Adding another game

Create `public/games/<new-id>/…`, then add a project with a `game` block in `src/data/projects.ts`
(category `game-development`). Without `embedUrl`, `GamePlayer` loads the Unity loader directly
into the page; with it, the game's own page is used in an iframe as above. Remember to add
`Content-Encoding` rules to `public/_headers` if the build is compressed.

## Limits

Cloudflare Pages rejects single files larger than **25 MiB** (Kitty Lander's largest is ~8 MB).
