import mongoose, { Schema } from "mongoose";

const CareerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
});