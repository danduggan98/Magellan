import React, {Component} from 'react';
import SearchCard from './searchCard.js';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.data
        };
    }

    render() {
        const res = Array.from(this.state.results);
        const list = res.map(result => (
            <SearchCard info={result} />
        ));

        return (
            <div>
                <h2>Results:</h2>
                <h3>{list}</h3>
            </div>
        );
    }
}

export default SearchResults;
