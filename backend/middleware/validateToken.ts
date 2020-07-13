import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

//Middleware to validate JSON web tokens from API requests
// Add this to any API route to make it private/require login
// On failure, sends a 'false' flag and an error message
// On success, stores the user email in the request and moves to the next function

export default function verifyJWT(req: Request, res: Response, next: NextFunction): Response | void {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({
                verified: false,
                auth_error: 'Access denied - You must log in to reach this page'
            });
        }

        const secret = process.env.JWT_SECRET || '';
        const validToken = jwt.verify(token, secret);

        if (!validToken) {
            return res.status(401).json({
                verified: false,
                auth_error: 'Access denied - invalid token'
            });
            
        }
        else {
            req.user = validToken; //Store the email from the token in our request
            next();
        }
    }
    catch (err) {
        console.log('Error verifying JWT:', err);
    }
}