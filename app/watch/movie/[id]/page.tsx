import Header from '@/components/Header'
import PlayerEmbed from '@/components/PlayerEmbed'
import { getBaseUrl } from '@/lib/baseUrl'

async function getServers(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/stream/movie/${id}`, { cache: 'no-store' })
  if (!res.ok) return { servers: [] as any[] }
  return res.json()
}

export default async function WatchMoviePage({ params }: { params: { id: string } }) {
  const { servers } = await getServers(params.id)
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-4">Watch Movie</h1>
        <PlayerEmbed initialServers={servers} />
      </div>
    </main>
  )
}


