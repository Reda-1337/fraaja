import Image from 'next/image'
import Link from 'next/link'

type Props = {
  id: number
  title: string
  posterPath: string | null
  year?: string
  rating?: number
  mediaType: 'movie' | 'tv'
}

export default function MediaCard({ id, title, posterPath, year, rating, mediaType }: Props) {
  const posterSrc = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750"><rect width="100%" height="100%" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-family="Arial" font-size="28">No Image</text></svg>'
  const watchHref = mediaType === 'movie' 
    ? `/watch/movie/${id}` 
    : `/watch/tv/${id}/1/1`
  
      return (
        <Link href={watchHref} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl">
          <div className="relative rounded-xl overflow-hidden bg-gray-900/50 border border-gray-800/50 hover:border-purple-500/50 hover:shadow-[0_20px_40px_rgba(139,92,246,0.3)] transition-all duration-300 transform hover:-translate-y-2">
        <div className="aspect-[2/3] bg-gray-900 relative overflow-hidden">
              <Image 
                src={posterSrc} 
                alt={title} 
                fill 
                sizes="(max-width:768px) 50vw, 20vw" 
                className="object-cover transition-transform duration-300 group-hover:scale-105" 
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='15'><rect width='100%' height='100%' fill='%23222222'/></svg>"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750"><rect width="100%" height="100%" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-family="Arial" font-size="28">No Image</text></svg>';
                }}
              />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
              {mediaType === 'movie' ? '🎬' : '📺'}
            </div>
          </div>
          {rating && (
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {rating.toFixed(1)}
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm truncate text-white group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>{year || 'N/A'}</span>
            <span className="capitalize text-gray-500">{mediaType}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}


