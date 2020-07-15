import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/banner.css'

interface Props {
    verified: boolean,
    auth_error: string,
    logout: () => Promise<void>
}

interface State {
    verified: boolean,
    auth_error: string,
};

export default class Banner extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.logout = props.logout;
        this.state = {
            verified: props.verified,
            auth_error: props.auth_error
        };
    }

    componentWillReceiveProps(props: Props) {
        this.setState({
            verified: props.verified,
            auth_error: props.auth_error
        });
    }

    logout() {};

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

                { this.state.verified
                    ? <button className='logoutButton' onClick={this.logout}>Log Out</button>
                    : <Link to='/login' className='loginButton'>Log In</Link>
                }
            </div>
        );
    }
}
