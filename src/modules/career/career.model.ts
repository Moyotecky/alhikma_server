import mongoose, { Schema } from "mongoose";

const CareerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    salary: {
        type: {
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
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
    isHired: {
      type: Boolean,
      default: false  
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