import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <form action='/search/' method='POST'>
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
