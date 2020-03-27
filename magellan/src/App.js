import React from 'react';
import Recipe from './components/recipe.js';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/recipe/:recipeid'} component={Recipe} />
      </Switch>
    </Router>
  );
}
