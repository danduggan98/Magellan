import React from 'react';
import Banner from './components/banner';
import Recipe from './components/recipe';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './styles/App.css';

export default function App() {
  return (
    <div>
      <Router>

        <Banner />

        <Switch>
          <Route path={'/recipe/:recipeid'} component={Recipe} />
          <Route path={'/home'} component={Home} />
          <Route path={'/register'} component={Register} />
          <Route path={'/login'} component={Login} />
          <Route path={'/'}>
            <Redirect to={'/home'} />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}
