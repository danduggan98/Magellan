import React, { Component, FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/recipe.css';
import { RouteComponentProps } from 'react-router-dom';
import { RecipeData } from 'magellan';

//Define local types

interface ArrayToListProps {
    list:    string[][],
    ordered: boolean
}

interface RecipeProps {
    id: string
}

interface State {
    recipeFound:  boolean,
    recipeID:     string,
    URL:          string,
    imageURL:     string,
    author:       string,
    recipeName:   string,
    difficulty:   string | undefined,
    totalTime:    string | undefined,
    prepTime:     string | undefined,
    inactiveTime: string | undefined,
    activeTime:   string | undefined,
    cookTime:     string | undefined,
    yield:        string | undefined,
    ingredients:  string[][],
    directions:   string[][],
    source:       string | undefined
}

//Parse an array of ingredients or directions into a JSX list
const ArrayToList: FunctionComponent<ArrayToListProps> = (props) => {
    let items: JSX.Element[] = [];

    //Iterate through each section
    for (let i = 0; i < props.list.length; i++) {
        let section: JSX.Element[] = [];
        let itemList = props.list[i];

        //Store each item in the inner array as an HTML list item
        for (let j = 1; j < itemList.length; j++) { //Start at j = 1 to skip the header
            let next = itemList[j];
            section.push (
                <li key={next}>
                    {next}
                </li>
            );
        }

        //Print the section header if noteworthy
        const header = itemList[0];

        if (header !== 'main') {
            items.push (
                <div className='sectionHeader'
                    key={header}>
                    {header}
                </div>
            );
        }

        //Print the list of items
        items.push (
            <div className='sectionData'>
                { props.ordered
                  ? <ol key={section.toString()}>
                        {section}
                    </ol>
                  : <ul key={section.toString()}>
                        {section}
                    </ul>
                }
            </div>
        );
    }

    return (
        <div>{items}</div>
    );
}

//Display full recipe data
export default class Recipe extends Component<RouteComponentProps<RecipeProps>, State> {
    constructor(props: RouteComponentProps<RecipeProps>) {
        super(props);
        this.state = {
            recipeFound:  true,
            recipeID:     props.match.params.id, //URL parameter
            URL:          '',
            imageURL:     '',
            author:       '',
            recipeName:   '',
            difficulty:   '',
            totalTime:    '',
            prepTime:     '',
            inactiveTime: '',
            activeTime:   '',
            cookTime:     '',
            yield:        '',
            ingredients:  [],
            directions:   [],
            source:       ''
        };
    }

    //Gather data from server JSON response
    async componentDidMount() {
        const res = await fetch('/recipe/' + this.state.recipeID);
        const data: RecipeData = await res.json();

        //Recipe not found
        if (data.error) {
            this.setState({ recipeFound: false });
        }
        //Recipe found
        else {
            this.setState({
                URL:          data.URL,
                imageURL:     data.imageURL,
                author:       data.author,
                recipeName:   data.recipeName,
                difficulty:   data.difficulty,
                totalTime:    data.totalTime,
                prepTime:     data.prepTime,
                inactiveTime: data.inactiveTime,
                activeTime:   data.activeTime,
                cookTime:     data.cookTime,
                yield:        data.yield,
                ingredients:  data.ingredients,
                directions:   data.directions,
                source:       data.source
            });
        }
    }

    render() {
        //Recipe not found
        if (!this.state.recipeFound) {
            return (
                <div id='notFoundNotice'>
                    Recipe not found!
                    Please try again
                </div>
            );
        }
        //Recipe found
        else {
            return (
                <div>
                    { this.state.recipeName
                      ? <Helmet>
                            <title>{"Magellan - " + this.state.recipeName}</title>
                        </Helmet>
                      : <Helmet>
                            <title>{"Magellan"}</title>
                        </Helmet>
                    }

                    <div id='header'>
                        <div id='recipeName'>
                            {this.state.recipeName}
                        </div>

                        <div id='author'>
                            by {this.state.author}
                        </div>

                        <div id='source'>
                            Courtesy of
                            <span id='sourceText'>
                                {this.state.source}
                            </span>
                        </div>
                    </div>

                    <div id='image'>
                        { this.state.imageURL
                          ? <img src={this.state.imageURL} alt='' width='600'></img>
                          : <p className='invisibleElement'></p>
                        }

                        <div id='sourceLink'>
                            <a target='_blank' rel='noopener noreferrer' href={this.state.URL}>Original Recipe</a>
                        </div>
                    </div>
                    
                    <div id='details'>
                        <div id='detailsLeft'>
                            <div id='difficulty'>
                                Difficulty:
                                <span id='difficultyText'>
                                    {this.state.difficulty}
                                </span>
                            </div>
                            
                            <div id='yield'>
                                Yield:
                                <span id='yieldText'>
                                    {this.state.yield}
                                </span>
                            </div>
                        </div>

                        <div id='times'>
                            <div id='totalTime'>
                                Total Time:
                                <span id='totalTimeText'>
                                    {this.state.totalTime}
                                </span>
                            </div>

                            <div id='timesList'>
                                <ul>
                                    <div id='prepTime'>
                                        { this.state.prepTime
                                          ? <li>
                                                <span id='prepTimeText'>
                                                    {this.state.prepTime}
                                                </span>
                                                prep time
                                            </li>
                                          : <p className='invisibleElement'></p>
                                        }
                                    </div>
                                    
                                    <div id='cookTime'>
                                        { this.state.cookTime
                                          ? <li>
                                                <span id='cookTimeText'>
                                                    {this.state.cookTime}
                                                </span>
                                                cook time
                                            </li>
                                          : <p className='invisibleElement'></p>
                                        }
                                    </div>
                                    
                                    <div id='activeTime'>
                                        { this.state.activeTime
                                          ? <li>
                                                <span id='activeTimeText'>
                                                    {this.state.activeTime}
                                                </span>
                                                active time
                                            </li>
                                          : <p className='invisibleElement'></p>
                                        }
                                    </div>
                                    
                                    <div id='inactiveTime'>
                                        { this.state.inactiveTime
                                          ? <li>
                                                <span id='inactiveTimeText'>
                                                    {this.state.inactiveTime}
                                                </span>
                                                inactive time
                                            </li>
                                          : <p className='invisibleElement'></p>
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id='ingredients'>
                        <div className='listHeader'>
                            Ingredients
                        </div>

                        <ArrayToList
                            list={this.state.ingredients}
                            ordered={false}
                        />
                    </div>

                    <div id='directions'>
                        <div className='listHeader'>
                            Directions
                        </div>

                        <ArrayToList
                            list={this.state.directions}
                            ordered={true}
                        />
                    </div>
                </div>
            );
        }
    }
}
