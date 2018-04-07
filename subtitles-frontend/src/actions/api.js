import cookie from 'react-cookie';

import {AUTH_COOKIE_NAME} from '../constants';

// TODO: update
export const getAuthCookie = () => cookie.load(AUTH_COOKIE_NAME);
// TODO: check 'path'
export const setAuthCookie = (value) => {cookie.save(AUTH_COOKIE_NAME, value, {path: '/'});};
export const removeAuthCookie = () => {cookie.remove(AUTH_COOKIE_NAME, {path: '/'});};

const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	// TODO: handle 401 - when token expires - remove cookie
	const error = new Error(`HTTP Error ${response.statusText}`);
	error.status = response.statusText;
	error.response = response;
	error.statusCode = response.status;
	console.log(error); // eslint-disable-line no-console
	throw error;
};

const callApi = ({method, url, body, params}) => {
	const host = 'http://127.0.0.1:8000';
	const headers = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		// 'Access-Control-Allow-Origin': '*'
	});


	const esc = encodeURIComponent;
	const query = Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');

	const api_url = query ? `${host}${url}?${query}`: url;
	console.log(api_url);
	// TODO: check other options: mode=cors and etc.
	return fetch(api_url, {method, body: JSON.stringify(body), headers})
    .then(checkStatus)
    .then(response => response.json())
};

export const get = (url, params={}) => callApi({method: 'GET', url, params});

export const post = (url, body, params={}) => callApi({method: 'POST', url, body, params});
