import React, { Component } from 'react';
import SearchCard from './searchCard.js';
import '../styles/searchResults.css';
class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.data,
            maxResultsPerPage: 9 //Arbitrary
        };
    }
    render() {
        //See if there will be extra recipes for a new page
        const overflow = (this.state.results.length > this.state.maxResultsPerPage);
        //Grab the recipes we will show, up to the given limit
        const res = Array.from(this.state.results);
        const visible = res.slice(0, this.state.maxResultsPerPage);
        //Turn them into search cards
        const list = visible.map(recipe => (React.createElement(SearchCard, { info: recipe })));
        return (React.createElement("div", { id: 'resultsContainer' },
            React.createElement("h2", null, "Top Results:"),
            React.createElement("div", { id: 'resultsList' }, list),
            overflow ?
                React.createElement("div", null, "See more results")
                : React.createElement("p", null)));
    }
}
export default SearchResults;
//# sourceMappingURL=searchResults.js.map