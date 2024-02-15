import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String],
        default: []
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            user: String,
            content: String,
            date: { type: Date, default: Date.now }
        }
    ],
    images: [String],
    isTrending: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    },
});

const Article = mongoose.model("Article", ArticleSchema);
export default Article;