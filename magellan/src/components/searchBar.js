import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            results: ''
        };
        //this.getResults = this.getResults.bind(this);
    }

    async getResults() {
        const res = await fetch('/search/' + this.state.input);
        const data = await res.json();
        this.setState({ results: data.msg });
    }

    updateInput = (vals) => {
        this.setState({ input: vals.target.value })
    }

    //Search bar - form takes an input and redirects to an invisible
    // iframe on the same page after querying the db and displaying 
    // the results below
    render() {
        return (
            <div>
                <form
                    name='searchbar'
                    target='hiddenFrame'
                    onSubmit={this.getResults}
                    method='post'>

                    <input
                        type='text'
                        autoComplete='off'
                        placeholder="Search for recipes"
                        name='search'
                        onChange={this.updateInput}>
                    </input>

                    <h1>{this.state.input}</h1>
                    <iframe name="hiddenFrame" title='hidden' width="0" height="0" border="0" style={{display: 'none'}}></iframe>
                </form>
            </div>
        );
    }
}

export default SearchBar;
