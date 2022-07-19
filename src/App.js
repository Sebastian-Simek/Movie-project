import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import MovieSearch from './MovieSearch';
import Favorites from './Favorites';
import { ContextProvider, useDataContext } from './ContextProvider';
import { logOut } from './services/fetch-utils';

import './App.css';
import MovieDetails from './MovieDetails';

export default function App() {
  const { user, setUser } = useDataContext();

  async function handleLogOut() {
    await logOut();

    setUser('');
  }

  return (
    <ContextProvider>
      <Router>
        <div className="App">
          <nav>
            <div className="links">
              <ul>
                <li>
                  <Link to="/MovieSearch">Movies</Link>
                </li>
                <li>
                  <Link to="/Favorites">Favorites</Link>
                </li>
                {user && <button onClick={handleLogOut}>Logout</button>}
              </ul>
            </div>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              {!user ? <AuthPage /> : <Redirect to="/MovieSearch" />}
            </Route>
            <Route exact path="/MovieSearch">
              {user ? <MovieSearch /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/Favorites">
              {user ? <Favorites /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/MovieDetails/:id">
              <MovieDetails />
            </Route>
          </Switch>
        </div>
      </Router>
    </ContextProvider>
  );
}
