import Header from '@/components/Header'
import EnhancedFooter from '@/components/EnhancedFooter'
import MediaGrid from '@/components/MediaGrid'
import { getBaseUrl } from '@/lib/baseUrl'
import Link from 'next/link'

type SearchResponse = {
  results: any[]
  total_results?: number
  total_pages?: number
}

const filters = [
  { label: 'All Results', value: 'all' },
  { label: 'Movies', value: 'movie' },
  { label: 'TV Series', value: 'tv' }
]

async function fetchResults(query: string, type: 'all' | 'movie' | 'tv', page: string) {
  if (!query || query.trim().length < 2) {
    return { results: [] } as SearchResponse
  }

  const params = new URLSearchParams({ q: query, page })
  if (type !== 'all') params.set('type', type)

  const res = await fetch(`${getBaseUrl()}/api/search?${params.toString()}`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 120) }
  })

  if (!res.ok) {
    return { results: [] } as SearchResponse
  }

  return res.json() as Promise<SearchResponse>
}

type Props = {
  searchParams: { q?: string; type?: string; page?: string }
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q?.toString() ?? ''
  const typeParam = (searchParams.type?.toString() ?? 'all') as 'all' | 'movie' | 'tv'
  const page = searchParams.page?.toString() ?? '1'

  const data = await fetchResults(query, typeParam, page)
  const results = Array.isArray(data.results) ? data.results : []
  const totalResults = data.total_results ?? results.length

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-col gap-6 rounded-[32px] border border-slate-800/40 bg-slate-950/70 p-8 shadow-[0_30px_80px_rgba(8,47,73,0.45)] backdrop-blur-2xl">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.5em] text-cyan-300">Discover</p>
            <h1 className="text-4xl font-bold text-white md:text-5xl">Search the streaming universe</h1>
            <p className="text-sm text-slate-400 md:text-base">
              Find movies, shows, and curated collections powered by the TMDB catalog.
            </p>
          </div>

          <form className="flex flex-col gap-4 md:flex-row" action="/search" method="get">
            <div className="relative flex-1">
              <input
                autoFocus
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search for titles, people, or keywords"
                className="w-full rounded-2xl border border-slate-700/60 bg-slate-900/70 px-5 py-3 text-base text-slate-100 shadow-[0_18px_45px_rgba(8,47,73,0.45)] transition focus:border-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              {typeParam !== 'all' && <input type="hidden" name="type" value={typeParam} />}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_15px_40px_rgba(6,182,212,0.45)] transition hover:-translate-y-0.5 hover:bg-cyan-400"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => {
              const isActive = typeParam === filter.value
              const params = new URLSearchParams()
              if (query) params.set('q', query)
              if (filter.value !== 'all') params.set('type', filter.value)
              if (page !== '1') params.set('page', page)

              return (
                <Link
                  key={filter.value}
                  href={`/search?${params.toString()}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                    isActive
                      ? 'border-cyan-400/70 bg-cyan-500/10 text-cyan-100 shadow-[0_12px_28px_rgba(6,182,212,0.35)]'
                      : 'border-transparent bg-slate-900/60 text-slate-400 hover:border-slate-700/60 hover:text-white'
                  }`}
                >
                  {filter.label}
                </Link>
              )
            })}
          </div>

          {query ? (
            <div className="text-sm text-slate-400">
              Showing {results.length} of {totalResults || results.length} results for
              <span className="pl-2 text-cyan-200">"{query}"</span>
            </div>
          ) : (
            <div className="text-sm text-slate-400">
              Type at least two characters to begin searching the catalog.
            </div>
          )}
        </div>

        {query.trim().length < 2 ? (
          <div className="glass-panel mt-10 flex flex-col items-center gap-4 rounded-[28px] border border-slate-800/40 bg-slate-950/70 p-12 text-center text-slate-400">
            <p className="text-lg font-semibold text-white">Start typing to explore RedaStream+</p>
            <p className="max-w-xl text-sm text-slate-400">
              Try searching for blockbuster hits like "Alien", acclaimed series like "Ozark", or explore genres such as
              sci-fi, drama, and comedy.
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="mt-10 space-y-12">
            <section>
              <h2 className="mb-5 text-xl font-semibold text-white">Movies & TV Shows</h2>
              <MediaGrid items={results} />
            </section>
          </div>
        ) : (
          <div className="glass-panel mt-10 flex flex-col items-center gap-4 rounded-[28px] border border-slate-800/40 bg-slate-950/70 p-12 text-center text-slate-400">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-800/60 bg-slate-900/70 text-cyan-300">
              <SearchIcon />
            </div>
            <p className="text-lg font-semibold text-white">No matches found</p>
            <p className="max-w-xl text-sm text-slate-400">
              We couldn't find results for "{query}". Try different keywords, check your spelling, or explore the
              categories on the homepage.
            </p>
          </div>
        )}
      </main>

      <EnhancedFooter />
    </div>
  )
}

function SearchIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
