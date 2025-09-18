"use client"

import { useEffect, useState } from 'react'

type Server = { name: string; embedUrl: string; priority: number }

export default function PlayerEmbed({ initialServers }: { initialServers: Server[] }) {
  const [servers, setServers] = useState<Server[]>(() => [...initialServers].sort((a, b) => a.priority - b.priority))
  const [activeIdx, setActiveIdx] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorCount, setErrorCount] = useState(0)
  const [autoTried, setAutoTried] = useState(false)
  const [loadTimer, setLoadTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setServers([...initialServers].sort((a, b) => a.priority - b.priority))
    setActiveIdx(0)
    setIsLoading(true)
    setErrorCount(0)
    setAutoTried(false)
  }, [JSON.stringify(initialServers)])

  const active = servers[activeIdx]

  function tryNextServer(reason?: string) {
    if (activeIdx < servers.length - 1) {
      setActiveIdx((i) => i + 1)
      setIsLoading(true)
      setErrorCount((c) => c + 1)
    } else {
      // Loop back only once automatically
      if (!autoTried && servers.length > 1) {
        setActiveIdx(0)
        setAutoTried(true)
        setIsLoading(true)
      }
    }
  }

  function onFrameLoad() {
    if (loadTimer) clearTimeout(loadTimer)
    setIsLoading(false)
  }

  function onFrameError() {
    tryNextServer('frame-error')
  }

  useEffect(() => {
    // Safety timeout: if frame doesn't load within 10s, try next
    if (!active) return
    if (loadTimer) clearTimeout(loadTimer)
    const t = setTimeout(() => {
      if (isLoading) tryNextServer('timeout')
    }, 10000)
    setLoadTimer(t)
    return () => {
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, active?.embedUrl])

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {servers.map((s, idx) => (
          <button
            key={s.name + idx}
            className={`px-3 py-1 rounded border ${idx === activeIdx ? 'bg-indigo-600 border-indigo-500' : 'bg-gray-800 border-gray-700'}`}
            onClick={() => setActiveIdx(idx)}
          >
            {s.name}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {isLoading && (
            <span className="text-xs text-gray-400">Loading...</span>
          )}
          <button
            className="px-3 py-1 rounded border bg-gray-800 border-gray-700 hover:border-red-500 hover:text-red-300"
            onClick={() => tryNextServer('user-report')}
          >
            Server not working?
          </button>
        </div>
      </div>
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        {active ? (
          <iframe
            key={active.embedUrl}
            src={active.embedUrl}
            allowFullScreen
            onLoad={onFrameLoad}
            onError={onFrameError as any}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">No servers</div>
        )}
      </div>
      {errorCount > 0 && (
        <div className="mt-2 text-xs text-gray-500">Tried {errorCount + 1} servers. Switching automatically.</div>
      )}
    </div>
  )
}


