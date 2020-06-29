import React, {Component} from 'react';
import SearchCard from './searchCard';
import { RecipeDataResult } from '../../../magellan'
import '../styles/searchResults.css';

interface Props {
    data: RecipeDataResult[]
}

interface State {
    results: RecipeDataResult[],
    maxResultsPerPage: number,
    numResults: number,
    numPages: number,
    currentPage: number
}

export default class SearchResults extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            results: props.data,
            numResults: 0,
            maxResultsPerPage: 6, //Arbitrary
            numPages: 0,
            currentPage: 0
        };
    }

    componentDidMount() {
        //Calculate the number of pages needed
        const numResults = this.state.results.length;
        const pageDensity = this.state.maxResultsPerPage;
        
        this.setState({
            numResults: numResults,
            numPages: Math.ceil(numResults / pageDensity)
        });
    }

    render() {
        //Grab the recipes we will show, up to the given limit
        const res = Array.from(this.state.results);
        const visible = res.slice(0, this.state.maxResultsPerPage);

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

                <div id='numResults'>
                    <div>{this.state.numResults} results found</div>
                    <div>Viewing page {this.state.currentPage} of {this.state.numPages}</div>
                </div>
            </div>
        );
    }
}
