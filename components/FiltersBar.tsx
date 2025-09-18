"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Genre = { id: number; name: string }

export default function FiltersBar({ type }: { type: 'movie' | 'tv' }) {
  const router = useRouter()
  const params = useSearchParams()
  const [genres, setGenres] = useState<Genre[]>([])
  const [years, setYears] = useState<string[]>([])

  const currentGenre = params.get('with_genres') || ''
  const currentYear = params.get(type === 'movie' ? 'year' : 'year') || ''
  const currentSort = params.get('sort_by') || 'popularity.desc'

  useEffect(() => {
    fetch('/api/filters')
      .then((r) => r.json())
      .then((d) => {
        setGenres((type === 'movie' ? d.movieGenres : d.tvGenres) || [])
        setYears(d.years || [])
      })
      .catch(() => {})
  }, [type])

  function updateQuery(next: Record<string, string>) {
    const url = new URL(window.location.href)
    for (const [k, v] of Object.entries(next)) {
      if (v) url.searchParams.set(k, v)
      else url.searchParams.delete(k)
    }
    router.push(url.pathname + '?' + url.searchParams.toString())
  }

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
      <select
        className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
        value={currentGenre}
        onChange={(e) => updateQuery({ with_genres: e.target.value })}
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      <select
        className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
        value={currentYear}
        onChange={(e) => updateQuery({ year: e.target.value })}
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select
        className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
        value={currentSort}
        onChange={(e) => updateQuery({ sort_by: e.target.value })}
      >
        <option value="popularity.desc">Popularity</option>
        <option value="vote_average.desc">Rating</option>
        <option value="primary_release_date.desc">Newest</option>
      </select>
    </div>
  )
}


