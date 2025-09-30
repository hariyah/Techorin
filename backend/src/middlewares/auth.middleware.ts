import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.util";

export interface AuthRequest extends Request {
    user?: any;
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Missing Authorization header" });

    const token = authHeader.split(" ")[1];
    const payload = verifyJwt<any>(token);
    if (!payload) return res.status(401).json({ message: "Invalid/Expired token" });

    req.user = payload;
    next();
}
