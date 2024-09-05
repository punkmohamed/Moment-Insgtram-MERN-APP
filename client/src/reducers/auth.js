import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, userList: [] }, action) => {

  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.FETCH_USERS:
      return { ...state, userList: action.payload, loading: false, errors: null };

    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, userList: [], loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
