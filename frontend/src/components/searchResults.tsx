import React, {Component} from 'react';
import SearchCard from './searchCard';
import { RecipeDataResult } from '../../../magellan'
import '../styles/searchResults.css';

interface Props {
    data: RecipeDataResult[]
}

interface State {
    results: RecipeDataResult[],
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
            results: props.data,
            currentResults: [],
            numResults: 0,
            numResultsPerPage: 5, //Arbitrary
            lastPage: 0,
            currentPage: 1
        };
    }

    //Grab the recipes for this page
    updateCurrentResults = () => {
        let curPage = this.state.currentPage;
        let maxResults = this.state.numResultsPerPage;
        let res = this.state.results;

        const visibleResults = res.slice(
            (curPage * maxResults),
            ((curPage + 1) * maxResults)
        );

        //Turn them into search cards
        const list = visibleResults.map(recipe => (
            <SearchCard info={recipe} />
        ));

        this.setState({
            currentResults: list
        });
    }

    goToPreviousPage = () => {
        const curPage = this.state.currentPage;

        if (curPage > 0) {
            this.setState({
                currentPage: curPage - 1
            });
        }
        this.updateCurrentResults();
    }

    goToNextPage = () => {
        const curPage = this.state.currentPage;
        const lastPage = this.state.lastPage;

        if (curPage < lastPage) {
            this.setState({
                currentPage: curPage + 1
            });
        }
        this.updateCurrentResults();
    }

    //When the component loads, calculate the number of pages needed
    componentDidMount() {
        const numResults = this.state.results.length;
        const pageDensity = this.state.numResultsPerPage;
        
        this.setState({
            numResults: numResults,
            lastPage: Math.ceil(numResults / pageDensity)
        });
        this.updateCurrentResults();
    }

    render() {
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
                        {this.state.currentResults}
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
