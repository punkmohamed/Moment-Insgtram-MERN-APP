import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3001/api',

    withCredentials: true,
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/post/${id}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const getUserLikedPosts = (id) => API.get(`/posts/getLikedPosts/${id}`);
export const getUserCommentedPosts = (id) => API.get(`/posts/getUserCommentedPosts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts/add', newPost);
export const likePost = (id) => API.patch(`/posts/likePost/${id}`);
export const comment = (value, id, user) => API.post(`/posts/comment/${id}`, { comment: value, user });
export const updatePost = (id, updatedPost) => API.patch(`/posts/update/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/delete/${id}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const userList = () => API.get('/user');
export const updateUser = (formData, id) => API.patch(`/user/update/${id}`, formData);
