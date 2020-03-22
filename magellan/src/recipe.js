import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Recipe extends Component {
    state = {
        msg: "nah...."
    }

    componentDidMount() {
        fetch('/testreact')
        .then(res => res.json())
        .then(msg => this.setState({msg}));
    }

    render() {
        return (
            <div>
                <h1>DID IT WORK?</h1>
                <h2> {this.state.msg} </h2>
            </div>
        );
    }
}

export default Recipe;