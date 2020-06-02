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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const core_1 = require("@emotion/core");
const BarLoader_1 = __importDefault(require("react-spinners/BarLoader"));
const searchResults_js_1 = __importDefault(require("./searchResults.js"));
require("../styles/searchBar.css");
class SearchBar extends react_1.Component {
    constructor(props) {
        super(props);
        //Launch a search in the server and store the results
        this.getResults = () => __awaiter(this, void 0, void 0, function* () {
            //Ensure they have entered something
            if (this.state.input) {
                //If so, querty the db
                const fetchURL = `/search/${this.state.searchType}/${this.state.input}/${this.state.maxResults}`;
                this.setState({
                    results: [],
                    resultsFound: true,
                    loading: true,
                    emptyInput: false
                });
                const res = yield fetch(fetchURL); //Execute the search
                const data = yield res.json();
                //No search results
                if (data.error) {
                    this.setState({ resultsFound: false, loading: false });
                }
                //Create a list of items
                else {
                    let items = [];
                    const vals = data.searchResults;
                    const numItems = vals.length;
                    for (let i = 0; i < numItems; i++) {
                        items.push(vals[i]);
                    }
                    this.setState({
                        resultsFound: true,
                        loading: false,
                        results: items
                    });
                }
            }
            else {
                this.setState({
                    emptyInput: true,
                    resultsFound: true,
                    results: []
                });
            }
        });
        //Save the user's current input in state
        this.updateInput = (val) => {
            this.setState({ input: val.target.value });
        };
        //Change the search type
        this.updateSearchType = (val) => {
            this.setState({ searchType: val.currentTarget.value });
        };
        this.state = {
            searchType: 'name',
            input: '',
            emptyInput: false,
            resultsFound: true,
            loading: false,
            results: [],
            maxResults: 36 //Arbitrary
        };
    }
    // Search bar - form accepts the search and queries the db
    render() {
        //CSS for loading bar
        const override = core_1.css `
            width: 285px;
            margin-top: 10px;
            margin-left: auto;
            margin-right: auto;
            background-color: lightgrey;
        `;
        return (react_1.default.createElement("div", { id: 'searchContainer' },
            react_1.default.createElement("div", { id: 'notice' }, "Find your next meal!"),
            react_1.default.createElement("form", { name: 'searchBar', target: 'hiddenFrame', onSubmit: this.getResults },
                react_1.default.createElement("div", { id: 'searchBarWrapper' },
                    react_1.default.createElement("input", { name: 'search', id: 'searchInput', type: 'text', autoComplete: 'off', placeholder: 'Search for recipes', onChange: this.updateInput }),
                    react_1.default.createElement("button", { type: 'submit', id: 'searchButton', className: 'fa fa-search' })),
                react_1.default.createElement("div", { id: 'searchType' },
                    "Search by:",
                    react_1.default.createElement("div", { id: 'searchTypeNameWrapper' },
                        react_1.default.createElement("input", { type: 'radio', id: 'searchTypeNameButton', name: 'searchType', value: 'name', onChange: this.updateSearchType, checked: this.state.searchType === 'name' ? true : false }),
                        react_1.default.createElement("label", { htmlFor: 'searchTypeNameButton' }, "Recipe Name")),
                    react_1.default.createElement("div", { id: 'searchTypeIngWrapper' },
                        react_1.default.createElement("input", { type: 'radio', id: 'searchTypeIngButton', name: 'searchType', value: 'ing', onChange: this.updateSearchType, checked: this.state.searchType === 'ing' ? true : false }),
                        react_1.default.createElement("label", { htmlFor: 'searchTypeIngButton' }, "Ingredient"))),
                react_1.default.createElement("div", { id: 'inputReminder' }, this.state.emptyInput ?
                    react_1.default.createElement("h4", null, "Please enter something to search")
                    : react_1.default.createElement("p", null)),
                react_1.default.createElement("div", { id: 'loadingBar' }, this.state.loading ?
                    react_1.default.createElement("div", null,
                        "Searching...",
                        react_1.default.createElement(BarLoader_1.default, { height: 6, css: override }))
                    : react_1.default.createElement("p", null))),
            react_1.default.createElement("div", { id: 'results' },
                !this.state.resultsFound ?
                    react_1.default.createElement("div", { id: 'failNotice' }, "No results found. Try again")
                    : react_1.default.createElement("p", null),
                this.state.results.length ?
                    react_1.default.createElement(searchResults_js_1.default, { data: this.state.results })
                    : react_1.default.createElement("p", null)),
            react_1.default.createElement("iframe", { name: 'hiddenFrame', id: 'iframe', title: 'hidden' })));
    }
}
exports.default = SearchBar;
