import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../styles/login.css';

interface Props {
    verified: boolean,
    updateLoginStatus: () => Promise<void>
}

interface State {
    email: string,
    password: string,
    errors: string[],
    redirectAfterSumbit: boolean
};

export default class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.updateLoginStatus = props.updateLoginStatus;
        this.state = {
            email: '',
            password: '',
            errors: [],
            redirectAfterSumbit: false
        };
    }

    updateLoginStatus() {}

    //Store the most recent inputs in state
    updateInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let { id, value } = event.currentTarget;

        id === 'email'
            ?
            this.setState({
                email: value
            })

            :
            this.setState({
                password: value
            })
        ;
    }

    //Submit the form and save any errors that might have returned
    submitPage = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const inputs = JSON.stringify({
            email:    this.state.email,
            password: this.state.password
        });

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: inputs
        };

        try {
            (async() => {
                const response = await fetch('/auth/login', options);
                const errors: string[] = await response.json();
                
                if (!errors.length) {
                    this.updateLoginStatus();
                    this.setState({
                        redirectAfterSumbit: true
                    });
                }
                else {
                    this.setState({
                        errors
                    });
                }
            })();
        }
        catch (err) {
            console.log('Error submitting login form:', err);
        }
    }

    render() {
        if (this.props.verified) {
            return (
                <div>
                    <h3>You are already logged in</h3>
                    <h4>Click
                        <span>
                            <Link to='/home'>
                                here
                            </Link>
                        </span>
                        to return to the home page
                    </h4>
                </div>
            )
        }
        
        if (this.state.redirectAfterSumbit) {
            return (<Redirect to='/home' />);
        }

        return (
            <div id='loginWrapper'>
                <div id='loginHeader'>Log In</div>

                <form
                    name='loginForm'
                    onSubmit={this.submitPage}>

                    <div>ERRORS:
                        {
                        this.state.errors.length
                            ? this.state.errors
                            : ''
                        }
                    </div>

                    <div id='inputWrapper'>
                        <label
                            id='emailLabel'
                            className='label'
                            htmlFor='email'>
                                Email Address:
                        </label>
                        <input
                            className='input'
                            id='email'
                            name='email'
                            type='text'
                            autoComplete='off'
                            placeholder='Email Address'
                            value={this.state.email}
                            onChange={this.updateInput}>
                        </input>

                        <label
                            id='passwordLabel'
                            className='label'
                            htmlFor='password'>
                                Password:
                        </label>
                        <input
                            className='input'
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='off'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.updateInput}>
                        </input>
                    </div>

                    <div id='registerLink'>
                        Don't have an account yet?
                        <Link to='/register'>
                            Register here
                        </Link>
                    </div>

                    <div id='submitButtonWrapper'>
                        <button
                            type='submit'
                            id='submitButton'>
                                Submit
                        </button>
                    </div>
                </form>

            </div>
        );
    }
}
