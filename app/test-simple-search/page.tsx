import NewSearch from '@/components/NewSearch'

export default function TestSimpleSearchPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">New Search Component Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">New Search Component</h2>
          <NewSearch />
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. Type at least 2 characters in the search box above</p>
            <p>2. You should see console messages in browser dev tools (F12)</p>
            <p>3. Results should appear in a dropdown</p>
            <p>4. Try searching for: "batman", "spider", "avengers"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

