import React, { Component } from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import SearchResults from './searchResults';
import { RecipeDataResult } from '../../../magellan';
import '../styles/searchBar.css';

//Define local types

export type SearchType = 'name' | 'ing';

interface State {
    searchType:   SearchType,
    input:        string,
    emptyInput:   boolean,
    resultsFound: boolean,
    loading:      boolean,
    results:      RecipeDataResult[],
    maxResults:   number
}

export default class SearchBar extends Component {
    state: State = {
        searchType:   'name',
        input:        '',
        emptyInput:   false,
        resultsFound: true,
        loading:      false,
        results:      [],
        maxResults:   60 //Arbitrary
    };

    //Launch a search in the server and store the results
    getResults = async () => {

        //Make sure they entered something
        if (this.state.input) {
            
            //Query the db
            const fetchURL = `/api/search/${this.state.searchType}/${this.state.input}/${this.state.maxResults}`;
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
                this.setState({
                    resultsFound: false,
                    loading: false
                });
            }

            //Store the results in state
            else {
                this.setState({
                    resultsFound: true,
                    loading: false,
                    results: data.searchResults
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
    updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ input: event.currentTarget.value });
    }

    //Change the search type when the radio buttons are clicked
    updateSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchType: event.currentTarget.value });
    }

    // Search bar - form accepts the search and queries the db
    render() {
        //CSS for loading bar
        const override = css`
            width: 300px;
            margin: 10px auto 0px auto;
            background-color: lightgrey;
            border: none;
            border-radius: 10px;
        `;

        return (
            <div id='searchBarWrapper'>
                <div id='searchContainer'>
                    <div id='title'>
                        Find your next meal
                    </div>

                    <form
                        name='searchBar'
                        target='hiddenFrame'
                        onSubmit={this.getResults}>

                        <div id='searchBarWrapper'>
                            <input
                                name='search'
                                id='searchInput'
                                type='text'
                                autoComplete='off'
                                placeholder='Search for recipes here'
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

                            <div id='searchTypeNameWrapper'>
                                <input
                                    type='radio'
                                    id='searchTypeNameButton'
                                    name='searchType'
                                    value='name'
                                    onChange={this.updateSearchType}
                                    checked={this.state.searchType === 'name'}>
                                </input>

                                <label htmlFor='searchTypeNameButton'>Recipe Name</label>
                            </div>

                            <div id='searchTypeIngWrapper'>
                                <input
                                    type='radio'
                                    id='searchTypeIngButton'
                                    name='searchType'
                                    value='ing'
                                    onChange={this.updateSearchType}
                                    checked={this.state.searchType === 'ing'}>
                                </input>
                            
                                <label htmlFor='searchTypeIngButton'>Ingredients</label>
                            </div>
                        </div>

                        <div id='inputReminder' className='searchNotice'>
                            { this.state.emptyInput
                              ? <div>Please enter something to search</div>
                              : <p className='invisibleElement'></p>
                            }
                        </div>

                        <div id='loadingBar' className='searchNotice'>
                            { this.state.loading
                              ? <div>
                                    Searching...
                                    <BarLoader height={9} css={override}/>
                                </div>
                              : <p className='invisibleElement'></p>
                            }
                        </div>
                    </form>
                
                    {/* Form redirects to this invisible iframe, keeping it on the same page */}
                    <iframe name='hiddenFrame' className='invisibleElement' title='hidden'></iframe>
                </div>

                <div id='results'>
                    { !this.state.resultsFound
                      ? <div id='failNotice' className='searchNotice'>No results found. Please try again</div>
                      : <p className='invisibleElement'></p>
                    }
                    { this.state.results.length
                      ? <SearchResults data={this.state.results}/>
                      : <p className='invisibleElement'></p>
                    }
                </div>
            </div>
        );
    }
}
