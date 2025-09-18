import NewSearch from '@/components/NewSearch'

export default function TestNewSearchPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">New Search Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Brand New Search Component</h2>
          <NewSearch />
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">How to Test</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. <strong>Type in the search box</strong> - try "batman", "spider", "avengers"</p>
            <p>2. <strong>Press Enter</strong> OR <strong>click Search button</strong></p>
            <p>3. <strong>Wait for results</strong> - you'll see "Found X results" message</p>
            <p>4. <strong>Click on any result</strong> to go to the movie/TV show page</p>
            <p>5. <strong>Check browser console</strong> (F12) for debug messages</p>
          </div>
          
          <div className="mt-4 text-gray-300">
            <h3 className="text-lg font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Simple input + button design</li>
              <li>Enter key support</li>
              <li>Loading states</li>
              <li>Error handling with alerts</li>
              <li>Results counter</li>
              <li>Clickable results</li>
              <li>Console logging for debugging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

