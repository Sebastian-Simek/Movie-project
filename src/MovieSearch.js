import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getWatchList, searchMovies } from './services/fetch-utils';


export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [watchList, setWatchList] = useState('');
  const [results, setResults] = useState([]);

  async function searchHandle(e) {
    e.preventDefault();
    const movies = await searchMovies(searchQuery);
    setResults(movies);
  }
  console.log(searchQuery);


  return (
    <>   <div>MovieSearch</div>
      <form onSubmit={searchHandle}>
        <label>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </label>
        <button>Search Movies</button>
      </form></>
  );

}



