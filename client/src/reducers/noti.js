import { DELETE_NOTIFICATIONS, UPDATE_NOTIFICATIONS, GET_NOTIFICATIONS } from '../constants/actionTypes';

const notiReducer = (state = { isLoading: true, notification: [] }, action) => {


    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case GET_NOTIFICATIONS:
            return { ...state, notification: action.payload.data, loading: false, errors: null };
        case UPDATE_NOTIFICATIONS:
            return { ...state, posts: state.notification.map((notification) => (notification._id === action.payload._id ? action.payload : notification)) };
        case DELETE_NOTIFICATIONS:
            return {
                ...state, posts: state.notification.filter((notification) => notification._id !== action.payload),
            };
        default:
            return state;
    }
};

export default notiReducer;
