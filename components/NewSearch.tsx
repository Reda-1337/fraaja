"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function NewSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)


  const performSearch = async () => {
    if (searchTerm.trim().length < 2) {
      alert('Please enter at least 2 characters to search')
      return
    }

    console.log('Starting search for:', searchTerm)
    setIsSearching(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Search successful:', data.results?.length || 0, 'results')
        setSearchResults(data.results || [])
      } else {
        console.error('Search failed:', response.status)
        setSearchResults([])
        alert('Search failed. Please try again.')
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      alert('Search error. Please check your connection.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      performSearch()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="w-full max-w-md">
      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search movies and TV shows..."
          className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={performSearch}
          disabled={isSearching || searchTerm.trim().length < 2}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Search Status */}
      {hasSearched && (
        <div className="mb-4 text-sm text-gray-400">
          {isSearching ? (
            <span>Searching for "{searchTerm}"...</span>
          ) : searchResults.length > 0 ? (
            <span>Found {searchResults.length} results for "{searchTerm}"</span>
          ) : (
            <span>No results found for "{searchTerm}"</span>
          )}
        </div>
      )}

      {/* Search Results */}
      {hasSearched && !isSearching && searchResults.length > 0 && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg max-h-96 overflow-y-auto">
          {searchResults.slice(0, 8).map((item) => {
            const title = item.title || item.name || 'Untitled'
            const mediaType = item.media_type || (item.name ? 'tv' : 'movie')
            const year = (item.release_date || item.first_air_date || '').slice(0, 4)
            const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A'
            
            return (
              <Link
                key={`${mediaType}-${item.id}`}
                href={`/${mediaType}/${item.id}`}
                className="block p-3 hover:bg-gray-800 border-b border-gray-800 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-400">IMG</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white truncate">{title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="capitalize bg-gray-700 px-2 py-1 rounded text-xs">
                        {mediaType}
                      </span>
                      {year && <span>{year}</span>}
                      <span className="flex items-center gap-1">
                        ⭐ {rating}
                      </span>
                    </div>
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

