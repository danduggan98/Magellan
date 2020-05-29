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
            <div id='card'>
                 <a className='cardRecipeLink'
                    target='_blank'
                    rel='noopener noreferrer'
                    href={link}>
                    
                    <div id='cardInfo'>
                        <div id='cardRecipeName'>{data.recipeName}</div>
                        <div id='cardAuthor'>by {data.author}</div>
                        <div id='cardTotalTime'>{data.totalTime}</div>
                    </div>
                </a>
            </div>
        );
    }
}

export default SearchCard;
