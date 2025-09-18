import NewSearch from '@/components/NewSearch'

export default function TestDebugPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Debug Search Test</h1>
        <NewSearch />
        
        <div className="mt-8 text-gray-300">
          <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Type in the search box above</li>
            <li>Press Enter or click Search button</li>
            <li>Check browser console (F12) for debug messages</li>
            <li>See search results appear below</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
