import fs from "fs";
import { sendEmail } from "./email-config";
import jwt from "jsonwebtoken";
import logger from "../logging/logger";

const platformName =  process.env.PLATFORM_NAME || "Alhikma";

async function sendVerificationEmail(user: any): Promise<void> {
        try {
            const token = (Math.floor(100000 + Math.random() * 900000)).toString().padStart(6, '0');
            const html = fs.readFileSync("./src/utils/emails/templates/verifyAccount.html", "utf8");
            const url = `${process.env.FRONTEND_URL}/auth/verify-account/${token}`;
            const username = user.name;
            const email = user.email;
            await sendEmail(
                email,
                "Verify your account",
                html.replace("{{username}}", username).replace("{{platformName}}", platformName).replace("{{url}}", url));
        } catch (error) {
            throw error;
        }
    }

async function sendForgotPasswordEmail(user: any): Promise<void> {
    try {
        const token = user.vToken;
        const jwtToken = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "12m" });
        const html = fs.readFileSync("./src/utils/emails/templates/forgotPassword.html", "utf8");
        const url = `${process.env.FRONTEND_URL}/auth/forgot-password/${jwtToken}`;
        const username = user.name;
        const email = user.email;
        await sendEmail(
            email,
            "Reset your password",
            html.replace("{{username}}", username).replace("{{platformName}}", platformName).replace("{{url}}", url).replace("{{token}}", token));
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

export { sendVerificationEmail, sendForgotPasswordEmail }