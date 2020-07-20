import React, { FunctionComponent } from 'react';
import { SavedRecipe } from '../../../magellan';
//import '../styles/savedRecipeCard.css';

interface Props {
    info: SavedRecipe
}

const SavedRecipeCard: FunctionComponent<Props> = (props) => {
    const data = props.info;
    const link = `/recipe/${data._id}`;

    return (
        <div id='card'>
            <a className='cardRecipeLink'
                target='_blank'
                rel='noopener noreferrer'
                href={link}>

                <div id='cardContents'>
                    <div id='cardRecipeName'>
                        {data.recipeName}
                    </div>
                    { data.author
                        ? <div id='cardAuthor'>by {data.author}</div>
                        : <p></p>
                    }
                </div>
            </a>
        </div>
    );
}

export default SavedRecipeCard;
