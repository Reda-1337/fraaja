import Header from '@/components/Header'
import MediaGrid from '@/components/MediaGrid'
import { getBaseUrl } from '@/lib/baseUrl'

async function getDetails(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/details/movie/${id}`, { next: { revalidate: 600 } })
  if (!res.ok) return null
  return res.json()
}

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const data = await getDetails(params.id)
  if (!data) return <div className="container mx-auto px-4 py-8 text-gray-400">Not found</div>
  const recs = Array.isArray(data.recommendations?.results) ? data.recommendations.results : []
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
            {data.tagline ? <p className="text-gray-400 italic mb-4">“{data.tagline}”</p> : null}
            <p className="text-sm text-gray-300 mb-4">{data.overview || 'No description available.'}</p>
            <a href={`/watch/movie/${params.id}`} className="inline-block px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500">Watch Now</a>
          </div>
          <div>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-400">Release:</span> <span className="ml-1">{data.release_date || 'N/A'}</span></div>
              <div><span className="text-gray-400">Runtime:</span> <span className="ml-1">{data.runtime ? `${data.runtime} min` : 'N/A'}</span></div>
              {Array.isArray(data.genres) && data.genres.length > 0 && (
                <div>
                  <span className="text-gray-400">Genres:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.genres.map((g: any) => (
                      <span key={g.id} className="px-2 py-1 bg-gray-800 rounded text-xs">{g.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {recs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">You may also like</h2>
            <MediaGrid items={recs} />
          </div>
        )}
      </div>
    </main>
  )
}


