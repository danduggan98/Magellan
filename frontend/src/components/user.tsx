import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import SavedRecipeCard from './savedRecipeCard';
import { SavedRecipe } from '../../../magellan';
import '../styles/user.css';

interface Props {
    verified: boolean
}

interface State {
    email: string,
    savedRecipes: SavedRecipe[],
    loaded: boolean,
};

export default class User extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            savedRecipes: [],
            loaded: false,
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
                savedRecipes: userData.savedRecipes || [],
                loaded: true
            })
        }
        catch (err) {
            console.log('Error retrieving user data:', err);
        }
    }

    render() {
        const formattedRecipes = this.state.savedRecipes
            .map((recipe, i) => (
                <SavedRecipeCard
                    key={i}
                    info={recipe}>
                </SavedRecipeCard>
            )
        );
        
        if (!this.props.verified) {
            return (
                <div>
                    <Helmet>
                        <title>{'Magellan - Profile'}</title>
                    </Helmet>

                    <div id='notYetLoggedInNotice'>
                        You must be signed in to view your profile

                        <div>
                            Click&nbsp;
                            <span>
                                <Link
                                    to={{
                                        pathname: '/login',
                                        state: { source: '/user' }
                                    }}>
                                        here
                                </Link>
                            </span>
                            &nbsp;to sign in
                        </div>
                    </div>
                </div>
            )
        }

        //Saved recipe lookup not yet finished
        if (!this.state.loaded) {
            return (
                <div id='userLoadingNotice'>
                    Loading
                    <BeatLoader size={20} margin={5} />
                </div>
            );
        }
    
        return (
            <div id='userDetails'>
                <Helmet>
                    <title>{'Magellan - Profile'}</title>
                </Helmet>

                <div id='welcomeNotice'>
                    Welcome!
                </div>

                <div id='emailNotice'>
                    You are signed in as
                    <div id='emailValue'>{this.state.email}</div>
                </div>

                { formattedRecipes.length
                  ? <div id='savedRecipes'>
                        <div id='savedRecipesNotice'>
                            Your saved recipes:
                        </div>

                        <div id='recipeList'>
                            {formattedRecipes}
                        </div>
                    </div>

                  : <div id='noSavedRecipesNotice'>
                        You do not have any saved recipes
                    </div>
                }
            </div>
        );
    }
}
