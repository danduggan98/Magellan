"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJWT(req, res) {
    try {
        const token = req.header('auth-token') || '';
        const secret = process.env.JWT_SECRET || '';
        const validToken = jsonwebtoken_1.default.verify(token, secret);
        if (token && validToken && req.session) {
            req.user = validToken; //Store the email from the token in our request
        }
        else {
            return res.status(401).json({
                error: 'You must log in to access this page'
            });
        }
    }
    catch (err) {
        console.log('Error verifying JWT:', err);
    }
}
exports.verifyJWT = verifyJWT;
