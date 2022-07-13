import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getWatchList, searchMovies } from './services/fetch-utils';

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [watchList, setWatchList] = useState('');
  const [results, setResults] = useState([]);
  console.log(results);

  // useEffect(() => {
  //   doLoad();
  // }, []); //eslint-disable-line

  async function searchHandle(e) {
    e.preventDefault();
    await doLoad();
  }

  async function doLoad() {
    const movies = await searchMovies(searchQuery);
    setResults(movies.results);
  }

  return (
    <>
      <div>MovieSearch</div>
      <form onSubmit={searchHandle}>
        <label>
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <button>Search Movies</button>
      </form>
      <div>
        {results.map((result, i) => (
          <div key={result.title + i}>
            <h3>{result.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
