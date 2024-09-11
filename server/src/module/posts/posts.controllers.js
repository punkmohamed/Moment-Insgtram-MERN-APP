
import notifictionsmodel from '../../../db/models/notifications.js';
import PostMessage from '../../../db/models/postMessage.js';
import mongoose from "mongoose";
import UserModal from "../../../db/models/user.js";
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
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags?.split(',') } }] });
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
        // req.io.emit('postCommented', { data: posts });
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
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();

        // req.io.emit('newPostMessage', newPostMessage);
        res.status(201).json(newPostMessage);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(409).json({ message: error.message });
    }
}


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    const results = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true }).populate('creator', 'name imageUrl').populate('comments.user', 'name imageUrl');
    req.io.emit('updatedPost', results);
    res.json(results);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndDelete(id);
    // req.io.emit('postDeleted', id);
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
    const senderName = await UserModal.findById(req.userId)

    if (String(post.creator._id) !== String(req.userId)) {
        const commentNotifications = new notifictionsmodel({
            reciver: post.creator._id,
            sender: senderName,
            message: `${senderName?.name} liked your post.`,
            type: 'like',
            link: id,
        });
        await commentNotifications.save();

        // Emit notification only to the post creator if they are connected
        const creatorSocketId = req.connectedUsers[post.creator._id]; // Get creator's socket ID

        if (creatorSocketId) {
            req.io.to(creatorSocketId).emit('notifications', commentNotifications);
        }
    }

    req.io.emit('likePost', updatedPost);


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
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { $push: { comments: commentData } }, { new: true })
            .populate('creator', 'name imageUrl')
            .populate({
                path: 'comments.user',
                select: 'name imageUrl'
            });
        const senderName = await UserModal.findById(user?.result?._id)
        if (String(post.creator._id) !== String(user?.result?._id)) {
            const commentNotifications = new notifictionsmodel({
                reciver: post.creator._id,
                sender: senderName,
                message: `${senderName?.name} commented on your post.`,
                type: 'comment',
                link: id,
            });
            await commentNotifications.save()
            const creatorSocketId = req.connectedUsers[post.creator._id];
            if (creatorSocketId) {
                req.io.to(creatorSocketId).emit('notifications', commentNotifications);
            }
        }
        req.io.emit('postCommented', updatedPost.comments[updatedPost.comments.length - 1]);

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
