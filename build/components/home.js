import React, { Component } from 'react';
import SearchBar from './searchBar';
export default class Home extends Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(SearchBar, null)));
    }
}
