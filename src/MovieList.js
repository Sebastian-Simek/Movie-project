import React from 'react';

export default function MovieList({ favorites }) {
  console.log('from Movie List', favorites);
  return (
    <div>
      <p>hELLO</p>
      {favorites &&
        favorites.map((favorite, i) => <div key={favorite.id + i}>{favorite.title}</div>)}
    </div>
  );
}
