import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/banner.css'

export default class Banner extends Component {
    render() {
        return (
            <div id='logoBanner'>
                <Link to='/home' className='logo'>
                    MAGELLAN
                </Link>

                <Link to='/login' className='loginButton'>
                    Log In
                </Link>
            </div>
        );
    }
}