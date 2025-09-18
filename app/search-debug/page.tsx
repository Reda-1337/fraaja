"use client"

import { useState, useEffect } from 'react'

export default function SearchDebugPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev.slice(-10), `${new Date().toLocaleTimeString()}: ${info}`])
  }

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      addDebugInfo(`Query too short: "${query}" (${query.length} chars)`)
      return
    }

    addDebugInfo(`Starting search for: "${query}"`)
    setIsLoading(true)

    const timeoutId = setTimeout(async () => {
      try {
        addDebugInfo(`Making API call for: "${query}"`)
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        addDebugInfo(`API response status: ${response.status}`)
        
        if (response.ok) {
          const data = await response.json()
          addDebugInfo(`API returned ${data.results?.length || 0} results`)
          setResults((data.results || []).slice(0, 5))
        } else {
          addDebugInfo(`API error: ${response.status}`)
          setResults([])
        }
      } catch (error) {
        addDebugInfo(`Fetch error: ${error}`)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Search Debug Page</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Search Input</h2>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search (try 'batman', 'spider', 'avengers')"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Debug Info */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Debug Info</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className="text-sm text-gray-300 font-mono">
                  {info}
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Results {isLoading && <span className="text-purple-400">(Loading...)</span>}
            </h2>
            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map((item, index) => (
                  <div key={index} className="bg-gray-800 p-3 rounded text-white">
                    <div className="font-medium">{item.title || item.name}</div>
                    <div className="text-sm text-gray-300">
                      {item.media_type} • {item.release_date || item.first_air_date}
                    </div>
                  </div>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="text-gray-400 text-center py-8">
                {isLoading ? 'Searching...' : 'No results found'}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                Type at least 2 characters to search
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

