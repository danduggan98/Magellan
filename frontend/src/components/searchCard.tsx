import React, { FunctionComponent } from 'react';
import { RecipeDataResult } from '../../../magellan';
import '../styles/searchCard.css';

interface Props {
    info: RecipeDataResult
}

const SearchCard: FunctionComponent<Props> = (props) => {
    const data = props.info;
    const link = `/recipe/${data._id}`;

    //Select the appropriate class so we can give each source a unique color
    let src = '';
        
    switch(data.source) {
        case ("Food Network"):
            src = "FNsource";
            break;
        case ("Taste of Home"):
            src = "TOHsource";
            break;
    }

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
                            { data.author
                              ? <div id='cardAuthor'>by {data.author}</div>
                              : <p></p>
                            }

                            <div id='tertiaryDetails'>
                                { data.source
                                  ? <div id='cardSource' className={src}>
                                        from {data.source}
                                    </div>
                                  : <p></p>
                                }

                                { data.totalTime
                                    ? <div id='cardTotalTime'>{data.totalTime}</div>
                                    : <p></p>
                                }
                                
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

export default SearchCard;
