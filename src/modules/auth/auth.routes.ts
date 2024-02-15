import { Router } from "express";
import AuthController from "./auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.get("/logout/:id", authController.logoutUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export default router;