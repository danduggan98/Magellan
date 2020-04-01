import React, {Component} from 'react';
import BarLoader from 'react-spinners/BarLoader';
import SearchCard from './searchCard.js';
import '../styles/searchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'name',
            status: 1,
            input: '',
            results: [],
            loading: false
        };
    }

    //Launch a search in the server and store the results
    getResults = async () => {
        const fetchURL = `/search/${this.state.searchType}/${this.state.input}`;
        this.setState({ results: '', loading: true });

        const res = await fetch(fetchURL); //Execute the search
        const data = await res.json();

        //No search results
        if (data.error) {
            this.setState({ status: 0, loading: false });
        }
        //Create a list of items
        else {
            let itemNames = [];
            const vals = data.searchResults;
            for (let i = 0; i < vals.length; i++) {
                itemNames.push(vals[i]);
            }
            this.setState({ status: 1, loading: false, results: itemNames });
        }
    }

    //Save the user's current input in state
    updateInput = (vals) => {
        this.setState({ input: vals.target.value });
    }

    // Search bar - form takes an input and redirects to an invisible
    // iframe on the same page after querying the db and displaying 
    // the results below
    render() {
        const res = Array.from(this.state.results);
        const list = res.map(result => (
            <SearchCard info={result} />
        ));

        return (
            <div>
                <form
                    name='searchbar'
                    target='hiddenFrame'
                    onSubmit={this.getResults}>

                    <input
                        name='search'
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

                    <div id='loadingBar'>
                        <br></br>
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
                    { this.state.status ? 
                        <h2>{list}</h2>
                        : <h3>No results found. Try again</h3>
                    }
                </div>

                <iframe name='hiddenFrame' id='iframe' title='hidden'></iframe>
            </div>
        );
    }
}

export default SearchBar;
