import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: 'SEARCH TERMS'
        };
    }

    render() {
        const route = '/search/' + this.state.input;

        return (
            <div>
                <form action={route} method='POST'>
                    <input
                        type='text'
                        placeholder="Search for recipes"
                        name='search'>
                    </input>
                    <button type='submit'></button>
                </form>
            </div>
        );
    }
}

export default SearchBar;
