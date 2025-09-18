export type StreamServer = {
  name: string
  embedUrl: string
  priority: number
}

export function getMovieServers(id: string): StreamServer[] {
  const list: StreamServer[] = []
  const vidnest = `https://vidnest.fun/movie/${encodeURIComponent(id)}`
  list.push({ name: 'Server 1', embedUrl: vidnest, priority: 1 })
  return list
}

export function getTvServers(id: string, season: string, episode: string): StreamServer[] {
  const list: StreamServer[] = []
  const vidnest = `https://vidnest.fun/tv/${encodeURIComponent(id)}/${encodeURIComponent(season)}/${encodeURIComponent(episode)}`
  list.push({ name: 'Server 1', embedUrl: vidnest, priority: 1 })
  return list
}


