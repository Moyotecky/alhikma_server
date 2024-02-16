import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    vToken: {
        type: String
    }
});

export default mongoose.model("User", UserSchema)


const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    }
});

export const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);