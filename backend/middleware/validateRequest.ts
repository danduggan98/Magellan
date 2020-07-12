import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

//Middleware to validate JSON web tokens in requests
// Add to any api route to make it private
export default function verifyJWT(req: Request, res: Response): Response | void {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({
                auth_error: 'Access denied - You must log in to reach this page'
            });
        }

        const secret = process.env.JWT_SECRET || '';
        const validToken = jwt.verify(token, secret);

        if (validToken) req.user = validToken; //Store the email from the token in our request
        else {
            return res.status(401).json({
                auth_error: 'Access denied - invalid token'
            });
        }
    }
    catch (err) {
        console.log('Error verifying JWT:', err);
    }
}