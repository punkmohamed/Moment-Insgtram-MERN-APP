import axios from 'axios';

const API = axios.create({ baseURL: 'https://moment-insgtram-mern-api.vercel.app/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/post/${id}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts/add', newPost);
export const likePost = (id) => API.patch(`/posts/likePost/${id}`);
export const comment = (value, id) => API.post(`/posts/comment/${id}`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/update/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/delete/${id}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
