import React, {Component} from 'react';
import BarLoader from 'react-spinners/BarLoader';
import SearchCard from './searchCard.js';

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
        const res = await fetch(fetchURL);
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
                        type='text'
                        autoComplete='off'
                        placeholder='Search for recipes'
                        name='search'
                        onChange={this.updateInput}>
                    </input>

                    <button type='submit' id='searchButton'className='fa fa-search'></button>

                    <div name='loadingBar'>
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

                { this.state.status ? 
                    <h2>{list}</h2>
                    : <h3>No results found. Try again</h3>
                }

                <iframe name='hiddenFrame' title='hidden' width='0' height='0' border='0' style={{display: 'none'}}></iframe>
            </div>
        );
    }
}

export default SearchBar;
