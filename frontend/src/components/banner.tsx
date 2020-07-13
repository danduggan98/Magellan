import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/banner.css'

interface State {
    verified: boolean,
    auth_error: string
};

export default class Banner extends Component {
    state: State = {
        verified: false,
        auth_error: ''
    };

    async updateLoginStatus() {
        console.log('UPDATING LOGIN STATUS!');
        const response = await fetch('/auth/verified');
        const authCheck = await response.json();

        this.setState({
            verified: authCheck.verified,
            auth_error: authCheck.auth_error
        }); 
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
                {
                    !this.state.verified ? 
                    <div>Auth failure: {this.state.auth_error}</div> : <div></div>
                }

                <Link to='/login' className='loginButton'>
                    Log In
                </Link>
            </div>
        );
    }
}
