import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SavedRecipeCard from './savedRecipeCard';
import { SavedRecipe } from '../../../magellan';
import '../styles/user.css';

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
        await this.getUserData();
    }

    //Get the email and saved recipes for the current user
    getUserData = async () => {
        try {
            const response = await fetch('/user/userData');
            const userData = await response.json();
    
            this.setState({
                email: userData.email || '',
                savedRecipes: userData.savedRecipes || []
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
                    <Helmet>
                        <title>{'Magellan - Profile'}</title>
                    </Helmet>

                    <h3>You are not yet logged in</h3>
                    <h4>Click 
                        <span>
                            <Link
                                to={{
                                    pathname: '/login',
                                    state: { source: '/user' }
                                }}>
                                    here
                            </Link>
                        </span>
                        to log in
                    </h4>
                </div>
            )
        }
    
        return (
            <div id='userDetails'>
                <Helmet>
                    <title>{'Magellan - Profile'}</title>
                </Helmet>

                <div id='emailNotice'>
                    You are logged in as {this.state.email}
                </div>

                { formattedRecipes.length
                  ? <div id='savedRecipes'>
                        <div id='recipeNotice'>
                            Here are your saved recipes:
                        </div>

                        <div id='recipeList'>
                            {formattedRecipes}
                        </div>
                    </div>

                  : <div id='recipeNotice'>
                        You do not have any saved recipes
                    </div>
                }
            </div>
        );
    }
}
