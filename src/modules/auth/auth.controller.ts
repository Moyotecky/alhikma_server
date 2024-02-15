import AuthService from "./auth.service";
import { Request, Response } from "express";

const authService = new AuthService();

export default class AuthController {
    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await authService.createUser({ name, email, password });
            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await authService.loginUser(email, password);
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async checkIfAdmin(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const isAdmin = await authService.checkIfAdmin(email);
            return res.status(200).json({ isAdmin });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async logoutUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedToken = await authService.logoutUser(id);
            return res.status(200).json({ deletedToken});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}