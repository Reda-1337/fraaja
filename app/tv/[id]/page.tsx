import Header from '@/components/Header'
import { getBaseUrl } from '@/lib/baseUrl'

async function getDetails(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/details/tv/${id}`, { next: { revalidate: 600 } })
  if (!res.ok) return null
  return res.json()
}

export default async function TvDetailsPage({ params }: { params: { id: string } }) {
  const data = await getDetails(params.id)
  if (!data) return <div className="container mx-auto px-4 py-8 text-gray-400">Not found</div>

  const seasons = Array.isArray(data.seasons) ? data.seasons : []
  const firstSeason = seasons.find((s: any) => s.season_number > 0) || seasons[0]
  const initialSeason = firstSeason?.season_number || 1
  const watchHref = `/watch/tv/${params.id}/${initialSeason}/1`

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
            <p className="text-sm text-gray-300 mb-4">{data.overview || 'No description available.'}</p>
            <a href={watchHref} className="inline-block px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500">Watch S{initialSeason} E1</a>
          </div>
          <div>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-400">First air:</span> <span className="ml-1">{data.first_air_date || 'N/A'}</span></div>
              <div><span className="text-gray-400">Seasons:</span> <span className="ml-1">{data.number_of_seasons || 'N/A'}</span></div>
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
      </div>
    </main>
  )
}


