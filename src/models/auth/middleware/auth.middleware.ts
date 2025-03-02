import { NextFunction, Response } from "express";
import { AuthRequest } from "../interface/auth.interface";
import jwt from 'jsonwebtoken';

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
}