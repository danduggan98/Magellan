import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login.css';

interface State {
    email: string,
    password: string,
    errors: string[],
    redirectAfterSumbit: boolean
};

export default class Login extends Component {
    state: State = {
        email: '',
        password: '',
        errors: [],
        redirectAfterSumbit: false
    };

    //Store the most recent inputs in state
    updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { id, value } = event.currentTarget;
        this.setState({ [id]: value });
    }

    submitPage = () => {
        
    }

    render() {
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
