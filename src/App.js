import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import MovieSearch from './MovieSearch';
import WatchList from './WatchList';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
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
