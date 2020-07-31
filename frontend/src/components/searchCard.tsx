import React, { FunctionComponent } from 'react';
import { RecipeDataResult } from '../../../magellan';
import '../styles/searchCard.css';

interface Props {
    info: RecipeDataResult
}

const SearchCard: FunctionComponent<Props> = (props) => {
    const data = props.info;
    const link = `/recipe/${data._id}`;

    return (
        <div id='card'>
            <a className='cardRecipeLink'
                target='_blank'
                rel='noopener noreferrer'
                href={link}>

                <div id='cardContents'>
                    <div id='cardInfo'>
                        <div id='cardRecipeName'>{data.recipeName}</div>
                        { data.totalTime
                          ? <div id='cardTotalTime'>Total Time: {data.totalTime}</div>
                          : <p className='invisibleElement'></p>
                        }
                    </div>

                    <div id='cardPhotoContainer'>
                        { data.imageURL
                          ? <img id='cardPhoto' src={data.imageURL} alt=''></img>
                          : <p className='invisibleElement'></p>
                        }
                    </div>
                </div>
            </a>
        </div>
    );
}

export default SearchCard;
