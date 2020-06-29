import React, {Component} from 'react';
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
    numPages: number,
    currentPage: number
}

export default class SearchResults extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            results: props.data,
            numResults: 0,
            numResultsPerPage: 5, //Arbitrary
            numPages: 0,
            currentPage: 0
        };
    }

    //When the component loads, calculate the number of pages needed
    componentDidMount() {
        const numResults = this.state.results.length;
        const pageDensity = this.state.numResultsPerPage;
        
        this.setState({
            numResults: numResults,
            numPages: Math.ceil(numResults / pageDensity)
        });
    }

    render() {
        //Grab the recipes for this page
        let curPage = this.state.currentPage;
        let maxResults = this.state.numResultsPerPage;

        const visible = (this.state.results).slice(
            (curPage * maxResults),
            ((curPage + 1) * maxResults)
        );

        //Turn them into search cards
        const list = visible.map(recipe => (
            <SearchCard info={recipe} />
        ));

        return (
            <div id='wrapper'>
                <div id='topResultsLabel'>
                    Top Results:
                </div>

                <div id='resultsContainer'>
                    <div id='scrollLeftButton'>
                        { this.state.currentPage > 0
                            ? <span>◀</span>
                            : <p> </p>
                        }
                    </div>

                    <div id='resultsList'>
                        {list}
                    </div>

                    <div id='scrollRightButton'>
                        { this.state.currentPage < this.state.numPages
                            ? <span>▶</span>
                            : <p> </p>
                        }
                    </div>
                </div>

                <div id='pageDetails'>
                    <div>Viewing page {this.state.currentPage + 1} of {this.state.numPages}</div>
                </div>
            </div>
        );
    }
}
