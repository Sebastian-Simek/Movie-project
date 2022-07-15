import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createFavorites, searchMovies, getFavorites } from './services/fetch-utils';
import { useDataContext } from './ContextProvider';

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [watchList, setWatchList] = useState('');
  const [results, setResults] = useState([]);
  const { user } = useDataContext();
  const [favorites, setFavorites] = useState('');

  useEffect(() => {
    if (!favorites) handleFetchFavorites();
  }, []); //eslint-disable-line

  async function searchHandle(e) {
    e.preventDefault();
    await doLoad();
  }

  async function doLoad() {
    const movies = await searchMovies(searchQuery);
    setResults(movies.results);
  }

  async function handleAddFavorite(favorite) {
    await createFavorites(favorite);
    // setFavorite();
  }

  async function handleFetchFavorites() {
    const favorites = await getFavorites(user.id);
    setFavorites(favorites);
  }

  return (
    <div>
      <form onSubmit={searchHandle}>
        <label>
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <button>Search Movies</button>
      </form>
      <div className="movie-posters">
        {results.map((result, i) => (
          <div key={result.title + i} className="movie">
            <Link to={`MovieDetails/${result.id}`}>
              <h3>{result.title}</h3>
              <img src={`https://image.tmdb.org/t/p/original/${result.poster_path}`} />
            </Link>
            <button
              onClick={() =>
                handleAddFavorite({
                  api_id: result.id,
                  title: result.original_title,
                  poster: result.poster_path,
                })
              }
            >
              Save to favs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
