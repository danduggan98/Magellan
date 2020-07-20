import React, { FunctionComponent } from 'react';
import { SavedRecipe } from '../../../magellan';
import '../styles/savedRecipeCard.css';

interface Props {
    info: SavedRecipe
}

const SavedRecipeCard: FunctionComponent<Props> = (props) => {
    const data = props.info;
    const link = `/recipe/${data._id}`;

    return (
        <div id='savedRecipeCard'>
            <a className='savedRecipeCardLink'
                target='_blank'
                rel='noopener noreferrer'
                href={link}>

                <div id='savedRecipeCardContents'>
                    <div id='savedRecipeCardName'>
                        {data.recipeName}
                    </div>
                    { data.author
                        ? <div id='savedRecipeCardAuthor'>by {data.author}</div>
                        : <p></p>
                    }
                </div>
            </a>
        </div>
    );
}

export default SavedRecipeCard;
