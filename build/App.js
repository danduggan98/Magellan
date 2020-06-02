"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const recipe_js_1 = __importDefault(require("./components/recipe.js"));
const home_js_1 = __importDefault(require("./components/home.js"));
const login_js_1 = __importDefault(require("./components/login.js"));
const react_router_dom_1 = require("react-router-dom");
require("./styles/App.css");
function App() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("div", { id: 'logoBanner' },
                react_1.default.createElement(react_router_dom_1.Link, { to: '/home', className: 'logo' }, "MAGELLAN"),
                react_1.default.createElement(react_router_dom_1.Link, { to: '/login', className: 'loginButton' }, "Log In")),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: '/recipe/:recipeid', component: recipe_js_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/home', component: home_js_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/login', component: login_js_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/' },
                    react_1.default.createElement(react_router_dom_1.Redirect, { to: '/home' }))))));
}
exports.default = App;
