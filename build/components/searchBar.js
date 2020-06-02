import React, { Component } from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import SearchResults from './searchResults.js';
import '../styles/searchBar.css';
class SearchBar extends Component {
    constructor(props) {
        super(props);
        //Launch a search in the server and store the results
        this.getResults = async () => {
            //Ensure they have entered something
            if (this.state.input) {
                //If so, querty the db
                const fetchURL = `/search/${this.state.searchType}/${this.state.input}/${this.state.maxResults}`;
                this.setState({
                    results: [],
                    resultsFound: true,
                    loading: true,
                    emptyInput: false
                });
                const res = await fetch(fetchURL); //Execute the search
                const data = await res.json();
                //No search results
                if (data.error) {
                    this.setState({ resultsFound: false, loading: false });
                }
                //Create a list of items
                else {
                    let items = [];
                    const vals = data.searchResults;
                    const numItems = vals.length;
                    for (let i = 0; i < numItems; i++) {
                        items.push(vals[i]);
                    }
                    this.setState({
                        resultsFound: true,
                        loading: false,
                        results: items
                    });
                }
            }
            else {
                this.setState({
                    emptyInput: true,
                    resultsFound: true,
                    results: []
                });
            }
        };
        //Save the user's current input in state
        this.updateInput = (val) => {
            this.setState({ input: val.target.value });
        };
        //Change the search type
        this.updateSearchType = (val) => {
            this.setState({ searchType: val.currentTarget.value });
        };
        this.state = {
            searchType: 'name',
            input: '',
            emptyInput: false,
            resultsFound: true,
            loading: false,
            results: [],
            maxResults: 36 //Arbitrary
        };
    }
    // Search bar - form accepts the search and queries the db
    render() {
        //CSS for loading bar
        const override = css `
            width: 285px;
            margin-top: 10px;
            margin-left: auto;
            margin-right: auto;
            background-color: lightgrey;
        `;
        return (React.createElement("div", { id: 'searchContainer' },
            React.createElement("div", { id: 'notice' }, "Find your next meal!"),
            React.createElement("form", { name: 'searchBar', target: 'hiddenFrame', onSubmit: this.getResults },
                React.createElement("div", { id: 'searchBarWrapper' },
                    React.createElement("input", { name: 'search', id: 'searchInput', type: 'text', autoComplete: 'off', placeholder: 'Search for recipes', onChange: this.updateInput }),
                    React.createElement("button", { type: 'submit', id: 'searchButton', className: 'fa fa-search' })),
                React.createElement("div", { id: 'searchType' },
                    "Search by:",
                    React.createElement("div", { id: 'searchTypeNameWrapper' },
                        React.createElement("input", { type: 'radio', id: 'searchTypeNameButton', name: 'searchType', value: 'name', onChange: this.updateSearchType, checked: this.state.searchType === 'name' ? true : false }),
                        React.createElement("label", { htmlFor: 'searchTypeNameButton' }, "Recipe Name")),
                    React.createElement("div", { id: 'searchTypeIngWrapper' },
                        React.createElement("input", { type: 'radio', id: 'searchTypeIngButton', name: 'searchType', value: 'ing', onChange: this.updateSearchType, checked: this.state.searchType === 'ing' ? true : false }),
                        React.createElement("label", { htmlFor: 'searchTypeIngButton' }, "Ingredient"))),
                React.createElement("div", { id: 'inputReminder' }, this.state.emptyInput ?
                    React.createElement("h4", null, "Please enter something to search")
                    : React.createElement("p", null)),
                React.createElement("div", { id: 'loadingBar' }, this.state.loading ?
                    React.createElement("div", null,
                        "Searching...",
                        React.createElement(BarLoader, { height: 6, css: override }))
                    : React.createElement("p", null))),
            React.createElement("div", { id: 'results' },
                !this.state.resultsFound ?
                    React.createElement("div", { id: 'failNotice' }, "No results found. Try again")
                    : React.createElement("p", null),
                this.state.results.length ?
                    React.createElement(SearchResults, { data: this.state.results })
                    : React.createElement("p", null)),
            React.createElement("iframe", { name: 'hiddenFrame', id: 'iframe', title: 'hidden' })));
    }
}
export default SearchBar;
