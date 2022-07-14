import { getFavorites } from './services/fetch-utils';
import { useDataContext } from './ContextProvider';
import { useEffect, useState } from 'react';
// import MovieSearch from './MovieSearch';
import MovieList from './MovieList';
export default function Favorites() {
  const { user } = useDataContext();
  const [favorites, setFavorites] = useState([]);

  async function handleFetchFavorites() {
    const favorites = await getFavorites(user.id);
    setFavorites(favorites);
  }

  useEffect(() => {
    handleFetchFavorites();
  }, []); //eslint-disable-line
  console.log(favorites);

  return (
    <div>
      <h1>I ♥️ Movies</h1>
      <MovieList favorites={favorites} />
    </div>
  );
}
