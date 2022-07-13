import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import MovieSearch from './MovieSearch';
import WatchList from './WatchList';
import { useDataContext } from './ContextProvider';
import { logOut } from './services/fetch-utils';

import './App.css';

export default function App() {
  // const { user, setUser } = useDataContext();
  // console.log(user);
  return (
    <Router>
      <div className="App">
        <nav>
          <div className="links">
            <ul>
              <li>
                <Link to="/AuthPage">Login</Link>
              </li>
              <li>
                <Link to="/MovieSearch">Movies</Link>
              </li>
              <li>
                <Link to="/WatchList">Watch List</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/AuthPage">
            <AuthPage />
          </Route>
          <Route exact path="/MovieSearch">
            <MovieSearch />
          </Route>
          <Route exact path="/WatchList">
            <WatchList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
