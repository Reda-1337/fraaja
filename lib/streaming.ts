export type StreamServer = {
  name: string
  embedUrl: string
  priority: number
}

const MOVIE_PROVIDERS = [
  {
    name: 'Vidnest',
    build: (id: string) => `https://vidnest.fun/movie/${id}`
  }
] as const

const TV_PROVIDERS = [
  {
    name: 'Vidnest',
    build: (id: string, season: string, episode: string) =>
      `https://vidnest.fun/tv/${id}/${season}/${episode}`
  }
] as const

function buildMovieServers(id: string) {
  const normalizedId = encodeURIComponent(id)
  return MOVIE_PROVIDERS.map((provider, index) => ({
    name: provider.name,
    embedUrl: provider.build(normalizedId),
    priority: index + 1
  }))
}

function buildTvServers(id: string, season: string, episode: string) {
  const normalizedId = encodeURIComponent(id)
  const normalizedSeason = encodeURIComponent(season)
  const normalizedEpisode = encodeURIComponent(episode)
  return TV_PROVIDERS.map((provider, index) => ({
    name: provider.name,
    embedUrl: provider.build(normalizedId, normalizedSeason, normalizedEpisode),
    priority: index + 1
  }))
}

export function getMovieServers(id: string): StreamServer[] {
  return buildMovieServers(id)
}

export function getTvServers(id: string, season: string, episode: string): StreamServer[] {
  return buildTvServers(id, season, episode)
}
