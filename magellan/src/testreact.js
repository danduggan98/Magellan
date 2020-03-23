import React, {Component} from 'react';
//import ReactDom from 'react-dom';

class TestReact extends Component {
    constructor() {
        super();
        this.state = {
            msg: 'nah'
        };
    }

    componentDidMount() {
        this.setState({msg: 'NO'});
        fetch('/testreact')
            .then(res => res.json())
            .then(data => this.setState({ msg: data.test }));
    }

    render() {
        return (
            <div>
                <h2> DID IT WORK? </h2>
                <h1> { this.state.msg } </h1>
            </div>
        );
    }
}

export default TestReact;