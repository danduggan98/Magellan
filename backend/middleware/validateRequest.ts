import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function verifyJWT(req: Request, res: Response) {
    try {
        const token = req.header('auth-token') || '';
        const secret = process.env.JWT_SECRET || '';
        const validToken = jwt.verify(token, secret);

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