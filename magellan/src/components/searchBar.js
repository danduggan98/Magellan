import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            results: ''
        };
    }

    //Launch a search in the server and store the results
    getResults = async () => {
        const res = await fetch('/search/' + this.state.input);
        const data = await res.json();
        this.setState({ results: data.msg });
    }

    //Save the user's current input in state
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
                    onSubmit={this.getResults}>

                    <input
                        type='text'
                        autoComplete='off'
                        placeholder="Search for recipes"
                        name='search'
                        onChange={this.updateInput}>
                    </input>

                    <h2>{this.state.results}</h2>
                    <iframe name="hiddenFrame" title='hidden' width="0" height="0" border="0" style={{display: 'none'}}></iframe>
                </form>
            </div>
        );
    }
}

export default SearchBar;
