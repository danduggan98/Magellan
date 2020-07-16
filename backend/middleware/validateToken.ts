import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

//Middleware to validate JSON web tokens from API requests
// Add this to any API route to make it private/require login
// On failure, sends a 'false' flag and an error message
// On success, stores the user email in the request and moves to the next function

export default function verifyJWT(req: Request, res: Response, next: NextFunction): Response | void {

    //Check the token exists
    const token = <string>req.headers['auth-token'];

    if (!token) {
        return res.status(401).json({
            verified: false,
            auth_error: 'Access denied - You must log in to reach this page'
        });
    }

    //Decode the token and store its user data in the request
    try {
        const secret = <string>process.env.JWT_SECRET;
        const tokenData = jwt.verify(token, secret);

        //Recreate the token, then pass it along with the user in our response
        const jwt_token = jwt.sign(
            { email: tokenData },
            <string>process.env.JWT_SECRET, 
            { expiresIn: '4h'}
        );

        res.setHeader('auth-token', jwt_token);
        res.locals.user = tokenData;
        next();
    }
    catch (err) {
        return res.status(400).json({
            verified: false,
            auth_error: 'Access denied - invalid token'
        });
    }
}
