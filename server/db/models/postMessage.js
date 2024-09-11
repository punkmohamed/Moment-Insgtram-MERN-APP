import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true },  // Required validation
    message: { type: String, required: true },  // Required validation
    name: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            message: String,
            selectedFile: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,  // Simplified default
    },
});

var PostMessage = mongoose.model('Posts', postSchema);  // Changed to singular for consistency

export default PostMessage;
