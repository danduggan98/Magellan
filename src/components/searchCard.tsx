import React, {Component} from 'react';
import { RecipeDataResult } from 'magellan';
import '../styles/searchCard.css';

interface Props {
    info: RecipeDataResult
}

interface State {
    recipe: RecipeDataResult
}

export default class SearchCard extends Component<Props, State> {
    constructor(props: Props) {
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
