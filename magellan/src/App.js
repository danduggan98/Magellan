import React from 'react';
import Recipe from './components/recipe.js';
import Home from './components/home.js';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Router>
        <div id="logoBanner">
          <Link to='/home'
            style={{textDecoration: 'none'}}>
            MAGELLAN
          </Link>
        </div>
        <Switch>
          <Route path={'/recipe/:recipeid'} component={Recipe} />
          <Route path={'/home'} component={Home} />
          <Route path={'/'}>
            <Redirect to={'/home'} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
