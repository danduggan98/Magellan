import React, { Component } from 'react';
import Banner from './components/banner';
import Recipe from './components/recipe';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import User from './components/user';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

interface State {
    verified: boolean,
    auth_error: string
};

export default class App extends Component {
    state: State = {
        verified: false,
        auth_error: ''
    };

    async updateLoginStatus() {
        const response  = await fetch('/auth/verified');
        const authCheck = await response.json();

        this.setState({
            verified:   authCheck.verified,
            auth_error: authCheck.auth_error
        });
    }

    componentDidMount() {
        this.updateLoginStatus();
    }

    async logout() {
        const response  = await fetch('/auth/logout');
        const logoutStatus = await response.json();

        this.setState({
            verified:   logoutStatus.verified,
            auth_error: logoutStatus.auth_error
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Banner
                        verified={this.state.verified}
                        auth_error={this.state.auth_error}
                        logout={this.logout.bind(this)}>
                    </Banner>

                    <Switch>
                        <Route
                            path={'/home'}
                            component={Home}>
                        </Route>

                        <Route
                            path={'/recipe/:recipeid'}
                            render={(props) => (
                                <Recipe
                                    {...props}
                                    verified={this.state.verified}>
                                </Recipe>
                            )}>
                        </Route>

                        <Route
                            path={'/register'}
                            render={(props) => (
                                <Register
                                    {...props}
                                    verified={this.state.verified}>
                                </Register>
                            )}>
                        </Route>

                        <Route
                            path={'/login'}
                            render={(props) => (
                                <Login
                                    {...props}
                                    verified={this.state.verified}
                                    updateLoginStatus={this.updateLoginStatus.bind(this)}>
                                </Login>
                            )}>
                        </Route>

                        <Route
                            path={'/user'}
                            render={(props) => (
                                <User
                                    {...props}
                                    verified={this.state.verified}>
                                </User>
                            )}>
                        </Route>

                        <Route
                            path={'/'}>
                            <Redirect to={'/home'} />
                        </Route>
                    </Switch>

                </Router>
            </div>
        );
    }
}
