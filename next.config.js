/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'via.placeholder.com' }
    ]
  },
  experimental: {
    typedRoutes: true
  },
  async headers() {
    const allowedFrames = (process.env.ALLOWED_IFRAME_ORIGINS || 'https://vidnest.fun')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(' ')

    const csp = [
      "default-src 'self'",
      "img-src 'self' https: data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self'",
      `frame-src 'self' ${allowedFrames}`,
      "connect-src 'self' https://api.themoviedb.org https://image.tmdb.org",
      "font-src 'self' data:"
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp }
        ]
      }
    ]
  }
};

module.exports = nextConfig;

