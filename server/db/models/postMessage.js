import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
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
        default: new Date(),
    },
})

var PostMessage = mongoose.model('Posts', postSchema);

export default PostMessage;