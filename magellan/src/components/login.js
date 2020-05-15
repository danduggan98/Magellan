import React, {Component} from 'react';
import '../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id='loginWrapper'>
                <div id="loginHeader">Log In</div>
                <form
                    name='loginForm'>

                    <div id='usernameInputWrapper'>
                        <input
                            name='UN'
                            id='usernameInput'
                            type='text'
                            autoComplete='off'
                            placeholder='Username'>
                        </input>
                    </div>

                    <div id='passwordInputWrapper'>
                        <input
                            name='PW'
                            id='passwordInput'
                            type='password'
                            autoComplete='off'
                            placeholder='Password'>
                        </input>
                    </div>

                </form>
            </div>
        );
    }
}

export default Login;
