import React, {Component} from 'react';
import '../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    //Store the most recent inputs in state
    updateInput = (val) => {
        console.log("WHADDUP");
        let { id, value } = val.target;
        id = id.toString().slice(0, -5); //usernameInput -> username, passwordInput -> password
        this.setState({ [id]: value });
    }

    submitPage = (val) => {}

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
                            placeholder='Username'
                            value={this.state.username}
                            onChange={this.updateInput}>
                        </input>
                    </div>

                    <div id='passwordInputWrapper'>
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

                </form>
            </div>
        );
    }
}

export default Login;
