import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import notiReducer from './noti';


export const reducers = combineReducers({ posts, auth, notiReducer });
