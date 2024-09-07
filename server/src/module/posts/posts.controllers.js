
import PostMessage from '../../../db/models/postMessage.js';
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex).populate('creator', 'name imageUrl')
            .populate('comments.user', 'name imageUrl');
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;
    try {
        const posts = await PostMessage.find({ name }).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getUserLikedPosts = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await PostMessage.find({ likes: id }).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getUserCommentedPosts = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await PostMessage.find({ 'comments.user': id }).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true }).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true }).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');

    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment, user } = req.body;

    try {
        const post = await PostMessage.findById(id);
        const commentData = {
            user: user?.result?._id,
            message: comment.message,
            selectedFile: comment.selectedFile,
        };
        post.comments.push(commentData);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true }).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
