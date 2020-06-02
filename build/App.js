import React from 'react';
import Recipe from './components/recipe.js';
import Home from './components/home.js';
import Login from './components/login.js';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './styles/App.css';
export default function App() {
    return (React.createElement("div", null,
        React.createElement(Router, null,
            React.createElement("div", { id: 'logoBanner' },
                React.createElement(Link, { to: '/home', className: 'logo' }, "MAGELLAN"),
                React.createElement(Link, { to: '/login', className: 'loginButton' }, "Log In")),
            React.createElement(Switch, null,
                React.createElement(Route, { path: '/recipe/:recipeid', component: Recipe }),
                React.createElement(Route, { path: '/home', component: Home }),
                React.createElement(Route, { path: '/login', component: Login }),
                React.createElement(Route, { path: '/' },
                    React.createElement(Redirect, { to: '/home' }))))));
}
