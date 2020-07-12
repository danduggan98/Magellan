import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

//Middleware to validate JSON web tokens in requests
// Add to any api route to make it private
export default function verifyJWT(req: Request, res: Response) {
    try {
        const token = req.header('auth-token') || '';
        const secret = process.env.JWT_SECRET || '';
        const validToken = jwt.verify(token, secret);

        if (token && validToken && req.session) {
            req.user = validToken; //Store the email from the token in our request
        }
        else {
            return res.status(401).json({
                error: 'Access denied - You must log in to reach this page'
            });
        }
    }
    catch (err) {
        console.log('Error verifying JWT:', err);
    }
}