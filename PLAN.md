## RedaStream — Implementation Plan

### 1) Goals
- Build an FMovies-inspired streaming catalog UI powered by TMDB, with server-side TMDB proxy, searchable listings, detail and watch pages, and basic caching/SEO.

### 2) Tech Stack
- Next.js 14 (App Router) + React
- Tailwind CSS
- API routes (Next.js) to proxy TMDB and aggregate streaming server embeds
- Deployed to Vercel (or Node server). Edge caching where possible

### 3) Environment & Secrets
- Required env:
  - `TMDB_API_KEY` or `TMDB_READ_TOKEN` (v4 bearer preferred)
  - `ALLOWED_IFRAME_ORIGINS` (CSV: e.g. https://vidnest.fun)
  - Optional: `CACHE_TTL_SECONDS` (default 300)

### 4) API Proxy Design (Server-side)
- GET `/api/trending?media_type=all|movie|tv&time_window=day|week&page=1`
- GET `/api/discover?type=movie|tv&sort_by=...&with_genres=...&with_original_language=...&year=...&page=1&region=...&language=...`
  - Maps to TMDB `/discover/{movie|tv}` (translate `year` to `primary_release_year` or `first_air_date_year`)
- GET `/api/top-imdb?type=movie|tv&page=1`
  - Maps to TMDB discover with `vote_average.desc` + `vote_count.gte` threshold
- GET `/api/search?q=...&page=1`
  - TMDB `/search/multi`, filters out `person`
- GET `/api/details/:type/:id`
  - Append: `videos,images,credits,recommendations,release_dates,content_ratings,external_ids`
- GET `/api/tv/:id/season/:season`
- GET `/api/filters`
  - TMDB genres list + curated countries, year ranges
- GET `/api/stream/:type/:id` and `/api/stream/:type/:id/:season/:episode`
  - Returns `{ servers: [{ name, embedUrl, priority }] }` sourced from configured providers (e.g., Vidnest)

Caching/Rate Limits:
- Add LRU in-memory cache + headers `Cache-Control: s-maxage=300, stale-while-revalidate=3600`
- Debounce + rate-limit search (IP based) server-side

### 5) Pages & Routes (SEO/SSR)
- `/` (SSR): Hero carousel (trending), sections: Latest Movies, Latest TV Episodes, Top IMDb, Trending Today/Week
- `/movies`, `/tv` (SSR): Discover listings with filters (genre, year, country/language, sort); pagination/infinite scroll
- `/top-imdb`, `/trending`, `/new`
- `/search?q=...`
- `/movie/[id]`, `/tv/[id]` (SSR): Canonical details pages
- `/watch/movie/[id]`, `/watch/tv/[id]/[season]/[episode]`: Player pages with server tabs

### 6) UI Components
- Layout: `Header`, `SearchAutocomplete`, `NavFilters`, `SidebarFilters`, `Footer`
- Content: `MediaGrid`, `MediaCard`, `Section`, `Pagination` or `InfiniteScroll`
- Detail: `MediaHero`, `MetaChips`, `CastList`, `Recommendations`, `SeasonsEpisodes`
- Player: `PlayerEmbed`, `ServerTabs`, `EpisodeSidebar`, `ReportButton`
- Shared: `Loader`, `EmptyState`, `ErrorBanner`

### 7) Player/Servers Behavior
- Show server tabs (Server 1/2/3). Attempt in priority order
- On `iframe` error or user report, auto-switch to next server
- Allowlist `frame-src` via CSP to configured origins

### 8) Filters & Sorting
- Genre (TMDB), Year (1950–present), Language (ISO-639-1), Sort by popularity/rating/recent
- Persist filter state in URL query params; restore on load

### 9) Accessibility & i18n
- Focus traps for modals, keyboard navigation for lists, ARIA labels
- Support `language` and `region` query to TMDB; basic locale strings scaffold

### 10) Legal/Compliance
- Keep TMDB attribution and disclaimer
- Review legality of third-party embeds; allow user-provided sources or link to official watch providers

### 11) Performance
- Edge cache GETs, image optimization, responsive images
- Cancel in-flight requests on route/filter changes

### 12) Milestones
- M1: Scaffold Next.js + Tailwind + env + CSP + base layout/header/footer
- M2: API proxy endpoints + caching + error handling
- M3: Home sections (trending, latest, top IMDb) + MediaGrid
- M4: Listing pages with filters + pagination/infinite scroll
- M5: Details pages with cast/recommendations + SEO meta/JSON-LD
- M6: Watch pages with server tabs + episode sidebar; fallback logic
- M7: Polish: accessibility, analytics, i18n, UX refinements

### 13) Migration from MVP
- Move all TMDB calls to `/api/*` routes
- Replace hardcoded key with env; add pagination; fix `tvData.genres` bug
- Modal can remain, but add canonical detail/watch routes for SEO

### Reference
- Inspired by: [FMovies](https://www.fmovies.gd/)

