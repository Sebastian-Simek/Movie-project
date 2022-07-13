import { useState, useContext, createContext } from 'react';
import { getUser } from './services/fetch-utils';

const DataContext = createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState(getUser());
  
  const stateAndSetters = {
    user, setUser
  };


  return <DataContext.Provider value={stateAndSetters}>
    {children}
  </DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}