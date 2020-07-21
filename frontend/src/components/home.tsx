import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import SearchBar from './searchBar';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>{'Magellan'}</title>
                </Helmet>
                
                <SearchBar />
            </div>
        );
    }
}
