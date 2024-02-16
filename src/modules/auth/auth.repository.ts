import { ObjectId } from "mongoose";
import { IUser } from "./auth.interface";
import User, { RefreshToken } from "./auth.model";

export default class AuthRepository {
    async createUser(user: IUser) {
        try {
            return await User.create(user);
        } catch (error) {
            throw error;
        }
    }

    async getUser(email: string) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

async updateUser(id: any, user: Partial<IUser>) {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

    async setVToken(id: string, token: string) {
        try {
            return await User.updateOne({ _id: id }, { vToken: token });
        } catch (error) {
            throw error;
        }
    }

    async setIsVerified(id: string, option: boolean) {
        try {
            return await User.updateOne({ _id: id }, { isVerified: option });
        } catch (error) {
            throw error;
        }
    }



    async getUserById(id: any) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async createRefreshToken(refreshToken: { token: string; user_id: any }) {
        try {
            return await RefreshToken.create(refreshToken);
        } catch (error) {
            throw error;
        }
    }

    async getRefreshTokenByUserId(user_id: string) {
        try {
            return await RefreshToken.findOne({ user_id });
        } catch (error) {
            throw error;
        }
    }

    async deleteRefreshToken(token: string) {
        try {
            return await RefreshToken.deleteOne({ token });
        } catch (error) {
            throw error;
        }
    }

    async deleteRefreshTokenByUserId(user_id: string) {
        try {
            return await RefreshToken.deleteOne({ user_id });
        } catch (error) {
            throw error;
        }
    }

    async checkIfAdmin(email: string) {
        try {
            return await User.findOne({ email, isAdmin: true });
        } catch (error) {
            throw error;
        }
    }

    async replaceRefreshToken(userId: string, newToken: string) {
        try {
            return await RefreshToken.replaceOne({ user_id: userId }, { token: newToken });
        } catch (error) {
            throw error;
        }
    }
}