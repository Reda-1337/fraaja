import Header from '@/components/Header'
import MediaGrid from '@/components/MediaGrid'
import { getBaseUrl } from '@/lib/baseUrl'
import FiltersBar from '@/components/FiltersBar'
import { Suspense } from 'react'

async function getMovies(search: string) {
  const res = await fetch(`${getBaseUrl()}/api/discover?type=movie&${search || 'sort_by=popularity.desc'}`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return { results: [] as any[] }
  return res.json()
}

export default async function MoviesPage({ searchParams }: { searchParams: Record<string, string> }) {
  const search = new URLSearchParams(searchParams).toString()
  const data = await getMovies(search)
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
