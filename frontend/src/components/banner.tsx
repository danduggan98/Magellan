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

    async updateLoginStatus() {
        console.log('UPDATING LOGIN STATUS!');
        const response = await fetch('/auth/verified');
        const authCheck = await response.json();
        const verified = authCheck.verified || '';

        if (verified) {
            this.setState({
                verified
            }); 
        }
    }

    componentDidMount() {
        this.updateLoginStatus();
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
