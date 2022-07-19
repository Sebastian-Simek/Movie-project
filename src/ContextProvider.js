import { useState, useContext, createContext, useEffect } from 'react';
import { getUser, removeFavorite, getFavorites, createFavorites } from './services/fetch-utils';

const DataContext = createContext();

export function ContextProvider(props) {
  const [user, setUser] = useState(getUser());
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState({});
  console.log('user', user);
  async function handleFetchFavorites() {
    const favorites = await getFavorites(user.id);
    setFavorites(favorites);
  }
  async function handleAddFavorite(favorite) {
    await createFavorites(favorite);
    setFavorite(favorite);
    console.log('clicking');
    handleFetchFavorites();
    // setFavorite();
  }

  async function handleDelete(id) {
    await removeFavorite(id);
    const updateFavorites = await getFavorites();
    setFavorites(updateFavorites);
    handleFetchFavorites;
  }

  useEffect(() => {
    if (user) handleFetchFavorites();
  }, [user]); //eslint-disable-line

  const stateAndSetters = {
    user,
    setUser,
    favorites,
    handleDelete,
    handleAddFavorite,
    
    
  };


  return <DataContext.Provider value={stateAndSetters}>
    {props.children}
  </DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}