import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import EnhancedFooter from '@/components/EnhancedFooter'
import { getBaseUrl } from '@/lib/baseUrl'
import MediaGrid from '@/components/MediaGrid'
import { Play, Calendar, ListVideo, Star } from 'lucide-react'

async function getDetails(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/details/tv/${id}`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 600) }
  })
  if (!res.ok) return null
  return res.json()
}

async function getSeason(id: string, seasonNumber: number) {
  const res = await fetch(`${getBaseUrl()}/api/tv/${id}/season/${seasonNumber}`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return null
  return res.json()
}

type TvPageProps = {
  params: { id: string }
  searchParams: { season?: string }
}

export default async function TvDetailsPage({ params, searchParams }: TvPageProps) {
  const data = await getDetails(params.id)

  if (!data) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-24 text-center text-slate-400">
          <p className="text-2xl font-semibold text-white">Series not found</p>
          <p className="mt-2 text-sm text-slate-400">Try browsing other categories from the homepage.</p>
          <Link href="/" className="mt-6 inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-400">
            Go home
          </Link>
        </main>
        <EnhancedFooter />
      </div>
    )
  }

  const seasons = Array.isArray(data.seasons) ? data.seasons.filter((s: any) => s.season_number >= 0) : []
  const validSeasonNumbers = seasons.map((season: any) => season.season_number)
  const defaultSeason = validSeasonNumbers.find((n: number) => n > 0) ?? validSeasonNumbers[0] ?? 1
  const selectedSeasonNumber = parseInt(searchParams.season || '', 10)
  const currentSeasonNumber = Number.isFinite(selectedSeasonNumber) && validSeasonNumbers.includes(selectedSeasonNumber)
    ? selectedSeasonNumber
    : defaultSeason

  const seasonData = await getSeason(params.id, currentSeasonNumber)
  const episodes = Array.isArray(seasonData?.episodes) ? seasonData.episodes : []
  const backdrop = data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null
  const poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null
  const watchHref = `/watch/tv/${params.id}/${currentSeasonNumber}/1`
  const rating = typeof data.vote_average === 'number' ? data.vote_average.toFixed(1) : 'N/A'
  const firstAirYear = data.first_air_date ? data.first_air_date.slice(0, 4) : null
  const recommendations = Array.isArray(data.recommendations?.results) ? data.recommendations.results : []

  return (
    <div className="min-h-screen">
      <Header />

      <main className="space-y-16 pb-20">
        <section className="relative">
          <div className="absolute inset-0">
            {backdrop ? (
              <Image src={backdrop} alt={data.name} fill priority className="object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/30 to-transparent" />
          </div>

          <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-16 pt-24 lg:flex-row">
            <div className="glass-card w-full max-w-sm overflow-hidden rounded-[28px] border border-slate-800/50">
              <div className="relative aspect-[2/3]">
                {poster ? (
                  <Image src={poster} alt={data.name} fill className="object-cover" priority />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-500">No Poster</div>
                )}
              </div>
              <div className="space-y-3 p-6 text-sm text-slate-300">
                <div className="flex items-center gap-2 text-amber-300">
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">{rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span>{firstAirYear ?? 'Unknown year'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ListVideo className="h-4 w-4 text-slate-500" />
                  <span>{data.number_of_seasons ?? 0} seasons  -  {data.number_of_episodes ?? 0} episodes</span>
                </div>
              </div>
            </div>

            <div className="glass-panel flex-1 rounded-[32px] border border-slate-800/50 bg-slate-950/75 p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-cyan-300">
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-200">TV Series</span>
                {firstAirYear && <span className="rounded-full bg-slate-900/70 px-3 py-1 text-slate-300">Since {firstAirYear}</span>}
                <span className="rounded-full bg-slate-900/70 px-3 py-1 text-slate-300">TMDB Score {rating}</span>
              </div>

              <h1 className="mt-5 text-4xl font-bold text-white md:text-5xl">{data.name}</h1>

              {data.overview && (
                <p className="mt-6 max-w-3xl text-base text-slate-300 md:text-lg md:leading-relaxed">
                  {data.overview}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={watchHref as any}
                  className="inline-flex items-center gap-3 rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_45px_rgba(6,182,212,0.45)] transition hover:-translate-y-0.5 hover:bg-cyan-400"
                >
                  <Play className="h-5 w-5" />
                  Start Season {currentSeasonNumber}
                </Link>
                <button className="inline-flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:text-white">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6">
          <div className="flex flex-col gap-4 rounded-[28px] border border-slate-800/50 bg-slate-950/70 p-6">
            <div className="flex flex-wrap items-center gap-3">
              {seasons.map((season: any) => {
                const seasonNumber = season.season_number
                const isActive = seasonNumber === currentSeasonNumber
                const queryParams = new URLSearchParams()
                queryParams.set('season', String(seasonNumber))

                return (
                  <Link
                    key={season.id ?? seasonNumber}
                    href={`/tv/${params.id}?${queryParams.toString()}`}
                    className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                      isActive
                        ? 'border-cyan-400/70 bg-cyan-500/10 text-cyan-100 shadow-[0_12px_28px_rgba(6,182,212,0.35)]'
                        : 'border-transparent bg-slate-900/60 text-slate-400 hover:border-slate-700/60 hover:text-white'
                    }`}
                  >
                    Season {seasonNumber}
                  </Link>
                )
              })}
            </div>

            <div className="rounded-3xl border border-slate-800/40 bg-slate-950/60 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Episodes</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Season {currentSeasonNumber}
                    {seasonData?.episodes?.length ? `  -  ${seasonData.episodes.length} Episodes` : ''}
                  </h2>
                </div>
                <p className="text-sm text-slate-400">Air year {seasonData?.air_date?.slice(0, 4) ?? 'N/A'}</p>
              </div>

              {episodes.length > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {episodes.map((episode: any) => {
                    const still = episode.still_path
                      ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                      : null
                    const runtime = episode.runtime ? `${episode.runtime} min` : null
                    return (
                      <div
                        key={episode.id}
                        className="group flex gap-4 rounded-2xl border border-slate-800/50 bg-slate-950/70 p-4 transition hover:border-cyan-400/50 hover:bg-slate-950/80"
                      >
                        <div className="relative h-28 w-40 overflow-hidden rounded-xl bg-slate-900">
                          {still ? (
                            <Image src={still} alt={episode.name} fill className="object-cover transition duration-300 group-hover:scale-105" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">No Image</div>
                          )}
                          <span className="absolute left-2 top-2 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-semibold text-white">
                            Ep {episode.episode_number}
                          </span>
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between text-sm text-slate-400">
                            <span className="font-semibold text-white">{episode.name}</span>
                            {runtime && <span>{runtime}</span>}
                          </div>
                          {episode.overview && (
                            <p className="text-xs text-slate-400 line-clamp-3">{episode.overview}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-6 text-sm text-slate-400">No episode information available for this season.</p>
              )}
            </div>
          </div>
        </section>

        {recommendations.length > 0 && (
          <section className="mx-auto w-full max-w-7xl px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Similar Shows</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">You might also enjoy</h2>
              </div>
            </div>
            <div className="mt-6">
              <MediaGrid items={recommendations} />
            </div>
          </section>
        )}
      </main>

      <EnhancedFooter />
    </div>
  )
}
