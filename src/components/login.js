import React, {Component} from 'react';
import '../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInput: '',
            passwordInput: ''
        };
    }

    //Store the most recent inputs in state
    updateInput = (val) => {
        let { id, value } = val.target;
        this.setState({ [id]: value });
    }

    submitPage = (val) => {
        if (!this.state.usernameInput) {
            console.log('PLEASE ENTER USERNAME');
        }
        if (!this.state.passwordInput) {
            console.log('PLEASE ENTER PASSWORD');
        }
    }

    render() {
        return (
            <div id='loginWrapper'>
                <div id='loginHeader'>Log In</div>
                <form
                    name='loginForm'
                    target='hiddenFrame'
                    onSubmit={this.submitPage}>

                    <div id='inputWrapper'>
                        <div id='usernameInputWrapper'>
                            <label id='usernameLabel' htmlFor='usernameInput'>Username:</label>
                            <input
                                name='UN'
                                id='usernameInput'
                                type='text'
                                autoComplete='off'
                                placeholder='Username'
                                value={this.state.username}
                                onChange={this.updateInput}>
                            </input>
                        </div>

                        <div id='passwordInputWrapper'>
                            <label id='passwordLabel' htmlFor='passwordInput'>Password:</label>
                            <input
                                name='PW'
                                id='passwordInput'
                                type='password'
                                autoComplete='off'
                                placeholder='Password'
                                value={this.state.password}
                                onChange={this.updateInput}>
                            </input>
                        </div>
                    </div>

                    <div id='submitButtonWrapper'>
                        <button
                            type='submit'
                            id='submitButton'>
                                Submit
                        </button>
                    </div>
                </form>

                {/* Form redirects to this invisible iframe, keeping it on the same page */}
                <iframe name='hiddenFrame' id='iframe' title='hidden'></iframe>
            </div>
        );
    }
}

export default Login;
