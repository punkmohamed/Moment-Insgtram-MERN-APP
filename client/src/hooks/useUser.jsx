import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionTypes';
import { getPostsByCreator, getPostsBySearch } from '../actions/posts';
import { updateUser } from '../actions/auth';
const initialState = { imageUrl: '' };
const useUser = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [form, setForm] = useState(initialState);
    const [userID, setUserID] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userImg, setUserImg] = useState(false);
    const location = useLocation();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { name } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const handleFileUpload = ({ base64 }) => {
        setForm({ ...form, imageUrl: base64 });
    };

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history('/auth');
        setUser(null);
    };
    useEffect(() => {
        const token = user?.token;
        const tokenCheckTimeout = setTimeout(() => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    if (decodedToken.exp * 1000 < new Date().getTime()) {
                        logout();
                    }
                } catch (error) {
                    console.log("Token decoding failed:", error);
                    logout();
                }
            }
            setUser(JSON.parse(localStorage.getItem('profile')));
        }, 500);
        setUserID(user?.result?._id);

        console.log("did mount after update")
        return () => clearTimeout(tokenCheckTimeout);
    }, [dispatch, location, userImg]);


    useEffect(() => {
        if (location.pathname.startsWith('/tags')) {
            dispatch(getPostsBySearch({ tags: name }));
        } else {
            dispatch(getPostsByCreator(name));
        }
    }, [dispatch, location.pathname, name]);
    const handleConfirmUpdate = () => {
        dispatch(updateUser(form, userID))
        setShowModal(false);
        setUserImg(true)
    }

    return { showModal, pathname, handleSubmit, handleFileUpload, logout, handleConfirmUpdate, form, setShowModal, user, userImg }
}

export default useUser