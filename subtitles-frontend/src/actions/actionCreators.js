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
} from './constants';

export const updateQuery = (query) => {
	return {
		type: UPDATE_QUERY,
		query
	};
};

export const searchRequested = () => {
	return {
		type: SEARCH_REQUESTED
	};
};

export const searchReceived = (data) => {
	console.log(data);
	return {
		type: SEARCH_RECEIVED,
		videos: data.videos,
		totalLength: data.total,
		totalPages: data.pages
	};
};

export const pageChangeRequested = (nextPage) => {
	return {
		type: PAGE_CHANGE_REQUESTED,
		page: nextPage
	};
};

export const pageChangeReceived = (data) => {
	return {
		type: PAGE_CHANGE_RECEIVED,
		videos: data.videos,
		totalLength: data.total
	};
};

export const loginRequested = () => ({type: LOGIN_REQUESTED});
export const loginReceived = () => ({type: LOGIN_RECEIVED});
export const loginFailed = () => ({type: LOGIN_FAILED});


export const logoutRequested = () => ({type: LOGOUT_REQUESTED});
export const logoutReceived = () => ({type: LOGOUT_RECEIVED});


export const clearVideos = () => ({type: CLEAR_VIDEOS});

export const errorReceived = (message, code) => ({type: ERROR_RECEIVED, message, code});
