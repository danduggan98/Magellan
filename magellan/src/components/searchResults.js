import React, {Component} from 'react';
import SearchCard from './searchCard.js';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.data,
            limit: this.props.lmt
        };
    }

    render() {
        //See if there will be extra recipes for a new page
        const overflow = (this.state.results.length > this.state.limit);
        
        //Grab the recipes we will show, up to the given limit
        const res = Array.from(this.state.results);
        const visible = res.slice(0, this.state.limit);

        //Turn them into search cards
        const list = visible.map(recipe => (
            <SearchCard info={recipe} />
        ));

        return (
            <div>
                <h2>Results:</h2>
                <h3>{list}</h3>

                { overflow ?
                    <div>See more results</div>
                    : <p></p>
                }
            </div>
        );
    }
}

export default SearchResults;
