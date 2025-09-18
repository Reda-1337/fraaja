import NewSearch from '@/components/NewSearch'

export default function TestBasicSearchPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">New Search Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">New Search Component</h2>
          <NewSearch />
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. <strong>Type in the search box above</strong> - try "batman", "spider", "avengers"</p>
            <p>2. <strong>Watch the debug info</strong> - shows query, length, loading status, results count</p>
            <p>3. <strong>Click the Search button</strong> - manual search trigger</p>
            <p>4. <strong>Check browser console</strong> (F12) for detailed debug messages</p>
            <p>5. <strong>Results appear below</strong> when search completes</p>
          </div>
        </div>
      </div>
    </div>
  )
}

