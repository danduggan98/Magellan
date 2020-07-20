import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SavedRecipeCard from './savedRecipeCard';
import { SavedRecipe } from '../../../magellan';

interface Props {
    verified: boolean
}

interface State {
    email: string,
    savedRecipes: SavedRecipe[]
};

export default class User extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            savedRecipes: []
        };
    }

    async componentDidMount() {
        await this.getUserData()
    }

    //Get the email and saved recipes for the current user
    getUserData = async() => {
        try {
            const response = await fetch('/auth/userData');
            const userData = await response.json();
    
            this.setState({
                email: userData.email,
                savedRecipes: userData.savedRecipes
            })
        }
        catch (err) {
            console.log('Error retrieving user data:', err);
        }
    }

    render() {
        const formattedRecipes = this.state.savedRecipes
            .map(recipe => (
                <SavedRecipeCard info={recipe} />
            )
        );
        
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
                <div>Here are your saved recipes:{formattedRecipes}</div>
            </div>
        );
    }
}
