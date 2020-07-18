import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    verified: boolean
}

interface State {
    email: string
};

export default class User extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    componentDidMount() {
        this.getSavedRecipes()
    }

    getSavedRecipes = async () => {
        try {
            const response = await fetch('/auth/userData');
            const userData = await response.json();
    
            this.setState({
                email: userData.email
            })
        }
        catch (err) {
            console.log('Error retrieving saved recipes:', err);
        }
    }

    render() {
        if (!this.props.verified) {
            return (
                <div>
                    <h3>You are not yet logged in</h3>
                    <h4>Click 
                        <span>
                            <Link to='/login'>
                                here
                            </Link>
                        </span>
                        to log in
                    </h4>
                </div>
            )
        }
    
        return (
            <div>
                <div>GREAT SUCCESS!</div>
                <div>You are logged in as {this.state.email}</div>
            </div>
        );
    }
}
