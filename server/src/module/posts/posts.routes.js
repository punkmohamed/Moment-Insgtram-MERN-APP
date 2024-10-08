import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getUserCommentedPosts, getUserLikedPosts, getPost, createPost, updatePost, likePost, commentPost, deletePost } from './posts.controllers.js';

const postRoutes = express.Router();
import auth from "../../../middleware/auth.js";

postRoutes.get('/creator', getPostsByCreator);
postRoutes.get('/search', getPostsBySearch);
postRoutes.get('/', getPosts);
postRoutes.get('/post/:id', getPost);
postRoutes.get('/getLikedPosts/:id', getUserLikedPosts);
postRoutes.get('/getUserCommentedPosts/:id', getUserCommentedPosts);

postRoutes.post('/add', auth, createPost);
postRoutes.patch('/update/:id', auth, updatePost);
postRoutes.delete('/delete/:id', auth, deletePost);
postRoutes.patch('/likePost/:id', auth, likePost);
postRoutes.post('/comment/:id', commentPost);

export default postRoutes;