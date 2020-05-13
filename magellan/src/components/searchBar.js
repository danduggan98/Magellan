import React, {Component} from 'react';
import BarLoader from 'react-spinners/BarLoader';
import SearchResults from './searchResults.js';
import '../styles/searchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'name',
            input: '',
            emptyInput: false,
            resultsFound: true,
            loading: false,
            results: []
        };
    }

    //Launch a search in the server and store the results
    getResults = async () => {

        //Ensure they have entered something
        if (this.state.input) {

            //If so, querty the db
            const fetchURL = `/search/${this.state.searchType}/${this.state.input}`;
            this.setState({
                results: [],
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
                resultsFound: true, //Hide this notice if last search found nothing
                results: []
            });
        }
    }

    //Save the user's current input in state
    updateInput = (val) => {
        this.setState({ input: val.target.value });
    }

    //Change the search type
    updateSearchType = (val) => {
        this.setState({ searchType: val.currentTarget.value });
    }

    // Search bar - form accepts the search and queries the db
    render() {
        const limit = 9; //Max number of recipes to print

        return (
            <div id='searchContainer'>
                <div id="notice">
                    Find your next meal!
                </div>

                <form
                    name='searchBar'
                    target='hiddenFrame'
                    onSubmit={this.getResults}>

                    <div id="searchBarWrapper">
                        <input
                            name='search'
                            id='searchInput'
                            type='text'
                            autoComplete='off'
                            placeholder='Search for recipes'
                            onChange={this.updateInput}>
                        </input>

                        <button
                            type='submit'
                            id='searchButton'
                            className='fa fa-search'>
                        </button>
                    </div>
                    
                    <div id='searchType'>
                        Search by:
                        <input
                            type='radio'
                            id='searchTypeName'
                            name='searchType'
                            value='name'
                            onChange={this.updateSearchType}
                            checked={this.state.searchType === 'name' ? true : false}>
                        </input>

                        <label htmlFor="searchTypeName">Recipe Name</label>

                        <input
                            type='radio'
                            id='searchTypeIng'
                            name='searchType'
                            value='ing'
                            onChange={this.updateSearchType}
                            checked={this.state.searchType === 'ing' ? true : false}>
                        </input>
                        
                        <label htmlFor="searchTypeIng">Ingredient</label>
                    </div>

                    <div id='inputReminder'>
                        { this.state.emptyInput ?
                            <h4>Please enter something to search</h4>
                            : <p></p>
                        }
                    </div>

                    <div id='loadingBar'>
                        { this.state.loading ? 
                            <div>
                                Searching...
                                <BarLoader />
                            </div>
                            : <p></p>
                        }
                    </div>
                </form>
                
                <div id='results'>
                    { !this.state.resultsFound ?
                        <h3>No results found. Try again</h3>
                        : <p></p>
                    }
                    { this.state.results.length ?
                        <SearchResults data={this.state.results} lmt={limit} />
                        : <p></p>
                    }
                </div>

                {/* Form redirects to this invisible iframe, keeping it on the same page */}
                <iframe name='hiddenFrame' id='iframe' title='hidden'></iframe>
            </div>
        );
    }
}

export default SearchBar;
