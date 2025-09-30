import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";
import { AuthenticatedRequest } from "./jwt.middleware"; // Assuming AuthenticatedRequest is defined here

export const authorizeRoles = (roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
};
