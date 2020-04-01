import React, {Component} from 'react';
import SearchBar from './searchBar.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h2>Find your next meal!</h2>
                <SearchBar />
            </div>
        );
    }
}

export default Home;
