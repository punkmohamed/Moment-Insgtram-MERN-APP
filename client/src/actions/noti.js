import { START_LOADING, END_LOADING, DELETE_NOTIFICATIONS, UPDATE_NOTIFICATIONS, GET_NOTIFICATIONS } from '../constants/actionTypes';
import * as api from '../api/index.js';



export const getNotifications = () => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getNotifications(user?.token);
        console.log(data, 'datadatadatadata');

        dispatch({ type: GET_NOTIFICATIONS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};
// const user = JSON.parse(localStorage.getItem('profile'));


//   const { data } = await api.likePost(id, user?.token);


export const updateNotifications = (read) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.updateNotifications(read, user?.token);
        dispatch({ type: UPDATE_NOTIFICATIONS, payload: data });
    } catch (error) {
        console.log(error);
    }
};



export const deleteNotifications = (id) => async (dispatch) => {
    try {
        await api.deleteNotifications(id);

        dispatch({ type: DELETE_NOTIFICATIONS, payload: id });
    } catch (error) {
        console.log(error);
    }
};
