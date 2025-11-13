# Lux on Astro

This folder now houses the complete Astro implementation of **Lux**. Everything is data-driven: images live in `public/images/lux/...`, metadata lives in Markdown under `src/content/lux`, and Cloudinary fetch URLs are generated at runtime.

## Project structure

```
astro/
├── public/
│   └── images/lux/{aurora,astro,urban,nature,...}
├── src/
│   ├── components/        → LuxCard component used on gallery view
│   ├── content/           → Markdown entries generated from `lux-manual-meta.json`
│   ├── layouts/           → Base layout/wrapper
│   ├── lib/cloudinary.ts  → builds fetch-mode URLs with fallbacks
│   └── pages/
│       ├── index.astro    → Splash page that links to /lux
│       └── lux/
│           ├── index.astro → Filterable masonry gallery
│           └── [slug].astro → Essay/detail page per photo
├── scripts/
│   ├── extract-lux.js           → pulls legacy HTML metadata
│   └── generate-lux-content.mjs → builds Markdown files from JSON
├── lux-raw.json          → auto-extracted figure metadata
└── lux-manual-meta.json  → curated locations, tags, folders, and essays
```

## Content pipeline

1. Update `astro/lux-manual-meta.json` with new assets (location, categories, tags, essay, and the new `/public` image path).
2. Drop the original file into the appropriate folder in `astro/public/images/lux/...`.
3. Run `node scripts/generate-lux-content.mjs` from the repo root. This regenerates the Markdown collection under `src/content/lux`.
4. Start the dev server (`cd astro && npm run dev`) and verify the new entry at `/lux` and `/lux/<slug>`.

## Cloudinary fetch mode

The gallery prefers to serve images via Cloudinary Fetch for responsive, cached delivery. Keep originals in `public` and let Cloudinary pull them on demand.

1. Create (or reuse) a Cloudinary account and enable **Fetch** under *Settings → Upload → Allowed fetch domains*. Add your eventual GitHub Pages hostname (e.g. `https://rx.github.io/viasacra`).
2. In the Astro directory, copy `.env.example` to `.env` and set:
   ```
   PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud
   PUBLIC_CLOUDINARY_FETCH_BASE_URL=https://rx.github.io/viasacra
   ```
   - Cloudinary cannot fetch assets from your `localhost`, so the helper now auto-falls back to the static `/public` files whenever you're in `astro dev` or the fetch base contains `localhost`. Leave the production URL in place and you'll still see images while developing.
3. Restart `npm run dev` so Astro sees the new env vars. The helper at `src/lib/cloudinary.ts` now outputs URLs like `https://res.cloudinary.com/<cloud>/image/fetch/f_auto,q_auto/...`.

## Commands

Run these from `astro/`:

| Command        | Purpose                                |
| -------------- | -------------------------------------- |
| `npm install`  | Install dependencies                   |
| `npm run dev`  | Start dev server on `localhost:4321`   |
| `npm run build`| Output static site to `dist/`          |
| `npm run preview` | Preview the production build        |

## Next steps / adoption hints

- When the Lux portion feels stable, move the rest of the site into Astro by adding additional collections (projects, meditations, etc.).
- Consider adding `astro:assets` or `@astrojs/image` if you want local responsive image generation before handing off to Cloudinary.
- Hook the `scripts/generate-lux-content.mjs` step into a GitHub Action so every merge regenerates Markdown before the Astro build runs.
