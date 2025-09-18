"use client"

import { useState, useEffect } from 'react'

export default function DebugSearch() {
  const [logs, setLogs] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev.slice(-20), `[${timestamp}] ${message}`])
    console.log(`[${timestamp}] ${message}`)
  }

  useEffect(() => {
    addLog('Debug page loaded')
    
    // Test if we can reach the API
    fetch('/api/search?q=test')
      .then(res => {
        addLog(`API test response: ${res.status}`)
        return res.json()
      })
      .then(data => {
        addLog(`API test data: ${JSON.stringify(data).substring(0, 100)}...`)
      })
      .catch(err => {
        addLog(`API test error: ${err.message}`)
      })
  }, [])

  const handleSearch = async () => {
    addLog(`Starting search for: "${searchTerm}"`)
    
    if (searchTerm.trim().length < 2) {
      addLog('Search term too short')
      return
    }

    setIsSearching(true)
    addLog('Set isSearching to true')

    try {
      addLog('Making fetch request...')
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      addLog(`Response received: ${response.status}`)
      
      if (response.ok) {
        const data = await response.json()
        addLog(`Data parsed: ${data.results?.length || 0} results`)
        setResults(data.results || [])
        addLog('Results set in state')
      } else {
        addLog(`Response not OK: ${response.status}`)
        setResults([])
      }
    } catch (error) {
      addLog(`Error occurred: ${error.message}`)
      setResults([])
    } finally {
      setIsSearching(false)
      addLog('Set isSearching to false')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    addLog(`Input changed: "${value}" (length: ${value.length})`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    addLog(`Key pressed: ${e.key}`)
    if (e.key === 'Enter') {
      addLog('Enter key detected, starting search')
      handleSearch()
    }
  }

  const handleButtonClick = () => {
    addLog('Search button clicked')
    handleSearch()
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Search Debug Page</h1>
        
        {/* Search Interface */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Search Interface</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type search query..."
              className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleButtonClick}
              disabled={isSearching || searchTerm.trim().length < 2}
              className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          <div className="text-sm text-gray-400 space-y-1">
            <div>Search term: "{searchTerm}"</div>
            <div>Length: {searchTerm.length}</div>
            <div>Is searching: {isSearching ? 'Yes' : 'No'}</div>
            <div>Results count: {results.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Debug Logs */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Debug Logs</h2>
            <div className="bg-black p-4 rounded text-green-400 font-mono text-sm max-h-96 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="mb-1">{log}</div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Search Results ({results.length})
            </h2>
            {results.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.slice(0, 5).map((item, index) => (
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
                {isSearching ? 'Searching...' : 'No results yet'}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-900 p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Debug Instructions</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. <strong>Type in the search box</strong> - watch the debug logs for input changes</p>
            <p>2. <strong>Click Search button</strong> - check if button click is detected</p>
            <p>3. <strong>Press Enter key</strong> - verify key press detection</p>
            <p>4. <strong>Check browser console</strong> (F12) for additional logs</p>
            <p>5. <strong>Look for errors</strong> in the debug logs or console</p>
          </div>
        </div>
      </div>
    </div>
  )
}
