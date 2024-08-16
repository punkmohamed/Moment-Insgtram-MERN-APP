import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost } from './posts.controllers.js';

const router = express.Router();
import auth from "../../../middleware/auth.js";

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/post/:id', getPost);

router.post('/add', auth, createPost);
router.patch('/update/:id', auth, updatePost);
router.delete('/delete/:id', auth, deletePost);
router.patch('/likePost/:id', auth, likePost);
router.post('/comment/:id', commentPost);

export default router;