import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import '../styles/recipe.css';

//Parse an array of ingredients or directions into a JSX list
function ArrayToList(props) {
    let items = [];

    //Iterate through each section
    const numSections = props.list.length;
    const ordered = props.ordered;

    for (let i = 0; i < numSections; i++) {
        let section = [];
        let itemList = props.list[i];

        //Store each item in the inner array as an HTML list item
        let numItems = itemList.length;
        let header = itemList[0];

        for (let j = 1; j < numItems; j++) {
            section.push (
                <li key={itemList[j].toString()}>
                    {itemList[j]}
                </li>
            );
        }

        //Print the section header if noteworthy
        if (header !== 'main') {
            items.push (
                <h4 key={header.toString()}>
                    <u>{header}</u>
                </h4>
            );
        }

        //Print the list of items
        items.push (
            ordered ?
                <ol key={section.toString()}>
                    {section}
                </ol>
                :
                <ul key={section.toString()}>
                    {section}
                </ul>
        );
    }

    return (
        <div>{items}</div>
    );
}

//Display full recipe data
class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1, //Remains 1 if the recipe is found, 0 otherwise
            recipeID: props.match.params.recipeid, //URL parameter
            ingredients: '',
            directions: ''
        };
    }

    //Gather data from server JSON response
    async componentDidMount() {
        const res = await fetch('/recipe/' + this.state.recipeID);
        const data = await res.json();

        //Recipe not found
        if (data.error) {
            this.setState({ status: 0 });
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
        if (!this.state.status) {
            return (
                <div>
                    <h1>Recipe not found!</h1>
                    <h3>Please try again</h3>
                </div>
            );
        }
        //Recipe found
        else {
            return (
                <div>
                    { this.state.recipeName ?
                        <Helmet>
                            <title>{ "Magellan - " + this.state.recipeName }</title>
                        </Helmet>
                        :
                        <Helmet>
                            <title>{ "Magellan" }</title>
                        </Helmet>
                    }

                    <div id='header'>
                        <div id='recipeName'>
                            { this.state.recipeName }
                        </div>

                        <div id='author'>
                            by { this.state.author }
                        </div>

                        <div id='source'>
                            Courtesy of
                            <span id='sourceText'>
                                { this.state.source }
                            </span>
                        </div>
                    </div>

                    <div id='image'>
                        { this.state.imageURL ?
                            <img src={this.state.imageURL} alt='' width='600'></img> :
                            <p></p>
                        }

                        <div id='sourceLink'>
                            <a target='_blank' rel='noopener noreferrer' href={this.state.URL}>Original Recipe</a>
                        </div>
                    </div>
                    
                    <div id='details'>
                        <div id='difficulty'>
                            Difficulty: 
                            <span id='difficultyText'>
                                { this.state.difficulty }
                            </span>
                        </div>
                        
                        <div id='yield'>
                            Yield: 
                            <span id='yieldText'>
                                { this.state.yield }
                            </span>
                        </div>

                        <div id='times'>
                            <div id='totalTime'>
                                Total Time:
                                <span id='totalTimeText'>
                                    { this.state.totalTime }
                                </span>
                            </div>

                            <div id='timesList'>
                                <ul>
                                    <div id='prepTime'>
                                        { this.state.prepTime ?
                                            <li>
                                                <span id='prepTimeText'>
                                                    { this.state.prepTime }
                                                </span>
                                                prep time
                                            </li>
                                            : <p></p>
                                        }
                                    </div>
                                    
                                    <div id='cookTime'>
                                        { this.state.cookTime ?
                                            <li>
                                                <span id='cookTimeText'>
                                                    { this.state.cookTime }
                                                </span>
                                                cook time
                                            </li>
                                            : <p></p>
                                        }
                                    </div>
                                    
                                    <div id='activeTime'>
                                        { this.state.activeTime ?
                                            <li>
                                                <span id='activeTimeText'>
                                                    { this.state.activeTime }
                                                </span>
                                                active time
                                            </li>
                                            : <p></p>
                                        }
                                    </div>
                                    
                                    <div id='inactiveTime'>
                                        { this.state.inactiveTime ?
                                            <li>
                                                <span id='inactiveTimeText'>
                                                    { this.state.inactiveTime }
                                                </span>
                                                inactive time
                                            </li>
                                            : <p></p>
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2>Ingredients:</h2>
                    <ArrayToList list={this.state.ingredients} ordered={false}/>
                    <br></br>

                    <h2>Directions:</h2>
                    <ArrayToList list={this.state.directions} ordered={true}/>
                </div>
            );
        }
    }
}

export default Recipe;
