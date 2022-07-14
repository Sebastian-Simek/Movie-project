import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchSingleMovie } from './services/fetch-utils';

export default function MovieDetails() {
  const [singleMovie, setSingleMovie] = useState({});
  const { id } = useParams();
  console.log(singleMovie);

  useEffect(() => {
    doLoad();
  }, [id]); // eslint-disable-line

  async function doLoad() {
    const result = await searchSingleMovie(id);
    setSingleMovie(result);
  }

  return (
    <div className="movie-details">
      <h2>{singleMovie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/original/${singleMovie.poster_path}`} />
      <p>{singleMovie.overview}</p>
    </div>
  );
}
