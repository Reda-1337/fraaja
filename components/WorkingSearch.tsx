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

export default function WorkingSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Search function
  const performSearch = async (query: string) => {
    console.log('performSearch called with:', query)
    if (query.trim().length < 2) {
      setSearchResults([])
      setShowDropdown(false)
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setShowDropdown(true)
    setHasSearched(true)

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
    setHasSearched(false)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.search-container')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getItemTitle = (item: SearchResult) => item.title || item.name || 'Untitled'
  const getItemYear = (item: SearchResult) => {
    const date = item.release_date || item.first_air_date || ''
    return date ? date.slice(0, 4) : ''
  }
  const getItemType = (item: SearchResult) => item.media_type || (item.name ? 'tv' : 'movie')

  return (
    <div className="relative w-full max-w-2xl search-container">
      {/* Search Input */}
      <div className="relative">
        <div className="flex items-center bg-gray-800/70 border border-gray-700/50 rounded-full px-4 py-2 shadow-lg focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-200">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.trim().length >= 2 && setShowDropdown(true)}
            placeholder="Search movies, TV shows..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="ml-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
          {isSearching && (
            <Loader2 className="ml-3 text-purple-400 animate-spin" size={20} />
          )}
        </div>

        {/* Search Dropdown */}
        {showDropdown && hasSearched && !isSearching && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
            {searchResults.slice(0, 10).map((item, index) => {
              const title = getItemTitle(item)
              const year = getItemYear(item)
              const mediaType = getItemType(item)
              const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A'
              const posterPath = item.poster_path
                ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="92" height="138"><rect width="100%" height="100%" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-family="Arial" font-size="12">No Image</text></svg>'

              return (
                <Link
                  key={`${mediaType}-${item.id}`}
                  href={`/${mediaType}/${item.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0"
                  onClick={() => setShowDropdown(false)}
                >
                  <Image
                    src={posterPath}
                    alt={title}
                    width={46}
                    height={69}
                    className="rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white truncate">{title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                      <span className="capitalize">{mediaType}</span>
                      {year && <span>• {year}</span>}
                      {rating !== 'N/A' && (
                        <span className="flex items-center gap-1">
                          • <Star size={14} className="text-yellow-400" /> {rating}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* No Results */}
        {showDropdown && hasSearched && !isSearching && searchResults.length === 0 && searchTerm.trim().length >= 2 && (
          <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 text-center text-gray-400">
            No results found for "{searchTerm}"
          </div>
        )}

        {/* Loading */}
        {showDropdown && isSearching && searchTerm.trim().length >= 2 && (
          <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 text-center text-purple-400 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={20} /> Searching for "{searchTerm}"...
          </div>
        )}
      </div>
    </div>
  )
}
