import { Request, Response, NextFunction } from "express";
import AuthService from "../modules/auth/auth.service";
import jwt from "jsonwebtoken";
import logger from "../utils/logging/logger";

const authService = new AuthService();

const tokenVerification = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as any;
        const user = await authService.getUserById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        logger.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const checkAdminMiddleware = async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};

export { tokenVerification, checkAdminMiddleware };