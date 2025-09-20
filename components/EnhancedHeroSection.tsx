"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Play,
  Star,
  Calendar,
  Info,
  ChevronLeft,
  ChevronRight,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2
} from 'lucide-react'

type HeroItem = {
  id: number
  title?: string
  name?: string
  overview?: string
  backdrop_path?: string | null
  poster_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  media_type?: 'movie' | 'tv'
}

type Props = {
  items: HeroItem[]
}

export default function EnhancedHeroSection({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

  const heroItems = items.slice(0, 6)

  useEffect(() => {
    if (!isAutoPlaying || heroItems.length <= 1 || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length)
    }, 6500)

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroItems.length, isHovered])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length)
  }, [heroItems.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroItems.length)
  }, [heroItems.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleAutoPlay = () => setIsAutoPlaying((prev) => !prev)
  const toggleMute = () => setIsMuted((prev) => !prev)
  const toggleFavorite = () => setIsFavorited((prev) => !prev)

  if (heroItems.length === 0) {
    return (
      <div className="relative h-[70vh] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950/80" />
    )
  }

  const currentItem = heroItems[currentIndex]
  const title = currentItem.title || currentItem.name || 'Untitled'
  const date = currentItem.release_date || currentItem.first_air_date
  const year = date ? date.slice(0, 4) : ''
  const mediaType = currentItem.media_type || (currentItem.name ? 'tv' : 'movie')
  const rating = currentItem.vote_average ? currentItem.vote_average.toFixed(1) : 'N/A'
  const watchHref = mediaType === 'movie' ? `/watch/movie/${currentItem.id}` : `/watch/tv/${currentItem.id}/1/1`

  return (
    <section
      className="relative h-[80vh] overflow-hidden rounded-[32px] border border-slate-800/40 shadow-[0_45px_120px_rgba(8,47,73,0.45)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        {currentItem.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`}
            alt={title}
            fill
            priority
            className="object-cover"
            onError={(event) => {
              const target = event.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(56,189,248,0.28),_transparent_55%)]" />
      </div>

      {heroItems.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700/60 bg-slate-950/80 text-white opacity-0 transition hover:-translate-x-1 hover:border-cyan-400/60 group-hover:opacity-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700/60 bg-slate-950/80 text-white opacity-0 transition hover:translate-x-1 hover:border-cyan-400/60 group-hover:opacity-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-8 pb-16">
          <div className="glass-panel rounded-[28px] border border-slate-800/30 bg-slate-950/70 p-8 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-slate-300/80">
              <span className="rounded-full bg-slate-900/70 px-3 py-1 text-slate-200">{mediaType === 'movie' ? 'Movie' : 'TV Series'}</span>
              {year && <span className="rounded-full bg-slate-900/60 px-3 py-1 text-slate-300">{year}</span>}
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-3 py-1 text-amber-300">
                <Star className="h-4 w-4" />
                {rating}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl space-y-6">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
                  {title}
                </h1>
                {currentItem.overview && (
                  <p className="text-base text-slate-300 md:text-lg md:leading-relaxed">
                    {currentItem.overview}
                  </p>
                )}
              </div>

              <div className="flex flex-shrink-0 items-center gap-3">
                <div className="flex flex-col items-start gap-3 md:flex-row">
                  <Link
                    href={watchHref as any}
                    className="inline-flex items-center gap-3 rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_rgba(6,182,212,0.45)] transition hover:-translate-y-0.5 hover:bg-cyan-400"
                  >
                    <Play className="h-5 w-5" />
                    Watch Now
                  </Link>

                  <button
                    onClick={toggleFavorite}
                    className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                      isFavorited
                        ? 'border-rose-500 bg-rose-500/10 text-rose-300'
                        : 'border-slate-700/70 bg-slate-900/70 text-slate-200 hover:border-cyan-400/60 hover:text-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                    Watchlist
                  </button>
                </div>

                <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70 text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-white">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70 text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-white">
                  <Info className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/80 text-white transition hover:border-cyan-400/60"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={toggleAutoPlay}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/80 text-white transition hover:border-cyan-400/60"
        >
          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </div>

      {heroItems.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {heroItems.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'scale-125 bg-cyan-400' : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

