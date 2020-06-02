"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_helmet_1 = require("react-helmet");
require("../styles/recipe.css");
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
            section.push(react_1.default.createElement("li", { key: itemList[j].toString() }, itemList[j]));
        }
        //Print the section header if noteworthy
        if (header !== 'main') {
            items.push(react_1.default.createElement("div", { className: 'sectionHeader', key: header.toString() }, header));
        }
        //Print the list of items
        items.push(react_1.default.createElement("div", { className: 'sectionData' }, ordered ?
            react_1.default.createElement("ol", { key: section.toString() }, section)
            :
                react_1.default.createElement("ul", { key: section.toString() }, section)));
    }
    return (react_1.default.createElement("div", null, items));
}
//Display full recipe data
class Recipe extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            recipeID: props.match.params.recipeid,
            ingredients: '',
            directions: ''
        };
    }
    //Gather data from server JSON response
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch('/recipe/' + this.state.recipeID);
            const data = yield res.json();
            //Recipe not found
            if (data.error) {
                this.setState({ status: 0 });
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
        if (!this.state.status) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("h1", null, "Recipe not found!"),
                react_1.default.createElement("h3", null, "Please try again")));
        }
        //Recipe found
        else {
            return (react_1.default.createElement("div", null,
                this.state.recipeName ?
                    react_1.default.createElement(react_helmet_1.Helmet, null,
                        react_1.default.createElement("title", null, "Magellan - " + this.state.recipeName))
                    :
                        react_1.default.createElement(react_helmet_1.Helmet, null,
                            react_1.default.createElement("title", null, "Magellan")),
                react_1.default.createElement("div", { id: 'header' },
                    react_1.default.createElement("div", { id: 'recipeName' }, this.state.recipeName),
                    react_1.default.createElement("div", { id: 'author' },
                        "by ",
                        this.state.author),
                    react_1.default.createElement("div", { id: 'source' },
                        "Courtesy of",
                        react_1.default.createElement("span", { id: 'sourceText' }, this.state.source))),
                react_1.default.createElement("div", { id: 'image' },
                    this.state.imageURL ?
                        react_1.default.createElement("img", { src: this.state.imageURL, alt: '', width: '600' })
                        : react_1.default.createElement("p", { className: 'invisibleElement' }),
                    react_1.default.createElement("div", { id: 'sourceLink' },
                        react_1.default.createElement("a", { target: '_blank', rel: 'noopener noreferrer', href: this.state.URL }, "Original Recipe"))),
                react_1.default.createElement("div", { id: 'details' },
                    react_1.default.createElement("div", { id: 'detailsLeft' },
                        react_1.default.createElement("div", { id: 'difficulty' },
                            "Difficulty:",
                            react_1.default.createElement("span", { id: 'difficultyText' }, this.state.difficulty)),
                        react_1.default.createElement("div", { id: 'yield' },
                            "Yield:",
                            react_1.default.createElement("span", { id: 'yieldText' }, this.state.yield))),
                    react_1.default.createElement("div", { id: 'times' },
                        react_1.default.createElement("div", { id: 'totalTime' },
                            "Total Time:",
                            react_1.default.createElement("span", { id: 'totalTimeText' }, this.state.totalTime)),
                        react_1.default.createElement("div", { id: 'timesList' },
                            react_1.default.createElement("ul", null,
                                react_1.default.createElement("div", { id: 'prepTime' }, this.state.prepTime ?
                                    react_1.default.createElement("li", null,
                                        react_1.default.createElement("span", { id: 'prepTimeText' }, this.state.prepTime),
                                        "prep time")
                                    : react_1.default.createElement("p", { className: 'invisibleElement' })),
                                react_1.default.createElement("div", { id: 'cookTime' }, this.state.cookTime ?
                                    react_1.default.createElement("li", null,
                                        react_1.default.createElement("span", { id: 'cookTimeText' }, this.state.cookTime),
                                        "cook time")
                                    : react_1.default.createElement("p", { className: 'invisibleElement' })),
                                react_1.default.createElement("div", { id: 'activeTime' }, this.state.activeTime ?
                                    react_1.default.createElement("li", null,
                                        react_1.default.createElement("span", { id: 'activeTimeText' }, this.state.activeTime),
                                        "active time")
                                    : react_1.default.createElement("p", { className: 'invisibleElement' })),
                                react_1.default.createElement("div", { id: 'inactiveTime' }, this.state.inactiveTime ?
                                    react_1.default.createElement("li", null,
                                        react_1.default.createElement("span", { id: 'inactiveTimeText' }, this.state.inactiveTime),
                                        "inactive time")
                                    : react_1.default.createElement("p", { className: 'invisibleElement' })))))),
                react_1.default.createElement("div", { id: 'ingredients' },
                    react_1.default.createElement("div", { className: 'listHeader' }, "Ingredients"),
                    react_1.default.createElement(ArrayToList, { list: this.state.ingredients, ordered: false })),
                react_1.default.createElement("div", { id: 'directions' },
                    react_1.default.createElement("div", { className: 'listHeader' }, "Directions"),
                    react_1.default.createElement(ArrayToList, { list: this.state.directions, ordered: true }))));
        }
    }
}
exports.default = Recipe;
