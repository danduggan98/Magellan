import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../styles/register.css';

interface State {
    email: string,
    password: string,
    confirmPassword: string,
    errors: string[],
    redirectAfterSumbit: boolean
};

export default class Register extends Component {
    state: State = {
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
        redirectAfterSumbit: false
    };

    //Store the most recent inputs in state
    updateInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let { id, value } = event.currentTarget;
        this.setState({ [id]: value });
    }

    //Submit the form and save any errors that might have returned
    submitPage = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const inputs = JSON.stringify({
            email:           this.state.email,
            password:        this.state.password,
            confirmPassword: this.state.confirmPassword
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
                const response = await fetch('/auth/register', options);
                const errors: string[] = await response.json();
                
                if (!errors.length) {
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
            console.log('Error submitting registration form:', err);
        }
    }

    render() {
        if (this.state.redirectAfterSumbit) {
            return (<Redirect to='/login' />);
        }

        return (
            <div id='registerWrapper'>
                <div id='registerHeader'>Create an account</div>

                <form
                    name='registerForm'
                    onSubmit={this.submitPage}>

                    <div>ERRORS:
                        { this.state.errors.length
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

                        <label
                            id='confirmPasswordLabel'
                            className='label'
                            htmlFor='confirmPassword'>
                                Confirm Password:
                        </label>
                        <input
                            className='input'
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            autoComplete='off'
                            placeholder='Confirm Password'
                            value={this.state.confirmPassword}
                            onChange={this.updateInput}>
                        </input>
                    </div>

                    <div id='registerLink'>
                        Already have an account?
                        <Link to='/login'>
                            Log in here
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
