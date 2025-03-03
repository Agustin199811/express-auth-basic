import { NextFunction, Response } from "express";
import { AuthRequest } from "../interface/auth.interface";

export function authorizeRoles(...allowedRoles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !Array.isArray(req.user.roles)) {
            return res.status(403).json({ message: 'Acess denied' });
        }
        const userRoles = new Set(req.user.roles);
        const hasRole = allowedRoles.some((role) => userRoles.has(role));
        if (!hasRole) {
            return res.status(403).json({ message: 'Insufficent permission' });
        }

        next();
    }
}