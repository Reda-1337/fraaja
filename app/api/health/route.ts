export async function GET() {
  const hasV3 = Boolean(process.env.TMDB_API_KEY)
  const hasV4 = Boolean(process.env.TMDB_READ_TOKEN)
  const cacheTtl = Number(process.env.CACHE_TTL_SECONDS || 300)
  const iframeOrigins = process.env.ALLOWED_IFRAME_ORIGINS || ''

  return Response.json({
    tmdb: {
      hasV3ApiKey: hasV3,
      hasV4Bearer: hasV4,
      configured: hasV3 || hasV4,
    },
    cache: { ttlSeconds: cacheTtl },
    security: { allowedIframeOrigins: iframeOrigins },
    status: (hasV3 || hasV4) ? 'ok' : 'missing_tmdb_credentials',
  })
}

