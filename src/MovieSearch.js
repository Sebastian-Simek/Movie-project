import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createFavorites, searchMovies } from './services/fetch-utils';
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


  async function handleAddFavorite(favorite) {
    await createFavorites(favorite);
    setFavorite();
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
            <button onClick={() => handleAddFavorite({
              api_id: result.id,
              title: result.original_title,
              poster: result.poster_path
            })} >Add to Favs</button>
          </div>
        ))}
      </div>
    </div>
  );
}
