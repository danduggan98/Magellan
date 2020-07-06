import React, {Component} from 'react';
import { RecipeDataResult } from '../../../magellan';
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
            <div id='card' className='expandableCard'>
                <a className='cardRecipeLink'
                    target='_blank'
                    rel='noopener noreferrer'
                    href={link}>
                    <div id='cardContents'>
                        <div id='cardInfo'>
                            <div id='cardRecipeName'>{data.recipeName}</div>
                            <div id='secondaryDetails'>
                                <div id='cardAuthor'>by {data.author}</div>
                                <div id='tertiaryDetails'>
                                    <div id='cardSource'>from {data.source}</div>
                                    <div id='cardTotalTime'>{data.totalTime}</div>
                                </div>
                            </div>
                        </div>
                        { data.imageURL
                            ? <img id='cardPhoto' src={data.imageURL} alt=''></img>
                            : <p></p>
                        }
                    </div>
                </a>
            </div>
        );
    }
}
