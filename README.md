# MangaVault

A personal manga, manhwa & manhua tracker with a galaxy-inspired UI. Fully offline,
no login, no backend — every entry lives in your browser's `localStorage`.

## Features

- Add entries with title, origin country (Japanese / Korean / Chinese), reading
  status (lendo / completo / pausado / abandonado), score (0–10, decimals allowed,
  set via an animated slider), a personal review, chapters read, and a cover image
- Edit or delete any entry
- Dashboard with total manga logged, total chapters read, and average score
- Library gallery with search by title, filters by country and reading status, and
  sorting (highest/lowest score, A-Z, Z-A, most recent), responsive 2/3/4-column grid
- Home page highlights the top 5 highest-rated entries and a score distribution
  chart (Recharts)
- Dedicated detail page with status/country/score badges and the full review
- Cover images are stored as base64, directly in `localStorage`
- Animated page transitions and staggered card entrances (Framer Motion)
- All UI text is in Brazilian Portuguese (pt-BR)
- Entries saved before the status field existed default to "Completo"

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, stats, top-rated preview |
| `/biblioteca` | Library — full gallery |
| `/adicionar` | Add manga form |
| `/editar/:id` | Edit manga form |
| `/manga/:id` | Manga detail page |

A fixed navbar (Início / Biblioteca) is present on every route. Routing uses
`HashRouter` so deep links keep working on static hosts with no server-side
rewrite rules.

## Tech stack

- React + Vite
- React Router (`HashRouter`)
- Tailwind CSS v4 (custom galaxy theme: deep space blacks, cosmic purples, neon
  violet/cyan accents)
- Framer Motion for animations
- Recharts for the score distribution chart
- Lucide React for icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Data & privacy

All data — including cover images — stays in your browser's `localStorage`. Nothing
is sent anywhere. Clearing your browser storage for this site will erase your
collection.
