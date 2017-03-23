import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import {
  updateQuery,
  sendSearchQuery,
  receiveSearchResults,
  requestPageChange,
  responsePageChange,
  loginRequested,
  loginReceived,
  loginFailed,
  logoutRequested,
  logoutReceived,
  clearVideos
} from './actionCreators';
import { AUTH_COOKIE_NAME } from '../constants'

import { get, post } from './api';

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
	dispatch(sendSearchQuery());
	console.log(query);
	return get('/api/search/?q='+query)
    .then(data => {
    	dispatch(receiveSearchResults(data));
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
	dispatch(requestPageChange(nextPage));
  // TODO: what if we change query but not submit and then change page
  // TODO: find other way to add params
	return get('/api/search/?q='+query+'&page='+nextPage)
    .then(data=> {
    	dispatch(responsePageChange(data));
    	return data;
});

};

const loginSuccess = (response) => (dispatch) => {
	const { accessToken } = response;
	dispatch(loginRequested());
	return post('/api/social/google-oauth2/', {access_token: accessToken})
    .then(data => {
	    cookie.save(AUTH_COOKIE_NAME, data.token, {path: '/'});
    	console.log(data);
	    dispatch(loginReceived());
    	return data;})
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
  cookie.remove(AUTH_COOKIE_NAME, {path: '/'});
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
