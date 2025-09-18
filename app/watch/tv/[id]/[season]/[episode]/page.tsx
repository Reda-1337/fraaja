"use client"

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import PlayerEmbed from '@/components/PlayerEmbed'
import Link from 'next/link'

type Season = {
  season_number: number
  name: string
}

type Episode = {
  episode_number: number
}

type Props = {
  params: { id: string; season: string; episode: string }
}

export default function WatchTvPage({ params }: Props) {
  const [servers, setServers] = useState<any[]>([])
  const [seasons, setSeasons] = useState<Season[]>([])
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  
  const season = parseInt(params.season, 10) || 1
  const episode = parseInt(params.episode, 10) || 1
  const currentSeason = seasons.find((s) => s.season_number === season) || seasons[0]
  const episodeNumbers = episodes.map((e) => e.episode_number)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch servers
        const serversRes = await fetch(`/api/stream/tv/${params.id}/${season}/${episode}`)
        if (serversRes.ok) {
          const serversData = await serversRes.json()
          setServers(serversData.servers || [])
        }

        // Fetch seasons
        const seasonsRes = await fetch(`/api/details/tv/${params.id}`)
        if (seasonsRes.ok) {
          const tvData = await seasonsRes.json()
          const seasonsList = Array.isArray(tvData?.seasons) 
            ? tvData.seasons.filter((s: any) => s.season_number > 0)
            : []
          setSeasons(seasonsList)
        }

        // Fetch episodes for current season
        const episodesRes = await fetch(`/api/tv/${params.id}/season/${season}`)
        if (episodesRes.ok) {
          const episodesData = await episodesRes.json()
          const episodesList = Array.isArray(episodesData?.episodes) ? episodesData.episodes : []
          setEpisodes(episodesList)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, season, episode])

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const s = e.target.value
    window.location.href = `/watch/tv/${params.id}/${s}/1`
  }

  const handleEpisodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ep = e.target.value
    window.location.href = `/watch/tv/${params.id}/${currentSeason?.season_number || season}/${ep}`
  }

  if (loading) {
    return (
      <main>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    )
  }
  
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-4">Watch TV • S{season} E{episode}</h1>
        <PlayerEmbed initialServers={servers} />

        {seasons.length > 0 && (
          <div className="mt-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Season</span>
              <select
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1"
                value={String(currentSeason?.season_number || season)}
                onChange={handleSeasonChange}
              >
                {seasons.map((s) => (
                  <option key={s.season_number} value={s.season_number}>{s.name}</option>
                ))}
              </select>
            </div>
            {episodeNumbers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Episode</span>
                <select
                  className="bg-gray-800 border border-gray-700 rounded px-2 py-1"
                  value={String(episode)}
                  onChange={handleEpisodeChange}
                >
                  {episodeNumbers.map((n) => (
                    <option key={n} value={n}>E{n}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="ml-auto text-sm text-gray-400">
              <Link href={`/tv/${params.id}`} className="hover:text-purple-400">Details</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}


