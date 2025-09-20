export function getBaseUrl() {
  // Prefer explicit base URL from env (e.g., NEXT_PUBLIC_BASE_URL for production/preview)
  const explicit = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
  if (explicit) {
    const hasProtocol = explicit.startsWith('http://') || explicit.startsWith('https://')
    return hasProtocol ? explicit : `https://${explicit}`
  }
  // In Next.js RSC route/app handlers, headers() exposes host and protocol.
  // We avoid importing next/headers here to keep this a plain util; callers should pass absolute when needed.
  // Fallback for local dev - use port 3000
  return 'http://localhost:3000'
}



