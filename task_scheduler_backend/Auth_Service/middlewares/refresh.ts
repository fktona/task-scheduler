import jwt from 'jsonwebtoken';
import config from '../config';
import db from '../models';
import { Request, Response  , NextFunction} from 'express';
import { UserRegistration } from '@types';
const User = db.user;


 export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    let token:any = req.headers['x-access-token'] || req.headers['authorization'];


    if (typeof token === 'string' && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.secret, (err:any, decoded:any) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};



export const protectedRoute = async (req: Request, res: Response) => {
    try {
        // Assuming User.findById returns a Promise that resolves to a Mongoose Document or null
        const user: Document | null = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('protected route', user);

        // Assuming _doc is a property of the Mongoose Document containing the document data
        const  _doc  = user;

        res.status(200).json({ ..._doc, message: 'user authenticated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

