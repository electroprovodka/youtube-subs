import {combineReducers} from 'redux';
import {
  UPDATE_QUERY,
  SEND_SEARCH_QUERY,
  RECEIVE_SEARCH_RESULTS,
  PAGE_CHANGE_RESPONSE,
  PAGE_CHANGE_REQUEST,
  LOGIN_REQUESTED,
  LOGIN_RECEIVED,
  LOGIN_FAILED,
  LOGOUT_REQUESTED,
  LOGOUT_RECEIVED
} from '../actions/constants';

const loginReducer = (state={}, action) => {
	switch(action.type) {
	case LOGIN_REQUESTED:
		return {...state, loading: true};
	case LOGIN_RECEIVED:
		return {...state, loading: false, isAuthenticated: true};
	case LOGIN_FAILED:
		return {...state, loading: false, isAuthenticated: false};
	case LOGOUT_RECEIVED:
		return {...state, isAuthenticated: false};
	case LOGOUT_REQUESTED:
		return {...state};
	}
	return state;
};

const defaultReducer = (state={}, action) => {
	switch (action.type) {
	case UPDATE_QUERY:
		return {...state, query: action.query};
	case SEND_SEARCH_QUERY:
		return {...state, loading: true};
	case RECEIVE_SEARCH_RESULTS:
		return {...state, loading: false, videos: action.videos, totalLength: action.totalLength, totalPages: action.totalPages};
	case PAGE_CHANGE_REQUEST:
		return {...state, loading: true, page: action.page};
	case PAGE_CHANGE_RESPONSE:
		return {...state, loading: false, videos: action.videos, totalLength: action.totalLength};
	}

	return state;
};

export default combineReducers({
	user: loginReducer,
	data: defaultReducer
});
