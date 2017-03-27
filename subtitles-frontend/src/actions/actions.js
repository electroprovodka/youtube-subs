import { browserHistory } from 'react-router';

import {
  updateQuery,
  searchRequested,
  searchReceived,
  pageChangeRequested,
  pageChangeReceived,
  loginRequested,
  loginReceived,
  loginFailed,
  logoutRequested,
  logoutReceived,
  clearVideos
} from './actionCreators';

import { get, post, setAuthCookie, removeAuthCookie } from './api';

const submitSearch = () => (dispatch, getState) => {
	const {
    data: {
      query
    }
  } = getState();
  if (!query) {
    // TODO: handle empty search bar
    return;
  }
	dispatch(searchRequested());
	console.log(query);
	return get('/api/search/?q='+query)
    .then(data => {
    	dispatch(searchReceived(data));
    	return data;
  });
};

const requestPage = (nextPage) => (dispatch, getState) => {
	const {
    data: {
      totalPages,
      query
    }
  } = getState();
	if (nextPage < 0 || nextPage > totalPages) {
		return;
	}
	dispatch(pageChangeRequested(nextPage));
  // TODO: what if we change query but not submit and then change page
  // TODO: find other way to add params
	return get('/api/search/?q='+query+'&page='+nextPage)
    .then(data=> {
    	dispatch(pageChangeReceived(data));
    	return data;
  });
};

const loginSuccess = (response) => (dispatch) => {
	const { accessToken } = response;
	dispatch(loginRequested());
	return post('/api/social/google-oauth2/', {access_token: accessToken})
    .then(data => {
	    setAuthCookie(data.token);
    	console.log(data);
	    dispatch(loginReceived());
    	return data;
    })
    .catch(error => dispatch(loginFailed()));
};

const loginFail = (response) => (dispatch) => {
  //TODO: do something when oauth fail
	dispatch(loginFailed());
	console.log('fail', response);
	return response;
};

const logout = () => (dispatch) => {
  dispatch(logoutRequested())
  removeAuthCookie();
  return dispatch(logoutReceived())
};

export const moveTo = (destination, callback) => (dispatch, getState) => {
  browserHistory.push(destination);
  if (dispatch && callback) {
    return callback(dispatch, getState);
  }
}

export const clearVideosState = (dispatch) => {
  return dispatch(clearVideos());
}

export const userActions = {
  loginSuccess,
  loginFail,
  logout
}

export default {
	updateQuery,
	submitSearch,
	requestPage,
};
