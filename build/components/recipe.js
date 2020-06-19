var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/recipe.css';
//Parse an array of ingredients or directions into a JSX list
const ArrayToList = (props) => {
    let items = [];
    //Iterate through each section
    for (let i = 0; i < props.list.length; i++) {
        let section = [];
        let itemList = props.list[i];
        //Store each item in the inner array as an HTML list item
        for (let j = 1; j < itemList.length; j++) { //Start at j = 1 to skip the header
            let next = itemList[j];
            section.push(React.createElement("li", { key: next }, next));
        }
        //Print the section header if noteworthy
        const header = itemList[0];
        if (header !== 'main') {
            items.push(React.createElement("div", { className: 'sectionHeader', key: header }, header));
        }
        //Print the list of items
        items.push(React.createElement("div", { className: 'sectionData' }, props.ordered
            ? React.createElement("ol", { key: section.toString() }, section)
            : React.createElement("ul", { key: section.toString() }, section)));
    }
    return (React.createElement("div", null, items));
};
//Display full recipe data
export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeFound: true,
            recipeID: props.match.params.id,
            URL: '',
            imageURL: '',
            author: '',
            recipeName: '',
            difficulty: '',
            totalTime: '',
            prepTime: '',
            inactiveTime: '',
            activeTime: '',
            cookTime: '',
            yield: '',
            ingredients: [],
            directions: [],
            source: ''
        };
    }
    //Gather data from server JSON response
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch('/recipe/' + this.state.recipeID);
            const data = yield res.json();
            //Recipe not found
            if (data.error) {
                this.setState({ recipeFound: false });
            }
            //Recipe found
            else {
                this.setState({
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
                });
            }
        });
    }
    render() {
        //Recipe not found
        if (!this.state.recipeFound) {
            return (React.createElement("div", { id: 'notFoundNotice' }, "Recipe not found! Please try again"));
        }
        //Recipe found
        else {
            return (React.createElement("div", null,
                this.state.recipeName
                    ? React.createElement(Helmet, null,
                        React.createElement("title", null, "Magellan - " + this.state.recipeName))
                    : React.createElement(Helmet, null,
                        React.createElement("title", null, "Magellan")),
                React.createElement("div", { id: 'header' },
                    React.createElement("div", { id: 'recipeName' }, this.state.recipeName),
                    React.createElement("div", { id: 'author' },
                        "by ",
                        this.state.author),
                    React.createElement("div", { id: 'source' },
                        "Courtesy of",
                        React.createElement("span", { id: 'sourceText' }, this.state.source))),
                React.createElement("div", { id: 'image' },
                    this.state.imageURL
                        ? React.createElement("img", { src: this.state.imageURL, alt: '', width: '600' })
                        : React.createElement("p", { className: 'invisibleElement' }),
                    React.createElement("div", { id: 'sourceLink' },
                        React.createElement("a", { target: '_blank', rel: 'noopener noreferrer', href: this.state.URL }, "Original Recipe"))),
                React.createElement("div", { id: 'details' },
                    React.createElement("div", { id: 'detailsLeft' },
                        React.createElement("div", { id: 'difficulty' },
                            "Difficulty:",
                            React.createElement("span", { id: 'difficultyText' }, this.state.difficulty)),
                        React.createElement("div", { id: 'yield' },
                            "Yield:",
                            React.createElement("span", { id: 'yieldText' }, this.state.yield))),
                    React.createElement("div", { id: 'times' },
                        React.createElement("div", { id: 'totalTime' },
                            "Total Time:",
                            React.createElement("span", { id: 'totalTimeText' }, this.state.totalTime)),
                        React.createElement("div", { id: 'timesList' },
                            React.createElement("ul", null,
                                React.createElement("div", { id: 'prepTime' }, this.state.prepTime
                                    ? React.createElement("li", null,
                                        React.createElement("span", { id: 'prepTimeText' }, this.state.prepTime),
                                        "prep time")
                                    : React.createElement("p", { className: 'invisibleElement' })),
                                React.createElement("div", { id: 'cookTime' }, this.state.cookTime
                                    ? React.createElement("li", null,
                                        React.createElement("span", { id: 'cookTimeText' }, this.state.cookTime),
                                        "cook time")
                                    : React.createElement("p", { className: 'invisibleElement' })),
                                React.createElement("div", { id: 'activeTime' }, this.state.activeTime
                                    ? React.createElement("li", null,
                                        React.createElement("span", { id: 'activeTimeText' }, this.state.activeTime),
                                        "active time")
                                    : React.createElement("p", { className: 'invisibleElement' })),
                                React.createElement("div", { id: 'inactiveTime' }, this.state.inactiveTime
                                    ? React.createElement("li", null,
                                        React.createElement("span", { id: 'inactiveTimeText' }, this.state.inactiveTime),
                                        "inactive time")
                                    : React.createElement("p", { className: 'invisibleElement' })))))),
                React.createElement("div", { id: 'ingredients' },
                    React.createElement("div", { className: 'listHeader' }, "Ingredients"),
                    React.createElement(ArrayToList, { list: this.state.ingredients, ordered: false })),
                React.createElement("div", { id: 'directions' },
                    React.createElement("div", { className: 'listHeader' }, "Directions"),
                    React.createElement(ArrayToList, { list: this.state.directions, ordered: true }))));
        }
    }
}
