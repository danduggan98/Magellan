import React, { Component } from 'react';
import SearchCard from './searchCard';
import { RecipeDataResult } from '../../../magellan';
import '../styles/searchResults.css';

interface Props {
    data: RecipeDataResult[]
}

interface State {
    currentResults: JSX.Element[],
    numResults: number,
    numResultsPerPage: number,
    lastPage: number,
    currentPage: number
}

export default class SearchResults extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentResults: [],
            numResults: 0,
            numResultsPerPage: 5, //Arbitrary
            lastPage: 0,
            currentPage: 1
        };
    }

    //Returns the recipes to show on the current page
    updateCurrentResults = (): void => {
        console.log('updating current results');
        //Calculate the range of results to use
        const curPage = this.state.currentPage;
        const maxResults = this.state.numResultsPerPage;

        let firstIdx = (curPage - 1) * maxResults;
        let secondIdx = curPage * maxResults;

        console.log(firstIdx, secondIdx);

        //Turn them into search cards
        const visibleResults = this.props.data
            .slice(firstIdx, secondIdx)
            .map(recipe => (
                <SearchCard info={recipe} />
            )
        );

        this.setState({
            currentResults: visibleResults}, () => {
                console.log('visible results updated')
            }
        );
    }

    goToPreviousPage = (): void => {
        console.log('going to previous page')
        const curPage = this.state.currentPage;

        if (curPage > 1) {
            this.setState({
                currentPage: curPage - 1
            }, () => console.log('page num decremented')
            );
            this.updateCurrentResults();
        }
    }

    goToNextPage = (): void => {
        console.log('going to next page')
        const curPage = this.state.currentPage;
        const lastPage = this.state.lastPage;

        if (curPage < lastPage) {
            this.setState({
                currentPage: curPage + 1
            }, () => console.log('page num incremented')
            );
            this.updateCurrentResults();
        }
    }

    //When the component loads, calculate the number of pages needed
    componentDidMount() {
        const numResults = this.props.data.length;
        const pageDensity = this.state.numResultsPerPage;
        
        this.setState({
            numResults: numResults,
            lastPage: Math.ceil(numResults / pageDensity)
        });
        this.updateCurrentResults();
    }

    render() {
        console.log('rendering');
        return (
            <div id='wrapper'>
                <div id='topResultsLabel'>
                    Top Results:
                </div>

                <div id='resultsContainer'>
                    <div id='scrollLeftButton'>
                        { this.state.currentPage > 1
                            ? <button
                                className='scrollButton'
                                onClick={this.goToPreviousPage}
                              >◀</button>
                            : <div className='scrollPlaceholder'> </div>
                        }
                    </div>

                    <div id='resultsList'>
                        {this.state.currentResults}
                    </div>

                    <div id='scrollRightButton'>
                        { this.state.currentPage < this.state.lastPage
                            ? <button
                                className='scrollButton'
                                onClick={this.goToNextPage}
                              >▶</button>
                            : <div className='scrollPlaceholder'> </div>
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
