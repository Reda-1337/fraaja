"use client"

export const dynamic = 'force-dynamic'

import { Suspense, useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Star, Calendar, Play, Film, Tv, Loader2 } from 'lucide-react'

interface SearchResult {
  id: number
  title?: string
  name?: string
  media_type: 'movie' | 'tv' | 'person'
  poster_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  overview?: string
}

type Filter = 'all' | 'movie' | 'tv'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function SimpleSearchPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''

  const [searchTerm, setSearchTerm] = useState(query)
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSearchTerm(query)
  }, [query])

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query || query.trim().length < 2) {
        setResults([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const type = activeFilter === 'all' ? 'multi' : activeFilter
        const params = new URLSearchParams({ q: query, type })
        const response = await fetch(`/api/search?${params.toString()}`)

        if (!response.ok) {
          throw new Error(`Search request failed: ${response.status}`)
        }

        const data = await response.json()
        const sanitized = Array.isArray(data.results)
          ? data.results.filter((item: SearchResult) => item.media_type !== 'person')
          : []
        setResults(sanitized)
      } catch (err) {
        console.error('Error fetching search results:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, activeFilter])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchTerm.trim()
    if (trimmed.length >= 2) {
      router.push(`/search-simple?q=${encodeURIComponent(trimmed)}`)
    } else {
      router.push('/search-simple')
    }
  }

  const filteredResults = useMemo(() => {
    if (activeFilter === 'all') return results
    return results.filter((item) => item.media_type === activeFilter)
  }, [results, activeFilter])

  const movieCount = results.filter((item) => item.media_type === 'movie').length
  const tvCount = results.filter((item) => item.media_type === 'tv').length

  const getItemTitle = (item: SearchResult) => item.title || item.name || 'Untitled'
  const getItemYear = (item: SearchResult) => {
    const date = item.release_date || item.first_air_date || ''
    return date ? date.slice(0, 4) : 'N/A'
  }
  const getItemRating = (item: SearchResult) =>
    typeof item.vote_average === 'number' ? item.vote_average.toFixed(1) : 'N/A'

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <header className="sticky top-0 z-50 border-b border-gray-800/50 backdrop-blur-md bg-black/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-lg flex items-center justify-center group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-indigo-400 transition-colors duration-300">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-indigo-400 transition-colors duration-300">
              RedaStream
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/movies" className="text-gray-300 hover:text-white transition-colors">Movies</Link>
            <Link href="/tv" className="text-gray-300 hover:text-white transition-colors">TV Shows</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Search Results</h1>
          {query ? (
            <p className="text-gray-400 text-lg mb-6">Results for "{query}"</p>
          ) : (
            <p className="text-gray-400 text-lg mb-6">Find movies and TV shows you love</p>
          )}

          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="flex items-center bg-gray-800/70 border border-gray-700/50 rounded-full px-4 py-3 shadow-lg focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-200">
              <Search className="text-gray-400 mr-3" size={24} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies and TV shows..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
              />
              <button
                type="submit"
                className="ml-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {query ? (
          <div className="bg-black/30 border border-gray-800 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All Results ({results.length})
              </button>
              <button
                onClick={() => setActiveFilter('movie')}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  activeFilter === 'movie'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Movies ({movieCount})
              </button>
              <button
                onClick={() => setActiveFilter('tv')}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  activeFilter === 'tv'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                TV Shows ({tvCount})
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin mr-3" size={32} />
                <span className="text-white text-xl">Loading results...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-500 text-lg">
                Error: {error}
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredResults.map((item) => {
                  const title = getItemTitle(item)
                  const year = getItemYear(item)
                  const rating = getItemRating(item)
                  const mediaType = item.media_type === 'movie' ? 'movie' : 'tv'
                  const poster = item.poster_path
                    ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
                    : `https://via.placeholder.com/500x750/1a1a1a/666666?text=${encodeURIComponent(title.slice(0, 20))}`

                  return (
                    <Link
                      key={`${mediaType}-${item.id}`}
                      href={`/${mediaType}/${item.id}`}
                      className="group"
                    >
                      <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-3">
                        <Image
                          src={poster}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                          {rating}
                        </div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-purple-400 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        {mediaType === 'movie' ? <Film size={12} /> : <Tv size={12} />}
                        <span className="capitalize">{mediaType}</span>
                        <span>- {year}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={64} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">No results found for "{query}"</p>
                <p className="text-gray-500">Try a different search term.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search size={64} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Enter a search term to find movies and TV shows</p>
            <p className="text-gray-500 text-sm mt-2">Examples: "Ozark", "Breaking Bad", "Stranger Things"</p>
          </div>
        )}
      </div>
    </div>
  )
}


export default function SimpleSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-slate-400">Loading search...</div>}>
      <SimpleSearchPageInner />
    </Suspense>
  )
}
