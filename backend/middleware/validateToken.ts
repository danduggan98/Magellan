import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

//Middleware to validate JSON web tokens from API requests
// Add this to any API route to make it private/require login
// On failure, sends a 'false' flag and an error message
// On success, stores the user email in the request and moves to the next function

export default function verifyJWT(req: Request, res: Response, next: NextFunction): Response | void {

    //Check if the token exists
    const token = req.cookies['auth-token'];

    if (!token) {
        return res.status(401).json({
            verified: false,
            auth_error: 'Access denied - You must log in to reach this page'
        });
    }

    //Verify the token is valid before moving on
    try {
        const secret = <string>process.env.JWT_SECRET;
        const user: any = jwt.verify(token, secret);
        res.locals.user = user.email; //Store the email in our response
        next();
    }

    //If token verification fails, catch the error and send back an error message
    catch (err) {
        return res.status(400).json({
            verified: false,
            auth_error: 'Access denied - invalid token'
        });
    }
}
