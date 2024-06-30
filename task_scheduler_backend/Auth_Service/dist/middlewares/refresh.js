var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import config from '../config';
import db from '../models';
const User = db.user;
export const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (typeof token === 'string' && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};
export const protectedRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming User.findById returns a Promise that resolves to a Mongoose Document or null
        const user = yield User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('protected route', user);
        // Assuming _doc is a property of the Mongoose Document containing the document data
        const _doc = user;
        res.status(200).json(Object.assign(Object.assign({}, _doc), { message: 'user authenticated' }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
