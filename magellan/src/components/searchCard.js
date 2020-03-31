import React, {Component} from 'react';

class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: props.info
        };
    }

    render() {
        const data = this.state.recipe;
        
        return (
            <div id='card'>
                <h5>{data.recipeName}</h5>
            </div>
        );
    }
}

export default SearchCard;
