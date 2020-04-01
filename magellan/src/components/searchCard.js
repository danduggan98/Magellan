import React, {Component} from 'react';
import '../styles/searchCard.css';

class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: props.info
        };
    }

    render() {
        const data = this.state.recipe;
        const link = `/recipe/${data._id}`;

        return (
            <div id='card'>
                <div id='recipeName'>
                    <a className='recipeLink'
                       href={link}>
                        {data.recipeName}
                    </a>
                </div>
                <div id='author'>by {data.author}</div>
                <div id='totalTime'>{data.totalTime}</div>
            </div>
        );
    }
}

export default SearchCard;
