import { useState } from 'react';

const oldFavorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');

export function useFavorties() {
  const [favorties, setFavorites] = useState(oldFavorites);

  function handleFavorite(id) {
    let result;
    const indexOf = favorties.indexOf(id);
    if (indexOf !== -1) {
      result = [...favorties.slice(0, indexOf), ...favorties.slice(indexOf + 1)];
    } else {
      result = [...favorties, id];
    }

    setFavorites(result);
    localStorage.setItem('favorites', JSON.stringify(result));
  }

  return [favorties, handleFavorite];
}
