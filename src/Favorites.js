import { getFavorites } from './services/fetch-utils';
import { useDataContext } from './ContextProvider';
import { useEffect, useState } from 'react';

import React from 'react';
import { Link } from 'react-router-dom';
import { removeFavorite } from './services/fetch-utils';

export default function Favorites() {
  const { user } = useDataContext();
  const [favorites, setFavorites] = useState([]);

  async function handleFetchFavorites() {
    const favorites = await getFavorites(user.id);
    setFavorites(favorites);
  }

  async function handleDelete(id) {
    await removeFavorite(id);
    const updateFavorites = await getFavorites();
    setFavorites(updateFavorites);
  }

  useEffect(() => {
    handleFetchFavorites();
  }, []); //eslint-disable-line

  return (
    <div className="movie-posters">
      {favorites &&
        favorites.map((favorite, i) => (
          <div key={favorite.id + i} className="movie">
            <Link to={`MovieDetails/${favorite.api_id}`}>
              <h3>{favorite.title}</h3>
              <img src={`https://image.tmdb.org/t/p/original/${favorite.poster}`} />
            </Link>
            <button onClick={() => handleDelete(favorite.id)}>Remove Movie</button>
          </div>
        ))}
    </div>
  );
}
