import React, { Component } from 'react';
import '../styles/searchCard.css';
class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: this.props.info
        };
    }
    render() {
        const data = this.state.recipe;
        const link = `/recipe/${data._id}`;
        return (React.createElement("div", { id: 'card' },
            React.createElement("a", { className: 'cardRecipeLink', target: '_blank', rel: 'noopener noreferrer', href: link },
                React.createElement("div", { id: 'cardInfo' },
                    React.createElement("div", { id: 'cardRecipeName' }, data.recipeName),
                    React.createElement("div", { id: 'cardAuthor' },
                        "by ",
                        data.author),
                    React.createElement("div", { id: 'cardTotalTime' }, data.totalTime)))));
    }
}
export default SearchCard;
