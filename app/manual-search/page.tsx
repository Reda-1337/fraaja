"use client"

import { useState } from 'react'

export default function ManualSearchTest() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const addLog = (message: string) => {
    setLog(prev => [...prev.slice(-10), `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleManualSearch = async () => {
    if (query.length < 2) {
      addLog('Query too short')
      return
    }

    setIsLoading(true)
    addLog(`Starting search for: "${query}"`)

    try {
      addLog('Making API call...')
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      addLog(`Response status: ${response.status}`)
      
      if (response.ok) {
        const data = await response.json()
        addLog(`Received ${data.results?.length || 0} results`)
        setResults((data.results || []).slice(0, 5))
      } else {
        addLog(`API error: ${response.status}`)
        setResults([])
      }
    } catch (error) {
      addLog(`Error: ${error}`)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Manual Search Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Manual Search</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type search query..."
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
            />
            <button
              onClick={handleManualSearch}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Log */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Log</h2>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {log.map((entry, index) => (
                <div key={index} className="text-sm text-gray-300 font-mono">
                  {entry}
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
            ) : (
              <div className="text-gray-400 text-center py-8">
                {isLoading ? 'Searching...' : 'No results yet'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

