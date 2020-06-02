import React, { Component } from 'react';
import '../styles/login.css';
class Login extends Component {
    constructor(props) {
        super(props);
        //Store the most recent inputs in state
        this.updateInput = (val) => {
            let { id, value } = val.target;
            this.setState({ [id]: value });
        };
        this.submitPage = (val) => {
            if (!this.state.usernameInput) {
                console.log('PLEASE ENTER USERNAME');
            }
            if (!this.state.passwordInput) {
                console.log('PLEASE ENTER PASSWORD');
            }
        };
        this.state = {
            usernameInput: '',
            passwordInput: ''
        };
    }
    render() {
        return (React.createElement("div", { id: 'loginWrapper' },
            React.createElement("div", { id: 'loginHeader' }, "Log In"),
            React.createElement("form", { name: 'loginForm', target: 'hiddenFrame', onSubmit: this.submitPage },
                React.createElement("div", { id: 'inputWrapper' },
                    React.createElement("div", { id: 'usernameInputWrapper' },
                        React.createElement("label", { id: 'usernameLabel', htmlFor: 'usernameInput' }, "Username:"),
                        React.createElement("input", { name: 'UN', id: 'usernameInput', type: 'text', autoComplete: 'off', placeholder: 'Username', value: this.state.username, onChange: this.updateInput })),
                    React.createElement("div", { id: 'passwordInputWrapper' },
                        React.createElement("label", { id: 'passwordLabel', htmlFor: 'passwordInput' }, "Password:"),
                        React.createElement("input", { name: 'PW', id: 'passwordInput', type: 'password', autoComplete: 'off', placeholder: 'Password', value: this.state.password, onChange: this.updateInput }))),
                React.createElement("div", { id: 'submitButtonWrapper' },
                    React.createElement("button", { type: 'submit', id: 'submitButton' }, "Submit"))),
            React.createElement("iframe", { name: 'hiddenFrame', id: 'iframe', title: 'hidden' })));
    }
}
export default Login;
