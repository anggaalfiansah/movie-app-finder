const CardMovieSkeleton = () => {
  return (
    <article className="card-movie skeleton-card">
      <div className="card-movie__poster skeleton"></div>
      <div className="card-movie__details">
        <div className="card-movie__header">
          <div className="skeleton-title skeleton"></div>
          <div className="skeleton-rating skeleton"></div>
        </div>
        <div className="card-movie__overview">
          <div className="skeleton-text skeleton"></div>
          <div className="skeleton-text skeleton"></div>
          <div className="skeleton-text skeleton short"></div>
        </div>
        <div className="card-movie__meta">
          <div className="skeleton-meta skeleton"></div>
          <div className="skeleton-meta skeleton"></div>
        </div>
      </div>
    </article>
  );
};

export default CardMovieSkeleton;
