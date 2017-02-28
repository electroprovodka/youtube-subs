import { browserHistory } from 'react-router';
import {
  updateQuery,
  sendSearchQuery,
  receiveSearchResults,
  requestPageChange,
  responsePageChange
} from './actionCreators';

import { get } from './api';

const submitSearch = () => (dispatch, getState) => {
	const {
    query
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
    totalPages,
    query
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


export default {
	updateQuery,
	submitSearch,
	requestPage
};
