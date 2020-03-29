import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            results: ''
        };
        this.getResults = this.getResults.bind(this);
    }

    async getResults(params) {
        await this.setState({input: 'Success!'});
        alert(this.state.input)
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
                        name='search'>
                    </input>
                    <iframe name="hiddenFrame" title='hidden' width="0" height="0" border="0" style={{display: 'none'}}></iframe>
                </form>
            </div>
        );
    }
}

export default SearchBar;
