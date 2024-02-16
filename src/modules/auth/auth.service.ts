import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthRepository from "./auth.repository";
import { IUser } from "./auth.interface";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../../utils/emails/email-functions";

const authRepository = new AuthRepository();

export default class AuthService {
    async createUser(user: IUser) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            user.isAdmin = false;
            const savedUser = await authRepository.createUser(user);
            const newToken = await authRepository.createRefreshToken({
                token: jwt.sign({ user_id: savedUser._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" }),
                user_id: savedUser._id
            });
            return { user: savedUser, token: newToken };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async loginUser(email: string, password: string) {
        try {
            const user = await authRepository.getUser(email);
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            const newToken = await authRepository.createRefreshToken({
                token: jwt.sign({ user_id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" }),
                user_id: user._id
            });
            return { user, token: newToken };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async forgotPassword(email: string) {
        try {
            const user = await authRepository.getUser(email);
            if (!user) {
                throw new Error("User not found");
            }
            const token = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
            user.vToken = token;
            const newUser = await authRepository.updateUser(user._id, user);
            console.log(newUser);
            await sendForgotPasswordEmail(newUser);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async resetPassword(email: string, token: string, password: string) {
        try {
            const user = await authRepository.getUser(email);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.vToken !== token) {
                throw new Error("Invalid token");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.vToken = "";
            return await authRepository.updateUser(user._id, user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserById(id: string) {
        try {
            return await authRepository.getUserById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async checkIfAdmin(email: string) {
        try {
            return await authRepository.checkIfAdmin(email);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async logoutUser(id: string) {
        try {
            return await authRepository.deleteRefreshTokenByUserId(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}