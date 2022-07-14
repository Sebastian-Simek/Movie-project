import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createFavorites, getWatchList, searchMovies } from './services/fetch-utils';
import { useDataContext } from './ContextProvider';

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [watchList, setWatchList] = useState('');
  const [results, setResults] = useState([]);
  const { user } = useDataContext();
  const [favorite, setFavorite] = useState('');


  async function searchHandle(e) {
    e.preventDefault();
    await doLoad();
  }

  async function doLoad() {
    const movies = await searchMovies(searchQuery);
    setResults(movies.results);
  }

  // const favorites = {
  //   api_id: results.id,
  //   title: results.original_title,
  //   id: user.id, 
  //   poster: results.poster_path
  // };


  async function handleAddFavorite() {
    await createFavorites({
      api_id: results.id,
      title: results.original_title,
      id: user.id, 
      poster: results.poster_path
    });
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
            <button onClick={handleAddFavorite} >Add to Favs</button>
          </div>
        ))}
      </div>
    </div>
  );
}
