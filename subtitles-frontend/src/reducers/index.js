import {combineReducers} from 'redux';

import { getAuthCookie } from '../actions/api';
import {
  UPDATE_QUERY,
  SEARCH_REQUESTED,
  SEARCH_RECEIVED,
  PAGE_CHANGE_RECEIVED,
  PAGE_CHANGE_REQUESTED,
  LOGIN_REQUESTED,
  LOGIN_RECEIVED,
  LOGIN_FAILED,
  LOGOUT_REQUESTED,
  LOGOUT_RECEIVED,
  CLEAR_VIDEOS,
  ERROR_RECEIVED
} from '../actions/constants';
import { defaultDataState, defaultUserState} from '../constants'

// TODO: move to other location
const get_default_user_state = () => {
  const token = getAuthCookie();
  console.log(token);
  return {...defaultUserState, authenticated: typeof token !== 'undefined'};
}
const defaultLoginState = get_default_user_state()

const loginReducer = (state=defaultLoginState, action) => {
	switch(action.type) {
	case LOGIN_REQUESTED:
		return {...state, loading: true};
	case LOGIN_RECEIVED:
		return {...state, loading: false, authenticated: true};
	case LOGIN_FAILED:
		return {...state, loading: false, authenticated: false};
	case LOGOUT_RECEIVED:
		return {...state, authenticated: false};
	case LOGOUT_REQUESTED:
		return {...state};
	}
	return state;
};


const defaultReducer = (state=defaultDataState, action) => {
	switch (action.type) {
	case UPDATE_QUERY:
		return {...state, query: action.query};
	case SEARCH_REQUESTED:
		return {...state, loading: true};
	case SEARCH_RECEIVED:
		return {...state, loading: false, videos: action.videos, totalLength: action.totalLength, totalPages: action.totalPages};
	case PAGE_CHANGE_REQUESTED:
		return {...state, loading: true, page: action.page};
	case PAGE_CHANGE_RECEIVED:
		return {...state, loading: false, videos: action.videos, totalLength: action.totalLength};
  case CLEAR_VIDEOS:
    return {...state, ...defaultDataState};
	}

	return state;
};

const errorReducer = (state={}, action) => {
  switch(action.type) {
  case ERROR_RECEIVED:
    return {...state, error: true, message: action.message, code: action.code};
  }
  return state;
}

export default combineReducers({
	user: loginReducer,
	data: defaultReducer,
  error: errorReducer
});
