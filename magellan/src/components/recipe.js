import React, {Component} from 'react';

//Parse an object into a JSX list
function ObjectToList(props) {
    let items = [];

    //Iterate through the object
    Object.keys(props.list).forEach((header, ings) => {
        let section = [];
        const itemList = props.list[header]; //Grab the array

        //Store each item in the array as an HTML list item
        for (let i = 0; i < itemList.length; i++) {
            section.push (
                <li key={itemList[i].toString()}>
                    {itemList[i]}
                </li>
            );
        }

        //Print the header for each section
        if (header !== 'main') {
            items.push (
                <h4 key={header.toString()}>
                    <u>{header}</u>
                </h4>
            );
        }

        //Print the list of items
        items.push (
            <ul key={section.toString()}>
                {section}
            </ul>
        );
    });

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

        if (data.error) {
            this.setState({status: 0});
        }
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
        if (!this.state.status) {
            return (
                <div>
                    <h1>Recipe not found!</h1>
                    <h3>Please try again</h3>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>{this.state.recipeName}</h1>
                    <h2>by {this.state.author}</h2>
                    <h3>Courtesy of {this.state.source}</h3>

                    { this.state.imageURL ?
                        <img src={this.state.imageURL} alt="" width="600"></img> :
                        <p></p>
                    }

                    <br></br>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.URL}>Original Recipe</a>
                    
                    <br></br>
                    <h3>Difficulty: {this.state.difficulty} | Yield: {this.state.yield}</h3>
                    
                    <br></br>
                    <h2>Total Time: {this.state.totalTime}</h2>

                    <ul>
                    { this.state.prepTime ?
                        <li>
                            <h4>{this.state.prepTime} prep time</h4>
                        </li>
                        : <p></p>
                    }
                        
                    { this.state.cookTime ?
                        <li>
                            <h4>{this.state.cookTime} cook time</h4>
                        </li>
                        : <p></p>
                    }

                    { this.state.activeTime ?
                        <li>
                            <h4>{this.state.activeTime} active time</h4>
                        </li>
                        : <p></p>
                    }

                    { this.state.inactiveTime ?
                        <li>
                            <h4>{this.state.inactiveTime} inactive time</h4>
                        </li>
                        : <p></p>
                    }
                    </ul>

                    <br></br>
                    <h2>Ingredients:</h2>
                    <ObjectToList list={this.state.ingredients} />
                    <br></br>

                    <h2>Directions:</h2>
                    <ObjectToList list={this.state.directions} />
                </div>
            );
        }
    }
}

export default Recipe;
