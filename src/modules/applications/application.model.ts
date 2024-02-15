import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    resume_url: {
        type: String,
        required: true
    },
    date_applied: {
        type: Date,
        default: Date.now
    },
    job_id: {
        type: Schema.Types.ObjectId,
        ref: 'Career',
    },
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'rejected', 'hired'],
        default: 'pending'
    },
    source: String,
    additional_documents: [String],
    metadata: {
        ip_address: String,
        user_agent: String,
        referral_source: String
    }
});

const Application = mongoose.model('Application', ApplicationSchema);
export default Application;
