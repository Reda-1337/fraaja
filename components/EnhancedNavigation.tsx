"use client"

import { useState } from 'react'

const lanes = [
  'Continue Watching',
  'Because You Watched',
  'Popular Movies',
  'Popular TV Shows',
  'Top Rated',
  'Trending This Week',
  'Collections',
  'Action',
  'Comedy',
  'Sci-Fi'
]

export default function EnhancedNavigation() {
  const [activeLane, setActiveLane] = useState(lanes[0])

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-8">
      <div className="glass-panel flex flex-wrap items-center gap-3 rounded-3xl border border-slate-800/40 bg-slate-950/70 px-6 py-4 backdrop-blur-xl">
        {lanes.map((lane) => {
          const isActive = activeLane === lane
          return (
            <button
              key={lane}
              type="button"
              onClick={() => setActiveLane(lane)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                isActive
                  ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-100 shadow-[0_12px_25px_rgba(6,182,212,0.35)]'
                  : 'border-transparent bg-slate-900/60 text-slate-400 hover:border-slate-700/60 hover:text-white'
              }`}
            >
              {lane}
            </button>
          )
        })}
      </div>
    </div>
  )
}

