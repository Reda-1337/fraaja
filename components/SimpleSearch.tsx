"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, Loader2, Star, Calendar, Play } from 'lucide-react'

type SearchResult = {
  id: number
  title?: string
  name?: string
  poster_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  media_type?: 'movie' | 'tv'
  overview?: string
}

export default function SimpleSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simple search function
  const performSearch = async (query: string) => {
    console.log('performSearch called with:', query)
    if (query.trim().length < 2) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    setIsSearching(true)
    setShowDropdown(true)

    try {
      console.log('Making search request...')
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Search results:', data.results)
        setSearchResults(data.results || [])
      } else {
        console.error('Search failed:', response.status)
        setSearchResults([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log('Input changed to:', value)
    setSearchTerm(value)
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      console.log('Timeout triggered, calling performSearch with:', value)
      performSearch(value)
    }, 300)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm('')
    setSearchResults([])
    setShowDropdown(false)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  const getItemTitle = (item: SearchResult) => item.title || item.name || 'Untitled'
  const getItemYear = (item: SearchResult) => {
    const date = item.release_date || item.first_air_date || ''
    return date ? date.slice(0, 4) : ''
  }
  const getItemType = (item: SearchResult) => item.media_type || (item.name ? 'tv' : 'movie')

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search movies and TV shows..."
          className="w-full pl-12 pr-12 py-3 bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        />
        
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
          {searchResults.slice(0, 8).map((item, index) => {
            const title = getItemTitle(item)
            const year = getItemYear(item)
            const mediaType = getItemType(item)
            const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A'

            return (
              <Link
                key={`${mediaType}-${item.id}`}
                href={`/${mediaType}/${item.id}`}
                className="block p-4 hover:bg-gray-800/50 border-b border-gray-800/50 last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Poster */}
                  <div className="w-16 h-20 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    {item.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                        alt={title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="64px"
                      />
                    ) : (
                      <Play className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate text-lg">{title}</h3>
                    
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${
                        mediaType === 'movie' 
                          ? 'bg-blue-600/20 text-blue-400' 
                          : 'bg-purple-600/20 text-purple-400'
                      }`}>
                        {mediaType}
                      </span>
                      
                      {year && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{year}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{rating}</span>
                      </div>
                    </div>

                    {item.overview && (
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {item.overview}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* No Results */}
      {showDropdown && !isSearching && searchResults.length === 0 && searchTerm.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-4 text-center text-gray-400">
          No results found for "{searchTerm}"
        </div>
      )}

      {/* Loading State */}
      {showDropdown && isSearching && searchTerm.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-4 text-center text-purple-400 flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" size={20} /> Searching for "{searchTerm}"...
        </div>
      )}
    </div>
  )
}
