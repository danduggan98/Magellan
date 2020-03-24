import React, {Component} from 'react';

//Parse ingredients

//Parse directions

class Recipe extends Component {
    constructor() {
        super();
        this.state = {
            recipeID: '5e61c282be6ab70df4adad79'
        };
    }

    componentDidMount() {
        fetch('/recipe/' + this.state.recipeID)
        .then(res => res.json())
        .then(data => this.setState({
            URL: data.URL,
            imageURL: data.imageURL,
            author: data.author,
            recipeName: data.recipeName,
            difficulty: data.difficulty,
            totalTime: data.totalTime,
            prepTime: data.prepTime,
            inactiveTime: data.inactiveTime,
            activeTime: data.activeTime,
            cookTime: data.cookTime,
            yield: data.yield,
            ingredients: data.ingredients,
            directions: data.directions,
            source: data.source
        }));
    }

    render() {
        return (
            <div>
                <h1> {this.state.recipeName} </h1>
                <h2> by {this.state.author} </h2>
                <h3> courtesy of {this.state.source} </h3>
                <img src={this.state.imageURL} alt="" width="600"></img>
                
                <br></br>
                <a target="_blank" rel="noopener noreferrer" href={this.state.URL}>Original Recipe</a>
                
                <br></br>
                <h3> Difficulty: {this.state.difficulty} | Yield: {this.state.yield} </h3>
                
                <br></br>
                <h2> Total Time: {this.state.totalTime} </h2>

                { this.state.prepTime ?
                    <h4> {this.state.prepTime} prep time </h4>:
                    <p></p>
                }
                    
                { this.state.cookTime ?
                    <h4> {this.state.cookTime} cook time </h4>:
                    <p></p>
                }

                { this.state.activeTime ?
                    <h4> {this.state.activeTime} active time </h4>:
                    <p></p>
                }

                { this.state.inactiveTime ?
                    <h4> {this.state.inactiveTime} inactive time </h4>:
                    <p></p>
                }
            </div>
        );
    }
}

export default Recipe;