"use client"

import { useState } from 'react'

export default function SimpleSearchTest() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (query.length < 2) return
    
    setIsLoading(true)
    try {
      console.log('🔍 Searching for:', query)
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      console.log('📡 Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Data received:', data)
        setResults(data.results || [])
      } else {
        console.error('❌ Search failed:', response.status)
      }
    } catch (error) {
      console.error('💥 Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Simple Search Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type search query..."
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || query.length < 2}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          <div className="text-sm text-gray-400">
            Query: "{query}" | Length: {query.length} | Loading: {isLoading ? 'Yes' : 'No'}
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Results ({results.length} items):
            </h2>
            <div className="space-y-2">
              {results.slice(0, 5).map((item, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded text-white">
                  <div className="font-medium">{item.title || item.name}</div>
                  <div className="text-sm text-gray-300">
                    {item.media_type} • {item.release_date || item.first_air_date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-900 p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. Type at least 2 characters in the search box</p>
            <p>2. Click the "Search" button</p>
            <p>3. Check browser console (F12) for debug messages</p>
            <p>4. Results should appear below</p>
          </div>
        </div>
      </div>
    </div>
  )
}

