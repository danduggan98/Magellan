import React, {Component} from 'react';
import SearchCard from './searchCard';
import { RecipeDataResult } from '../../../magellan'
import '../styles/searchResults.css';

interface Props {
    data: RecipeDataResult[]
}

interface State {
    results: RecipeDataResult[],
    maxResultsPerPage: number
}

export default class SearchResults extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            results: props.data,
            maxResultsPerPage: 9 //Arbitrary
        };
    }

    render() {
        //See if there will be extra recipes for a new page
        const overflow = (this.state.results.length > this.state.maxResultsPerPage);
        
        //Grab the recipes we will show, up to the given limit
        const res = Array.from(this.state.results);
        const visible = res.slice(0, this.state.maxResultsPerPage);

        //Turn them into search cards
        const list = visible.map(recipe => (
            <SearchCard info={recipe} />
        ));

        return (
            <div id='wrapper'>
                <div id='resultsContainer'>
                    <h2>Top Results:</h2>
                    <div id='resultsList'>
                        {list}
                    </div>

                    { overflow
                        ? <div>See more results</div>
                        : <p></p>
                    }
                </div>
            </div>
        );
    }
}
