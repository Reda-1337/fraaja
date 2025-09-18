# RedaStream 🎬

A modern movie and TV show streaming platform built with Next.js, TypeScript, and Tailwind CSS. Discover, search, and stream your favorite content with a beautiful, responsive interface.

## ✨ Features

- 🎬 **Browse Movies & TV Shows** - Explore trending, popular, and top-rated content
- 🔍 **Advanced Search** - Find movies and TV shows with real-time search
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS
- ⚡ **Fast Performance** - Built with Next.js 14 for optimal speed
- 🎭 **Detailed Pages** - Comprehensive movie and TV show information
- 🎥 **Streaming Integration** - Ready for streaming service integration
- 🌙 **Dark Theme** - Elegant dark theme throughout the platform

## 🚀 Live Demo

[Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Reda-1337/fraaja)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: TMDB (The Movie Database)
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Reda-1337/fraaja.git
   cd fraaja
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   # Or use v4 bearer token:
   # TMDB_READ_TOKEN=your_tmdb_v4_bearer_token
   CACHE_TTL_SECONDS=300
   # For production CSP allowlist of iframe hosts
   ALLOWED_IFRAME_ORIGINS=https://vidnest.fun
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### TMDB API Setup

1. Visit [TMDB](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Add your API key to `.env.local`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TMDB_API_KEY` | Your TMDB v3 API key | Yes |
| `TMDB_READ_TOKEN` | Your TMDB v4 bearer token | Alternative |
| `CACHE_TTL_SECONDS` | Cache time-to-live in seconds | No (default: 300) |
| `ALLOWED_IFRAME_ORIGINS` | CSP allowlist for iframe hosts | No |

## 📁 Project Structure

```
fraaja/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── trending/      # Trending content
│   │   ├── discover/      # Content discovery
│   │   ├── search/        # Search functionality
│   │   ├── details/       # Movie/TV details
│   │   └── stream/        # Streaming endpoints
│   ├── movie/             # Movie pages
│   ├── tv/                # TV show pages
│   └── watch/             # Streaming pages
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── HeroSection.tsx    # Hero carousel
│   ├── MediaCard.tsx      # Media item cards
│   └── NewSearch.tsx      # Search component
├── lib/                   # Utility functions
│   ├── tmdb.ts           # TMDB API client
│   ├── baseUrl.ts        # URL configuration
│   └── streaming.ts      # Streaming utilities
└── public/               # Static assets
```

## 🎯 Key Features Explained

### Search Functionality
- Real-time search with debouncing
- Search both movies and TV shows
- Results display with ratings and metadata
- Responsive search interface

### Content Discovery
- Trending content carousel
- Popular movies and TV shows
- Top-rated content sections
- Category-based filtering

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Optimized for all screen sizes
- Touch-friendly interface

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables** in Vercel dashboard:
   - `TMDB_API_KEY`: Your TMDB API key
   - `ALLOWED_IFRAME_ORIGINS`: Your iframe origins (optional)
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 📋 API Routes

- `/api/trending` — TMDB trending proxy
- `/api/discover` — TMDB discover proxy  
- `/api/search` — TMDB search proxy
- `/api/details/:type/:id` — TMDB details (movie|tv) with append
- `/api/tv/:id/season/:season` — season details
- `/api/stream/movie/:id` and `/api/stream/tv/:id/:season/:episode` — streaming servers list

## 📄 Pages

- `/` — Trending grid with hero section
- `/movie/[id]` and `/tv/[id]` — Details pages with Watch button
- `/watch/movie/[id]` and `/watch/tv/[id]/[season]/[episode]` — Player pages
- `/movies` and `/tv` — Browse pages with filtering

## ⚠️ Important Notes

- Keep TMDB attribution in the UI and comply with terms
- Third-party embeds may have legal implications; review before production
- CSP configured in `next.config.js` via `ALLOWED_IFRAME_ORIGINS`
- This is a demo project for educational purposes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the comprehensive movie and TV database
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for the seamless deployment platform

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ by [Reda-1337](https://github.com/Reda-1337)**