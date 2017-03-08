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
  loginFailed
} from './actionCreators';


import { get, post } from './api';

const submitSearch = () => (dispatch, getState) => {
	const {
    data: {
      query
    }
  } = getState();
	dispatch(sendSearchQuery());
	console.log(query);
	return get('/api/search/?q='+query)
    .then(data => {
    	dispatch(receiveSearchResults(data));
	    browserHistory.push('/results');
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
      // TODO: add logout
      // TODO: hide cookie
	    cookie.save('youtubesubs_auth_JWT', data.token, {path: '/'});
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


export default {
	updateQuery,
	submitSearch,
	requestPage,
	loginSuccess,
	loginFail
};
