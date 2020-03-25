import React from 'react';
import Recipe from './recipe.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/recipe/:recipeid' component={Recipe} />
      </Switch>
    </Router>
  );
}
