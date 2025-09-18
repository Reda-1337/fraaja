"use client"

import { useState } from 'react'

export default function TestSearchUI() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    setLogs(prev => [...prev.slice(-10), logMessage])
    console.log(logMessage)
  }

  const testSearch = async () => {
    addLog(`🔍 Starting search for: "${query}"`)
    
    if (query.length < 2) {
      addLog('❌ Query too short')
      return
    }

    setLoading(true)
    addLog('⏳ Set loading to true')

    try {
      addLog('📡 Making API request...')
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      addLog(`📊 Response status: ${response.status}`)
      
      if (response.ok) {
        const data = await response.json()
        addLog(`✅ Received ${data.results?.length || 0} results`)
        setResults(data.results || [])
        addLog('💾 Results saved to state')
      } else {
        addLog(`❌ API error: ${response.status}`)
        setResults([])
      }
    } catch (error) {
      addLog(`💥 Error: ${error instanceof Error ? error.message : String(error)}`)
      setResults([])
    } finally {
      setLoading(false)
      addLog('✅ Set loading to false')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    addLog(`⌨️ Input changed: "${value}" (${value.length} chars)`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    addLog(`🔑 Key pressed: ${e.key}`)
    if (e.key === 'Enter') {
      addLog('⏎ Enter key - starting search')
      testSearch()
    }
  }

  const handleButtonClick = () => {
    addLog('🖱️ Button clicked - starting search')
    testSearch()
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Search UI Test</h1>
        
        {/* Search Interface */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Search Interface</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type search query (e.g., 'batman')..."
              className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
            <button
              onClick={handleButtonClick}
              disabled={loading || query.length < 2}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {loading ? '⏳ Searching...' : '🔍 Search'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
            <div>Query: "{query}"</div>
            <div>Length: {query.length}</div>
            <div>Loading: {loading ? 'Yes' : 'No'}</div>
            <div>Results: {results.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Debug Logs */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Debug Logs</h2>
            <div className="bg-black p-4 rounded text-green-400 font-mono text-sm max-h-80 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet. Try typing and searching.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">{log}</div>
                ))
              )}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Search Results ({results.length})
            </h2>
            {results.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {results.slice(0, 5).map((item, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg text-white">
                    <div className="font-semibold text-lg">{item.title || item.name}</div>
                    <div className="text-sm text-gray-300 mt-1">
                      {item.media_type} • {item.release_date || item.first_air_date} • ⭐ {item.vote_average?.toFixed(1) || 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                {loading ? '⏳ Searching...' : 'No results yet. Try searching for "batman" or "spider".'}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-900 p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Test Instructions</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. <strong>Type in the search box</strong> - watch the debug logs for input changes</p>
            <p>2. <strong>Click the Search button</strong> - check if button click is detected</p>
            <p>3. <strong>Press Enter key</strong> - verify key press detection</p>
            <p>4. <strong>Try searching for "batman"</strong> - should return results</p>
            <p>5. <strong>Check browser console</strong> (F12) for additional logs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
