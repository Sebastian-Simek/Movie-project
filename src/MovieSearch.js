import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createFavorites, searchMovies, getFavorites } from './services/fetch-utils';
import { useDataContext } from './ContextProvider';

export default function MovieSearch() {
  const { favorites, handleDelete, handleAddFavorite, favorite } = useDataContext();
  const [searchQuery, setSearchQuery] = useState('');
  // const [watchList, setWatchList] = useState('');
  const [results, setResults] = useState([]);


  async function searchHandle(e) {
    e.preventDefault();
    await doLoad();
  }

  async function doLoad() {
    const movies = await searchMovies(searchQuery);
    const moviesWithFavorites = movies.results.map(movie => {
      const favoriteId = favorites.find(favorite => Number(favorite.api_id) === Number(movie.id));
      if (favoriteId){
        return { ...movie, favoriteId };
      } else {
        return movie;
      }
    });
    setResults(moviesWithFavorites);
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
              {result.favoriteId ? 'remove Fav' : 'Save to favs'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
