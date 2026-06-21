import { useEffect, useState } from "react";
import CardMovie from "./components/CardMovie";
import CardMovieSkeleton from "./components/CardMovieSkeleton";
import type { Movie } from "./types/movie";
import "./App.css";

const API_KEY = "6f4d99830150c33cca7e6576ac3ba79f";

function App() {
  const [input, setInput] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<"discover" | "search">("discover");
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (url: string, append = false) => {
    setIsLoading(true);
    setError(null);
    if (!append) {
      setMovies([]);
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok || !data.results) {
        throw new Error(data.status_message || "Gagal mengambil data film.");
      }

      setMovies((prevMovies) => (append ? [...prevMovies, ...data.results] : data.results));
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      if (!append) {
        setMovies([]);
      }
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchMovies = () => {
    const query = input.trim();
    if (!query) {
      handleDiscoverMovies();
      return;
    }

    setMode("search");
    setPage(1);
    fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  };

  const handleDiscoverMovies = () => {
    setInput("");
    setMode("discover");
    setPage(1);
    fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`);
  };

  const handleLoadMore = () => {
    if (isLoading || mode !== "discover" || !hasMore) {
      return;
    }

    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${nextPage}`, true);
  };

  useEffect(() => {
    handleDiscoverMovies();
  }, []);

  return (
    <main className="app-container">
      {/* Dynamic logo and navbar */}
      <header className="navbar">
        <div className="logo-container">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="green-blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
          <span className="logo-text">CineFind</span>
          <span className="logo-tagline">Temukan Sinema Favorit Anda</span>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-text">
          <span className="hero-badge">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Finder
          </span>
          <h1>Movie App Finder</h1>
          <p>Jelajahi film populer dan cari judul favorit Anda dalam tampilan yang lebih bersih, modern, dan interaktif.</p>
        </div>

        <div className="search-panel">
          <label htmlFor="movie-search" className="visually-hidden">
            Cari film
          </label>
          <div className="search-input-wrapper">
            <svg className="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="movie-search"
              type="text"
              value={input}
              placeholder="Masukkan judul film..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchMovies()}
              className="search-input"
            />
          </div>
          <div className="search-actions">
            <button type="button" className="btn btn-primary" onClick={handleSearchMovies}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleDiscoverMovies}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              Popular
            </button>
          </div>
        </div>
      </section>

      <section className="movie-list">
        <div className="movie-list__status">
          {isLoading && (
            <span className="status-loading">
              <span className="spinner"></span>
              Memuat data film...
            </span>
          )}
          {!isLoading && error && (
            <span className="status-error">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </span>
          )}
          {!isLoading && !error && movies.length > 0 && <span>{movies.length} film ditemukan</span>}
          {!isLoading && !error && movies.length === 0 && <span className="status-empty">Tidak ada film. Coba kata kunci lain atau klik Popular.</span>}
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <CardMovie key={movie.id} movie={movie} />
          ))}
          {isLoading && movies.length === 0 && Array.from({ length: 8 }).map((_, i) => (
            <CardMovieSkeleton key={`skeleton-${i}`} />
          ))}
          {isLoading && movies.length > 0 && Array.from({ length: 4 }).map((_, i) => (
            <CardMovieSkeleton key={`skeleton-append-${i}`} />
          ))}
        </div>

        {mode === "discover" && movies.length > 0 && hasMore && (
          <div className="load-more-wrapper">
            <button type="button" className="btn btn-secondary load-more-btn" onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? "Memuat..." : "Load More"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
