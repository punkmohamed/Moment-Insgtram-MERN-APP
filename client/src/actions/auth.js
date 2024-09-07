import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import * as actionType from '../constants/actionTypes';
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};
export const userList = () => async (dispatch) => {
  try {
    const { data } = await api.userList();
    dispatch({ type: actionType.FETCH_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (formData, id) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData, id);

    dispatch({ type: AUTH, data });

  } catch (error) {
    console.log(error);
  }
};
