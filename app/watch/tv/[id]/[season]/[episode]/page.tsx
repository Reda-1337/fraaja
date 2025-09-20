﻿import { getBaseUrl } from "@/lib/baseUrl"
import { getTvServers } from "@/lib/streaming"
import WatchTvEpisodeClient from "./WatchTvEpisodeClient"

type RouteParams = {
  id: string
  season: string
  episode: string
}

type SeasonSummary = {
  season_number: number
  name: string
  episode_count?: number
}

type EpisodeSummary = {
  episode_number: number
  name?: string
  overview?: string
  still_path?: string | null
  runtime?: number | null
  air_date?: string | null
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  const res = await fetch(url, init)
  if (!res.ok) return null
  try {
    return (await res.json()) as T
  } catch (error) {
    console.error(`Failed to parse JSON from ${url}`, error)
    return null
  }
}

export default async function WatchTvEpisodePage({ params }: { params: RouteParams }) {
  const id = params.id
  const seasonNumber = Number.parseInt(params.season || "1", 10) || 1
  const episodeNumber = Number.parseInt(params.episode || "1", 10) || 1

  const baseUrl = getBaseUrl()

  const [details, seasonData] = await Promise.all([
    fetchJson<any>(`${baseUrl}/api/details/tv/${id}`, { cache: "no-store" }),
    fetchJson<any>(`${baseUrl}/api/tv/${id}/season/${seasonNumber}`, { cache: "no-store" })
  ])

  const seasons: SeasonSummary[] = Array.isArray(details?.seasons)
    ? details.seasons
        .filter((season: any) => typeof season?.season_number === "number" && season.season_number > 0)
        .map((season: any) => ({
          season_number: season.season_number,
          name: season.name || `Season ${season.season_number}`,
          episode_count: season.episode_count
        }))
    : []

  const episodes: EpisodeSummary[] = Array.isArray(seasonData?.episodes)
    ? seasonData.episodes.map((episode: any) => ({
        episode_number: episode.episode_number,
        name: episode.name,
        overview: episode.overview,
        still_path: episode.still_path,
        runtime: episode.runtime,
        air_date: episode.air_date
      }))
    : []

  const servers = getTvServers(id, String(seasonNumber), String(episodeNumber))

  return (
    <WatchTvEpisodeClient
      id={id}
      seasonNumber={seasonNumber}
      episodeNumber={episodeNumber}
      details={details}
      seasons={seasons}
      episodes={episodes}
      servers={servers}
    />
  )
}
