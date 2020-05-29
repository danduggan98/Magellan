import React from 'react';
import Recipe from './components/recipe.js';
import Home from './components/home.js';
import Login from './components/login.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import './styles/App.css';

export default function App() {
  return (
    <div>
      <Router>

        <div id='logoBanner'>
          <Link to='/home' className='logo'>
            MAGELLAN
          </Link>

          <Link to='/login' className='loginButton'>
            Log In
          </Link>
        </div>

        <Switch>
          <Route path={'/recipe/:recipeid'} component={Recipe} />
          <Route path={'/home'} component={Home} />
          <Route path={'/login'} component={Login} />
          <Route path={'/'}>
            <Redirect to={'/home'} />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}
