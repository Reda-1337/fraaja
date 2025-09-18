"use client"

import { useState, useEffect } from 'react'
import NewSearch from '@/components/NewSearch'

export default function TestComplete() {
  const [testResults, setTestResults] = useState({
    homepage: false,
    search: false,
    api: false,
    carousel: false
  })

  useEffect(() => {
    // Test homepage load
    fetch('/')
      .then(res => {
        if (res.ok) {
          setTestResults(prev => ({ ...prev, homepage: true }))
        }
      })
      .catch(console.error)

    // Test search API
    fetch('/api/search?q=test')
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setTestResults(prev => ({ ...prev, api: true }))
        }
      })
      .catch(console.error)
  }, [])

  const testSearch = async () => {
    setTestResults(prev => ({ ...prev, search: true }))
  }

  const testCarousel = () => {
    setTestResults(prev => ({ ...prev, carousel: true }))
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Complete Functionality Test</h1>
        
        {/* Test Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-lg ${testResults.homepage ? 'bg-green-900' : 'bg-red-900'}`}>
            <h3 className="font-semibold text-white">Homepage</h3>
            <p className="text-sm text-gray-300">
              {testResults.homepage ? '✅ Working' : '❌ Failed'}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${testResults.api ? 'bg-green-900' : 'bg-red-900'}`}>
            <h3 className="font-semibold text-white">Search API</h3>
            <p className="text-sm text-gray-300">
              {testResults.api ? '✅ Working' : '❌ Failed'}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${testResults.search ? 'bg-green-900' : 'bg-gray-900'}`}>
            <h3 className="font-semibold text-white">Search UI</h3>
            <p className="text-sm text-gray-300">
              {testResults.search ? '✅ Tested' : '⏳ Click to test'}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${testResults.carousel ? 'bg-green-900' : 'bg-gray-900'}`}>
            <h3 className="font-semibold text-white">Carousel</h3>
            <p className="text-sm text-gray-300">
              {testResults.carousel ? '✅ Tested' : '⏳ Click to test'}
            </p>
          </div>
        </div>

        {/* Search Component Test */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Search Component Test</h2>
          <NewSearch />
          <button
            onClick={testSearch}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Mark Search as Tested
          </button>
        </div>

        {/* Carousel Test */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Carousel Test</h2>
          <p className="text-gray-300 mb-4">
            Go to the homepage and check if the hero carousel auto-rotates every 6 seconds.
          </p>
          <button
            onClick={testCarousel}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Mark Carousel as Tested
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Test Instructions</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. <strong>Homepage:</strong> Should load with trending content and hero carousel</p>
            <p>2. <strong>Search API:</strong> Should return movie/TV show results</p>
            <p>3. <strong>Search UI:</strong> Type in search box and click Search button</p>
            <p>4. <strong>Carousel:</strong> Should auto-rotate every 6 seconds on homepage</p>
            <p>5. <strong>Images:</strong> Should show fallback placeholders if TMDB images fail to load</p>
          </div>
        </div>
      </div>
    </div>
  )
}
