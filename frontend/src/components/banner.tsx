import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/banner.css'

interface State {
    verified: boolean
};

export default class Banner extends Component {
    state: State = {
        verified: false
    };

    async componentDidMount() {
        const response = await fetch('/auth/verified');
        const authCheck = await response.json();

        this.setState({
            verified: authCheck.verified
        });
    }

    render() {
        return (
            <div id='logoBanner'>
                <Link to='/home' className='logo'>
                    MAGELLAN
                </Link>

                <div>VERIFIED? {this.state.verified.toString()}</div>

                <Link to='/login' className='loginButton'>
                    Log In
                </Link>
            </div>
        );
    }
}