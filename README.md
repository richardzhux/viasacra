# Viasacra

This repo now ships two copies of the site side‑by‑side:

- `legacy/` — the original hand-edited HTML. These files stay untouched so you can compare or roll back whenever you like.
- `astro/` — the new Astro build that recreates **every** page (Home, About, Projects, Random notebooks, Travel, Lux, etc.) with a proper layout system, content collections, and automated asset handling.

The Astro build is what you’ll extend going forward. GitHub Pages can serve the `astro/dist/` output while the legacy HTML remains in the repo for reference.

---

## 1. Requirements

- Node 18+ (Astro 5.x needs modern Node).  
- npm (ships with Node).  
- macOS/Linux/WSL terminal.

---

## 2. Quick start

```bash
cd astro
npm install          # once
ASTRO_TELEMETRY_DISABLED=1 npm run dev
# visit http://localhost:4321
```

Stop the dev server with `Ctrl+C`. When you are ready to publish, run:

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
# output lands in astro/dist/
```

Copy `astro/dist/` to your GitHub Pages branch (or let a GitHub Action run `npm run build` and deploy the `dist` folder). `astro/public/CNAME` is included so the custom domain keeps working.

---

## 3. Project layout

```
astro/
├── public/
│   ├── shared/                 # CSS + JS mirrored from the legacy site
│   ├── images/lux/...          # all Lux assets grouped by theme
│   └── projects/...            # iframe companions (Reizentraj HTML, etc.)
├── src/
│   ├── components/             # Lux cards
│   ├── content/
│   │   ├── lux/                # auto-generated Markdown for each photo
│   │   └── notebooks/          # Random page notebooks/outlines
│   ├── layouts/                # SiteLayout (classic) + BaseLayout (Lux)
│   ├── lib/                    # buildCloudinarySrc helper (falls back to local paths)
│   └── pages/                  # About, Projects, Lux, Travel, Random, etc.
├── scripts/
│   ├── extract-lux.js          # parses legacy lux/index.html into JSON
│   └── generate-lux-content.mjs# produces Markdown from JSON + manual meta
├── lux-manual-meta.json        # hand-written metadata/essays per Lux entry
└── package.json
```

The `legacy/` subfolders (`legacy/home`, `legacy/shared`, etc.) are the historical HTML copies. Leave them as-is unless you want to edit the legacy version too. If you change CSS/JS, keep `legacy/shared/` and `astro/public/shared/` in sync.

---

## 4. Editing day-to-day

### 4.1 Pages (Home/About/Projects/Travel/etc.)

- Use `astro/src/layouts/SiteLayout.astro` for any “classic” page. It already injects Google Analytics, the shared CSS/JS, navigation, and footer.
- Example: `astro/src/pages/about/index.astro` contains just the body content; the layout wraps it automatically.
- To add a new section, create a sibling `.astro` file and export markup inside `<SiteLayout ...> ... </SiteLayout>`.

### 4.2 Lux gallery

`astro/lux-manual-meta.json` is now the **single source of truth** for every photo. Each object needs:

| Field | Purpose |
| ----- | ------- |
| `src` | Legacy reference (keep the original `images/...` path for tracking) |
| `title`, `caption`, `alt` | Text shown on cards/detail pages |
| `date` | ISO string (`YYYY-MM-DD`) used for sorting/timeline anchors |
| `displayDate` | The human label shown to readers (can be “Spring 2024”, etc.); defaults to whatever you set |
| `location` | Printed beneath the title |
| `categories`, `tags` | Used for filters and future taxonomy |
| `localImage` | Path under `astro/public/images/lux/...` pointing at the high-res asset |
| `essay` | Markdown body for the detail page |

Workflow:

1. **Add the file** under `astro/public/images/lux/<group>/`.
2. **Append/edit the JSON entry** with the fields above (set `displayDate` equal to `date` if you don’t need a custom label).
3. **Regenerate Markdown** so the content collection stays in sync:
   ```bash
   node scripts/generate-lux-content.mjs
   ```
4. **Run/Build** via `npm run dev` or `npm run build` to see the updates.

> **Cloud note:** `buildCloudinarySrc()` still falls back to the local asset path unless you provide Cloudinary env vars, so nothing breaks on GitHub Pages.

### 4.3 Random notebooks / outlines

1. Drop or edit Markdown entries in `astro/src/content/notebooks/`.  
   Each file has front matter:
   ```yaml
   ---
   title: "面相入门观察 — 结构与气色笔记"
   label: "Notebook"
   subhead: "Field notes..."
   priority: 2          # higher number = higher on the Random landing page
   cta: "Read the notes →"
   ---
   ```
2. The remainder of the file is standard Markdown. Any embedded images should live under `astro/public/...` and use absolute paths (`/images/...`). They will flow through the same helper used by Lux.
3. Reload `/random/` to see the updated card and visit `/random/<slug>/` for the rendered essay.

### 4.4 Shared assets

- CSS + JS live in `astro/public/shared/`. Update these files if you tweak styles or scripts.  
- The legacy site still references `../shared/...`, so mirror changes in the top-level `shared/` directory as well if you want parity.

---

## 5. Deployment checklist

1. `cd astro`
2. `ASTRO_TELEMETRY_DISABLED=1 npm run build`
3. Deploy the contents of `astro/dist/` (keep `CNAME` intact).
4. Leave the legacy HTML folders untouched so you can test old vs. new at any time.

---

## 6. Troubleshooting

- **Leaflet maps not loading locally**  
  Ensure you run `npm run dev` and visit `http://localhost:4321`. The home page automatically loads Leaflet from the CDN; no extra work needed.

- **Images missing in dev**  
  Because we default to local assets, make sure the file exists under `astro/public/...` and the Markdown/front matter path starts with `/images/...`.

- **Content changes not showing**  
  If you edit anything in `astro/lux-manual-meta.json`, rerun `node scripts/generate-lux-content.mjs`. For Random notebooks, no rebuild is needed—Astro watches the files automatically.

---

Enjoy the new workflow! Every page now shares a single layout, the Lux gallery is data-driven, the Random notebooks read directly from Markdown, and you can still compare everything to the original HTML snapshots whenever you like. Once you’re ready, you can continue porting other experiments into Astro collections using the same patterns.
