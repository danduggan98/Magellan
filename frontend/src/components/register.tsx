import React, { Component } from 'react';
import '../styles/register.css';

interface State {
    emailInput: string,
    passwordInput: string,
    confirmPasswordInput: string
};

export default class Register extends Component {
    state: State = {
        emailInput: '',
        passwordInput: '',
        confirmPasswordInput: ''
    };

    //Store the most recent inputs in state
    updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { id, value } = event.currentTarget;
        this.setState({ [id]: value });
    }

    render() {
        return (
            <div id='registerWrapper'>
                <div id='registerHeader'>Create an account</div>

                <form
                    name='registerForm'
                    action='/auth/register'
                    method='POST'>

                    <div id='formWrapper'>
                        <label
                            id='emailLabel'
                            className='label'
                            htmlFor='emailInput'>
                                Email Address:
                        </label>
                        <input
                            className='input'
                            id='emailInput'
                            name='email'
                            type='text'
                            autoComplete='off'
                            placeholder='Email Address'
                            value={this.state.emailInput}
                            onChange={this.updateInput}>
                        </input>

                        <label
                            id='passwordLabel'
                            className='label'
                            htmlFor='passwordInput'>
                                Password:
                        </label>
                        <input
                            className='input'
                            id='passwordInput'
                            name='password'
                            type='password'
                            autoComplete='off'
                            placeholder='Password'
                            value={this.state.passwordInput}
                            onChange={this.updateInput}>
                        </input>

                        <label
                            id='confirmPasswordLabel'
                            className='label'
                            htmlFor='confirmPasswordInput'>
                                Confirm Password:
                        </label>
                        <input
                            className='input'
                            id='confirmPasswordInput'
                            name='confirmPassword'
                            type='password'
                            autoComplete='off'
                            placeholder='Confirm Password'
                            value={this.state.confirmPasswordInput}
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
