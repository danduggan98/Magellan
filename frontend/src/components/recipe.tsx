import React, { Component, FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/recipe.css';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RecipeData } from '../../../magellan';

//Define local types

interface ArrayToListProps {
    list:    string[][],
    ordered: boolean
}

interface RecipeRouterProps {
    recipeid: string
}

interface Props extends RouteComponentProps<RecipeRouterProps> {
    verified: boolean
}

interface State {
    recipeFound:  boolean,
    recipeSaved:  boolean,
    redirect:     boolean,
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
export default class Recipe extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            recipeFound:  true,
            recipeSaved:  false,
            redirect:     false,
            recipeID:     this.props.match.params.recipeid, //URL parameter
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
        const recipeDataResponse = await fetch(`/api/recipe/${this.state.recipeID}`);
        const recipeData: RecipeData = await recipeDataResponse.json();

        const recipeSavedResponse = await fetch(`/auth/recipeSaved/${this.state.recipeID}`);
        const recipeSavedData = await recipeSavedResponse.json();
        const recipeSaved: boolean = recipeSavedData.recipeSaved || false;

        //Recipe not found
        if (recipeData.error) {
            this.setState({
                recipeFound: false,
                recipeSaved
            });
        }
        //Recipe found
        else {
            this.setState({
                URL:          recipeData.URL,
                imageURL:     recipeData.imageURL,
                author:       recipeData.author,
                recipeName:   recipeData.recipeName,
                difficulty:   recipeData.difficulty,
                totalTime:    recipeData.totalTime,
                prepTime:     recipeData.prepTime,
                inactiveTime: recipeData.inactiveTime,
                activeTime:   recipeData.activeTime,
                cookTime:     recipeData.cookTime,
                yield:        recipeData.yield,
                ingredients:  recipeData.ingredients,
                directions:   recipeData.directions,
                source:       recipeData.source,
                recipeSaved
            });
        }
    }

    //Add this recipe to the user's account
    saveRecipe = async () => {

        //If they are not logged in, redirect to the login page and then bring them back
        if (!this.props.verified) {
            this.setState({
                redirect: true
            })
        }

        //If they are logged in, save the recipe to their account
        else {
            const response = await fetch(`/auth/saveRecipe/${this.state.recipeID}`);
            const userData = await response.json();

            if (userData.errors.length) {
                console.log(userData.errors[0]);
            }
            else {
                this.setState({
                    recipeSaved: true
                })
            }
        }
    }

    removeRecipe = async () => {

        //If they are not logged in, redirect to the login page and then bring them back
        if (!this.props.verified) {
            this.setState({
                redirect: true
            })
        }

        //If they are logged in, remove the recipe from their account
        else {
            const response = await fetch(`/auth/removeRecipe/${this.state.recipeID}`);
            const userData = await response.json();

            if (userData.errors.length) {
                console.log(userData.errors[0]);
            }
            else {
                this.setState({
                    recipeSaved: false
                })
            }
        }
    }

    render() {
        //If the login redirect came from a recipe page, return to that page
        if (this.state.redirect) {
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { source: `/recipe/${this.state.recipeID}` }
                    }}>
                </Redirect>
            );
        }

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
                            <title>{'Magellan - ' + this.state.recipeName}</title>
                        </Helmet>
                      : <Helmet>
                            <title>{'Magellan'}</title>
                        </Helmet>
                    }

                    <div id='header'>
                        <div id='recipeName'>
                            {this.state.recipeName}
                        </div>

                        { this.state.author
                          ? <div id='author'>
                                by {this.state.author}
                            </div>
                          : <p className='invisibleElement'></p>
                        }

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

                    <div id='saveRecipeButton'>
                        <button
                            onClick={
                                this.state.recipeSaved
                                ? this.removeRecipe
                                : this.saveRecipe
                            }>
                            { this.props.verified
                              ? this.state.recipeSaved
                                ? 'Remove Recipe'
                                : 'Save Recipe'
                              : 'Log in to save this recipe'
                            }
                        </button>
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
