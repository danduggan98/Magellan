"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Middleware to validate JSON web tokens from API requests
// Add this to any API route to make it private/require login
// On failure, sends a 'false' flag and an error message
// On success, stores the user email in the request and moves to the next function
function verifyJWT(req, res, next) {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({
                verified: false,
                auth_error: 'Access denied - You must log in to reach this page'
            });
        }
        const secret = process.env.JWT_SECRET || '';
        const validToken = jsonwebtoken_1.default.verify(token, secret);
        if (!validToken) {
            return res.status(401).json({
                verified: false,
                auth_error: 'Access denied - invalid token'
            });
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log('Error verifying JWT:', err);
    }
}
exports.default = verifyJWT;
