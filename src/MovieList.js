import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieList({ favorites }) {
  return (
    <div className="movie-posters">
      {favorites &&
        favorites.map((favorite, i) => (
          <div key={favorite.id + i} className="movie">
            <Link to={`MovieDetails/${favorite.api_id}`}>
              <h3>{favorite.title}</h3>
              <img src={`https://image.tmdb.org/t/p/original/${favorite.poster}`} />
            </Link>
            <button>Remove Movie</button>
          </div>
        ))}
    </div>
  );
}
