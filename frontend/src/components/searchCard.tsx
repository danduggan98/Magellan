import React, { FunctionComponent } from 'react';
import { RecipeDataResult } from '../../../magellan';
import placeholderImg from './../images/food-placeholder.png';
import '../styles/searchCard.css';

interface Props {
    info: RecipeDataResult
}

const SearchCard: FunctionComponent<Props> = (props) => {
    const data = props.info;
    const link = `/recipe/${data._id}`;

    return (
        <div id='card'>
            <div id='cardContents'>
                <div id='cardInfo'>
                    <div id='cardRecipeName'>
                        <a className='cardRecipeLink'
                            target='_blank'
                            rel='noopener noreferrer'
                            href={link}>

                            {data.recipeName}
                            &nbsp;&nbsp;
                        </a>
                    </div>

                    { data.totalTime
                      ? <a className='cardRecipeLink'
                            target='_blank'
                            rel='noopener noreferrer'
                            href={link}>
                                
                            <div id='cardTotalTime'>
                                Total Time:&nbsp;
                                {data.totalTime}
                                &nbsp;&nbsp;
                            </div>
                        </a>
                      : <p className='invisibleElement'></p>
                    }
                </div>

                <a className='cardRecipeLink'
                    target='_blank'
                    rel='noopener noreferrer'
                    href={link}>

                    <div id='cardPhotoContainer'>
                        <img id='cardPhoto'
                            src={data.imageURL || placeholderImg}
                            alt=''>
                        </img>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default SearchCard;
