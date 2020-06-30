import React, { Component } from 'react';
import SearchCard from './searchCard';
import { RecipeDataResult } from '../../../magellan'
import '../styles/searchResults.css';

interface Props {
    data: RecipeDataResult[]
}

interface State {
    results: RecipeDataResult[],
    numResults: number,
    numResultsPerPage: number,
    lastPage: number,
    currentPage: number
}

export default class SearchResults extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            results: props.data,
            numResults: 0,
            numResultsPerPage: 5, //Arbitrary
            lastPage: 0,
            currentPage: 1
        };
    }

    //Returns the recipes to show on the current page
    updateCurrentResults = (): JSX.Element[] => {

        //Calculate the range of results to use
        const curPage = this.state.currentPage;
        const maxResults = this.state.numResultsPerPage;

        let firstIdx = (curPage - 1) * maxResults;
        let secondIdx = curPage * maxResults;

        console.log(firstIdx, secondIdx);

        //Turn them into search cards
        const res = this.state.results;
        const visibleResults = res.slice(firstIdx, secondIdx);

        return visibleResults.map(recipe => (
            <SearchCard info={recipe} />
        ));
    }

    goToPreviousPage = () => {
        const curPage = this.state.currentPage;

        if (curPage > 1) {
            this.setState({
                currentPage: curPage - 1
            });
        }
    }

    goToNextPage = () => {
        const curPage = this.state.currentPage;
        const lastPage = this.state.lastPage;

        if (curPage < lastPage) {
            this.setState({
                currentPage: curPage + 1
            });
        }
    }

    //When the component loads, calculate the number of pages needed
    componentDidMount() {
        const numResults = this.state.results.length;
        const pageDensity = this.state.numResultsPerPage;
        
        this.setState({
            numResults: numResults,
            lastPage: Math.ceil(numResults / pageDensity)
        });
    }

    render() {
        const currentResults = this.updateCurrentResults();

        return (
            <div id='wrapper'>
                <div id='topResultsLabel'>
                    Top Results:
                </div>

                <div id='resultsContainer'>
                    <div id='scrollLeftButton'>
                        { this.state.currentPage > 1
                            ? <button onClick={this.goToPreviousPage}>◀</button>
                            : <p> </p>
                        }
                    </div>

                    <div id='resultsList'>
                        {currentResults}
                    </div>

                    <div id='scrollRightButton'>
                        { this.state.currentPage < this.state.lastPage
                            ? <button onClick={this.goToNextPage}>▶</button>
                            : <p> </p>
                        }
                    </div>
                </div>

                <div id='pageDetails'>
                    <div>Viewing page {this.state.currentPage} of {this.state.lastPage}</div>
                </div>
            </div>
        );
    }
}
