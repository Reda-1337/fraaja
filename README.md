# RedaStream

FMovies-inspired movie & TV catalog with watch pages, powered by TMDB. Built with Next.js and Tailwind.

## Quick Start

1. Install dependencies
```bash
npm i
```

2. Create `.env.local` in the project root:
```bash
TMDB_READ_TOKEN=your_tmdb_v4_bearer_token
# Or use v3 key instead:
# TMDB_API_KEY=your_tmdb_v3_key
CACHE_TTL_SECONDS=300
# For production CSP allowlist of iframe hosts
ALLOWED_IFRAME_ORIGINS=https://vidnest.fun
```

3. Run dev
```bash
npm run dev
```

Open http://localhost:3000

## API Routes
- `/api/trending` — TMDB trending proxy
- `/api/discover` — TMDB discover proxy
- `/api/search` — TMDB search proxy
- `/api/details/:type/:id` — TMDB details (movie|tv) with append
- `/api/tv/:id/season/:season` — season details
- `/api/stream/movie/:id` and `/api/stream/tv/:id/:season/:episode` — streaming servers list

## Pages
- `/` — Trending grid
- `/movie/[id]` and `/tv/[id]` — Details pages with Watch button
- `/watch/movie/[id]` and `/watch/tv/[id]/[season]/[episode]` — Player pages

## Notes
- Keep TMDB attribution in the UI and comply with terms.
- Third-party embeds may have legal implications; review before production.
- CSP configured in `next.config.js` via `ALLOWED_IFRAME_ORIGINS`.
