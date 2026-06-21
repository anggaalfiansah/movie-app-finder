import type { Movie } from '../types/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface CardMovieProps {
  movie: Movie;
}

const CardMovie = ({ movie }: CardMovieProps) => {
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null;
  const ratingVal = movie.vote_average;
  const ratingClass = ratingVal >= 7.5 ? 'rating--high' : ratingVal >= 5.0 ? 'rating--medium' : 'rating--low';
  
  // Extract only the release year for cleaner presentation
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'TBA';

  return (
    <article className="card-movie">
      <div className="card-movie__poster">
        {posterUrl ? (
          <img src={posterUrl} alt={movie.title} className="card-movie__image" loading="lazy" />
        ) : (
          <div className="card-movie__placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className="card-movie__details">
        <div className="card-movie__header">
          <h2 title={movie.title}>{movie.title}</h2>
          <span className={`rating ${ratingClass}`}>
            <svg viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {ratingVal.toFixed(1)}
          </span>
        </div>
        <p className="card-movie__overview">{movie.overview || 'Ringkasan cerita tidak tersedia.'}</p>
        <div className="card-movie__meta">
          <span title="Tahun Rilis">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {releaseYear}
          </span>
          <span title="Bahasa Asli">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {movie.original_language.toUpperCase()}
          </span>
        </div>
      </div>
    </article>
  );
};

export default CardMovie;
