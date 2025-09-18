"use client"

import { useState } from 'react'

export default function TestSearchSimple() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (query.length < 2) {
      alert('Please enter at least 2 characters')
      return
    }

    console.log('🔍 Starting search for:', query)
    setLoading(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      console.log('📡 Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Search results:', data.results?.length || 0, 'items')
        setResults(data.results || [])
      } else {
        console.error('❌ Search failed:', response.status)
        alert('Search failed')
      }
    } catch (error) {
      console.error('💥 Search error:', error)
      alert('Search error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Simple Search Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type search query..."
              className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleSearch}
              disabled={loading || query.length < 2}
              className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          <div className="text-sm text-gray-400">
            Query: "{query}" | Length: {query.length} | Loading: {loading ? 'Yes' : 'No'}
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Results ({results.length} items)
            </h2>
            <div className="space-y-3">
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
      </div>
    </div>
  )
}
