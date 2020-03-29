import React, {Component} from 'react';
import SearchBar from './searchBar.js';
import SearchResults from './searchResults.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>WELCOME!</h1>
                <SearchBar />
                <SearchResults />
            </div>
        );
    }
}

export default Home;
