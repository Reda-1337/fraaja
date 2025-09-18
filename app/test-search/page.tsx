"use client"

import { useState } from 'react'
import NewSearch from '@/components/NewSearch'

export default function TestSearchPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [isTesting, setIsTesting] = useState(false)

  const testSearchAPI = async () => {
    console.log('🔴 Test button clicked!')
    setIsTesting(true)
    try {
      console.log('🟡 Making API request...')
      const response = await fetch('/api/search?q=batman')
      console.log('🟢 Response received:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('✅ Data parsed:', data)
      setTestResults(data.results || [])
      console.log('📊 Results set:', data.results?.length || 0, 'items')
    } catch (error) {
      console.error('❌ Test search failed:', error)
      alert(`Search test failed: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Search Test Page</h1>
        
        {/* Test Search Component */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Search Component Test</h2>
          <div className="bg-gray-900 p-6 rounded-lg">
            <NewSearch />
          </div>
        </div>

        {/* Test API Directly */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">API Test</h2>
          <button
            onClick={testSearchAPI}
            disabled={isTesting}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {isTesting ? 'Testing...' : 'Test Search API'}
          </button>
          
          <div className="mt-2 text-sm text-gray-400">
            Status: {isTesting ? 'Testing...' : 'Ready to test'}
          </div>
          
          {testResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-white mb-2">
                API Results ({testResults.length} items):
              </h3>
              <div className="bg-gray-800 p-4 rounded-lg max-h-96 overflow-y-auto">
                {testResults.slice(0, 5).map((item, index) => (
                  <div key={index} className="text-white mb-2 p-2 bg-gray-700 rounded">
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

        {/* Instructions */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Test Instructions</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. <strong>Test Search Component:</strong> Type in the search box above (try "batman", "spider", "avengers")</p>
            <p>2. <strong>Test API Directly:</strong> Click the "Test Search API" button to test the backend</p>
            <p>3. <strong>Check Console:</strong> Open browser dev tools (F12) to see any error messages</p>
            <p>4. <strong>Expected Behavior:</strong> Search should show results after typing 2+ characters</p>
          </div>
        </div>
      </div>
    </div>
  )
}
