import Header from '@/components/Header'
import MediaGrid from '@/components/MediaGrid'
import { getBaseUrl } from '@/lib/baseUrl'
import FiltersBar from '@/components/FiltersBar'
import { Suspense } from 'react'

type SearchParams = Record<string, string | string[] | undefined>

function normalizeMovieParams(searchParams: SearchParams) {
  const params = new URLSearchParams()

  for (const [key, rawValue] of Object.entries(searchParams || {})) {
    if (rawValue === undefined || rawValue === null) continue
    const value = Array.isArray(rawValue) ? rawValue[rawValue.length - 1] : rawValue
    if (value) params.set(key, value)
  }

  const sortSlug = params.get('sort')
  if (sortSlug) {
    if (!params.has('sort_by')) {
      const sortMap: Record<string, string> = {
        popular: 'popularity.desc',
        popularity: 'popularity.desc',
        rating: 'vote_average.desc',
        top: 'vote_average.desc',
        upcoming: 'primary_release_date.desc',
        newest: 'primary_release_date.desc'
      }
      const mappedSort = sortMap[sortSlug.toLowerCase()] || 'popularity.desc'
      params.set('sort_by', mappedSort)
    }
    params.delete('sort')
  }

  if (!params.has('sort_by')) {
    params.set('sort_by', 'popularity.desc')
  }

  return params
}

async function getMovies(params: URLSearchParams) {
  const query = params.toString()
  const search = query ? `&${query}` : ''
  const res = await fetch(`${getBaseUrl()}/api/discover?type=movie${search}`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return { results: [] as any[] }
  return res.json()
}

export default async function MoviesPage({ searchParams }: { searchParams: SearchParams }) {
  const normalizedParams = normalizeMovieParams(searchParams)
  const data = await getMovies(normalizedParams)
  const items = Array.isArray(data.results) ? data.results : []
  
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Popular Movies</h1>
        <Suspense>
          <FiltersBar type="movie" />
        </Suspense>
        {items.length === 0 ? (
          <div className="text-gray-400">No movies found</div>
        ) : (
          <MediaGrid items={items} />
        )}
      </div>
    </main>
  )
}
