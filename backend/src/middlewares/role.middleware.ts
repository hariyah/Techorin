import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export function permit(...allowedRoles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }
    next();
    };
}
