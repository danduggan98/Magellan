import React, { Component } from 'react';
import '../styles/register.css';

interface State {
    email: string,
    password: string,
    confirmPassword: string,
    errors: string[]
};

export default class Register extends Component {
    state: State = {
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
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
        console.log('VALUES SENT TO SUBMITPAGE:', inputs)

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
                console.log('fetching results')
                console.log('options at fetch time', options)
                const response = await fetch('/auth/register', options);
                const errs: string[] = await response.json();
                console.log('results from server:', errs);

                this.setState({
                    errors: errs.map(
                        err => err.toString()
                    )
                });
            })();
        }
        catch (err) {
            console.log('Error submitting registration form:', err);
        }
    }

    render() {
        return (
            <div id='registerWrapper'>
                <div id='registerHeader'>Create an account</div>

                <form
                    name='registerForm'
                    onSubmit={this.submitPage}>

                    <div>ERRORS:
                        {
                        this.state.errors.length
                            ? this.state.errors
                            : ''
                        }
                    </div>

                    <div id='formWrapper'>
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
