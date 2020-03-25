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
        <Route path="/recipe">
          <Recipe id='5e61c282be6ab70df4adad81'/>
        </Route>
      </Switch>
    </Router>
  );
}
