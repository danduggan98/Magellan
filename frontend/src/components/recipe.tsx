import React, { Component, FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import BeatLoader from 'react-spinners/BeatLoader';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RecipeData } from '../../../magellan';
import '../styles/recipe.css';

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
    loaded:       boolean,
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
                <li key={j}>
                    {next}
                </li>
            );
        }

        //Print the section header if noteworthy
        const header = itemList[0];

        if (header !== 'main') {
            items.push (
                <div className='sectionHeader'
                    key={i + 'h'}>
                    {header}
                </div>
            );
        }

        //Print the list of items
        items.push (
            <div className='sectionData'
                key={i}>
                { props.ordered
                  ? <ol>{section}</ol>
                  : <ul>{section}</ul>
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
            loaded:       false,
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

        const recipeSavedResponse = await fetch(`/user/recipeSaved/${this.state.recipeID}`);
        const recipeSavedData = await recipeSavedResponse.json();
        const recipeSaved: boolean = recipeSavedData.recipeSaved ?? false;

        //Recipe not found
        if (recipeData.error) {
            this.setState({
                recipeFound: false,
                recipeSaved,
                loaded: true
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
                recipeSaved,
                loaded: true
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
            const response = await fetch(`/user/saveRecipe/${this.state.recipeID}`);
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
            const response = await fetch(`/user/removeRecipe/${this.state.recipeID}`);
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

        //Recipe lookup not yet finished
        if (!this.state.loaded) {
            return (
                <div id='recipeLoadingNotice'>
                    Loading
                    <BeatLoader size={20} margin={5} />
                </div>
            );
        }

        //Recipe not found
        else if (!this.state.recipeFound) {
            return (
                <div id='notFoundNotice'>
                    Recipe not found!
                    <div>Please try again</div>
                </div>
            );
        }

        //Recipe found
        else {
            return (
                <div id='recipePage'>
                    { this.state.recipeName
                      ? <Helmet>
                            <title>{'Magellan - ' + this.state.recipeName}</title>
                        </Helmet>
                      : <Helmet>
                            <title>{'Magellan'}</title>
                        </Helmet>
                    }

                    <div id='recipeDetails'>
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
                                Courtesy of&nbsp;
                                <span id='sourceText'>
                                    {this.state.source}
                                </span>
                            </div>

                            <button id='saveRecipeButton'
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

                            <div id='details'>
                                <div id='detailsLeft'>
                                    { this.state.difficulty
                                      ? <div id='difficulty'>
                                            Difficulty:&nbsp;
                                            <span id='difficultyText' className='detailHighlight'>
                                                {this.state.difficulty}
                                            </span>
                                        </div>
                                      : <p className='invisibleElement'></p>
                                    }
                                    
                                    { this.state.yield
                                      ? <div id='yield'>
                                            Yield:&nbsp;
                                            <span id='yieldText' className='detailHighlight'>
                                                {this.state.yield}
                                            </span>
                                        </div>
                                      : <p className='invisibleElement'></p>
                                    }
                                </div>

                                <div id='times'>
                                    { this.state.totalTime
                                      ? <div id='totalTime'>
                                            Total Time:&nbsp;
                                            <span id='totalTimeText' className='detailHighlight'>
                                                {this.state.totalTime}
                                            </span>
                                        </div>
                                      : <p className='invisibleElement'></p>
                                    }
                                    
                                    <div id='timesList'>
                                        <ul>
                                            <div id='prepTime'>
                                                { this.state.prepTime
                                                  ? <li>
                                                        Prep:&nbsp;
                                                        <span id='prepTimeText' className='detailHighlight'>
                                                            {this.state.prepTime}
                                                        </span>
                                                    </li>
                                                  : <p className='invisibleElement'></p>
                                                }
                                            </div>
                                            
                                            <div id='cookTime'>
                                                { this.state.cookTime
                                                  ? <li>
                                                        Cook:&nbsp;
                                                        <span id='cookTimeText' className='detailHighlight'>
                                                            {this.state.cookTime}
                                                        </span>
                                                    </li>
                                                  : <p className='invisibleElement'></p>
                                                }
                                            </div>
                                            
                                            <div id='activeTime'>
                                                { this.state.activeTime
                                                  ? <li>
                                                        Active:&nbsp;
                                                        <span id='activeTimeText' className='detailHighlight'>
                                                            {this.state.activeTime}
                                                        </span>
                                                    </li>
                                                  : <p className='invisibleElement'></p>
                                                }
                                            </div>
                                            
                                            <div id='inactiveTime'>
                                                { this.state.inactiveTime
                                                  ? <li>
                                                        Inactive:&nbsp;
                                                        <span id='inactiveTimeText' className='detailHighlight'>
                                                            {this.state.inactiveTime}
                                                        </span>
                                                    </li>
                                                  : <p className='invisibleElement'></p>
                                                }
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            { !this.state.imageURL
                              ? <div id='sourceLink'>
                                    <a target='_blank' rel='noopener noreferrer' href={this.state.URL}>Original Recipe</a>
                                </div>
                              : <p className='invisibleElement'></p>
                            }
                        </div>

                        { this.state.imageURL
                          ? <div id='imageContainer'>
                                <img id='recipePhoto' src={this.state.imageURL} alt=''></img>
                                <div id='sourceLink'>
                                    <a target='_blank' rel='noopener noreferrer' href={this.state.URL}>Original Recipe</a>
                                </div>
                            </div>
                          : <p className='invisibleElement'></p>
                        }
                    </div>

                    <div id='procedure'>
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
                </div>
            );
        }
    }
}
