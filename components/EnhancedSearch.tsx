"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
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

export default function EnhancedSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.results || [])
        setShowDropdown(true)
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
  }, [])

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setSelectedIndex(-1)

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value)
    }, 300)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || searchResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          const selectedItem = searchResults[selectedIndex]
          const mediaType = selectedItem.media_type || (selectedItem.name ? 'tv' : 'movie')
          window.location.href = `/${mediaType}/${selectedItem.id}`
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm('')
    setSearchResults([])
    setHasSearched(false)
    setShowDropdown(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
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

      {/* Search Status */}
      {hasSearched && !isSearching && (
        <div className="mt-2 text-sm text-gray-400 px-1">
          {searchResults.length > 0 ? (
            <span>Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
          ) : searchTerm.trim().length >= 2 ? (
            <span>No results found for "{searchTerm}"</span>
          ) : null}
        </div>
      )}

      {/* Search Results Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50"
        >
          {searchResults.slice(0, 8).map((item, index) => {
            const title = getItemTitle(item)
            const year = getItemYear(item)
            const mediaType = getItemType(item)
            const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A'
            const isSelected = index === selectedIndex

            return (
              <Link
                key={`${mediaType}-${item.id}`}
                href={`/${mediaType}/${item.id}`}
                className={`block p-4 hover:bg-gray-800/50 border-b border-gray-800/50 last:border-b-0 transition-colors ${
                  isSelected ? 'bg-gray-800/50' : ''
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center gap-4">
                  {/* Poster */}
                  <div className="w-16 h-20 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center ${item.poster_path ? 'hidden' : ''}`}>
                      <Play className="w-6 h-6 text-gray-400" />
                    </div>
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
    </div>
  )
}
