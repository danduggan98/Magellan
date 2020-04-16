import React, {Component} from 'react';
import '../styles/searchCard.css';

class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: this.props.info
        };
    }

    render() {
        const data = this.state.recipe;
        const link = `/recipe/${data._id}`;

        return (
            <a className='recipeLink'
            target='_blank'
            rel='noopener noreferrer'
            href={link}>
                <div id='card'>
                    {data.recipeName}
                    <div id='recipeName'></div>
                    <div id='author'>by {data.author}</div>
                    <div id='totalTime'>{data.totalTime}</div>
                </div>
            </a>
        );
    }
}

export default SearchCard;
