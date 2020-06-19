"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../styles/login.css");
;
class Login extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            usernameInput: '',
            passwordInput: ''
        };
        //Store the most recent inputs in state
        this.updateInput = (event) => {
            let { id, value } = event.currentTarget;
            this.setState({ [id]: value });
        };
        this.submitPage = () => {
            if (!this.state.usernameInput) {
                console.log('PLEASE ENTER USERNAME');
            }
            if (!this.state.passwordInput) {
                console.log('PLEASE ENTER PASSWORD');
            }
        };
    }
    render() {
        return (react_1.default.createElement("div", { id: 'loginWrapper' },
            react_1.default.createElement("div", { id: 'loginHeader' }, "Log In"),
            react_1.default.createElement("form", { name: 'loginForm', target: 'hiddenFrame', onSubmit: this.submitPage },
                react_1.default.createElement("div", { id: 'inputWrapper' },
                    react_1.default.createElement("div", { id: 'usernameInputWrapper' },
                        react_1.default.createElement("label", { id: 'usernameLabel', htmlFor: 'usernameInput' }, "Username:"),
                        react_1.default.createElement("input", { name: 'UN', id: 'usernameInput', type: 'text', autoComplete: 'off', placeholder: 'Username', value: this.state.usernameInput, onChange: this.updateInput })),
                    react_1.default.createElement("div", { id: 'passwordInputWrapper' },
                        react_1.default.createElement("label", { id: 'passwordLabel', htmlFor: 'passwordInput' }, "Password:"),
                        react_1.default.createElement("input", { name: 'PW', id: 'passwordInput', type: 'password', autoComplete: 'off', placeholder: 'Password', value: this.state.passwordInput, onChange: this.updateInput }))),
                react_1.default.createElement("div", { id: 'submitButtonWrapper' },
                    react_1.default.createElement("button", { type: 'submit', id: 'submitButton' }, "Submit"))),
            react_1.default.createElement("iframe", { name: 'hiddenFrame', id: 'iframe', title: 'hidden' })));
    }
}
exports.default = Login;
