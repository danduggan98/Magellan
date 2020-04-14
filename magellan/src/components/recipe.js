import React, {Component} from 'react';

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
                    <h1>{this.state.recipeName}</h1>
                    <h2>by {this.state.author}</h2>
                    <h3>Courtesy of {this.state.source}</h3>

                    { this.state.imageURL ?
                        <img src={this.state.imageURL} alt='' width='600'></img> :
                        <p></p>
                    }

                    <br></br>
                    <a target='_blank' rel='noopener noreferrer' href={this.state.URL}>Original Recipe</a>
                    
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
