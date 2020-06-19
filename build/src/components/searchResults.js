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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const searchCard_1 = __importDefault(require("./searchCard"));
require("../styles/searchResults.css");
class SearchResults extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: props.data,
            maxResultsPerPage: 9 //Arbitrary
        };
    }
    render() {
        //See if there will be extra recipes for a new page
        const overflow = (this.state.results.length > this.state.maxResultsPerPage);
        //Grab the recipes we will show, up to the given limit
        const res = Array.from(this.state.results);
        const visible = res.slice(0, this.state.maxResultsPerPage);
        //Turn them into search cards
        const list = visible.map(recipe => (react_1.default.createElement(searchCard_1.default, { info: recipe })));
        return (react_1.default.createElement("div", { id: 'resultsContainer' },
            react_1.default.createElement("h2", null, "Top Results:"),
            react_1.default.createElement("div", { id: 'resultsList' }, list),
            overflow
                ? react_1.default.createElement("div", null, "See more results")
                : react_1.default.createElement("p", null)));
    }
}
exports.default = SearchResults;
