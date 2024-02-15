import mongoose, { Schema } from "mongoose";

const CareerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    salary: {
        type: {
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            },
            currency: {
                type: String
            }
        },
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['published', 'draft'],
        default: 'draft'
    },
    level: {
        type: String,
        enum: ['internship', 'associate', 'junior', 'mid-level', 'senior'],
        default: 'junior'
    },
    work_location: {
        type: String,
        enum: ['Onsite', 'Remote', 'Hybrid'],
        default: 'Onsite'
    },
    shortid: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Career = mongoose.model('Career', CareerSchema);
export default Career;