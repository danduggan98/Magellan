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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../styles/searchCard.css");
class SearchCard extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: this.props.info
        };
    }
    render() {
        const data = this.state.recipe;
        const link = `/recipe/${data._id}`;
        return (react_1.default.createElement("div", { id: 'card' },
            react_1.default.createElement("a", { className: 'cardRecipeLink', target: '_blank', rel: 'noopener noreferrer', href: link },
                react_1.default.createElement("div", { id: 'cardInfo' },
                    react_1.default.createElement("div", { id: 'cardRecipeName' }, data.recipeName),
                    react_1.default.createElement("div", { id: 'cardAuthor' },
                        "by ",
                        data.author),
                    react_1.default.createElement("div", { id: 'cardTotalTime' }, data.totalTime)))));
    }
}
exports.default = SearchCard;
