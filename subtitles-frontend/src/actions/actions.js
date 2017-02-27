import { browserHistory } from 'react-router';
import {
  updateQuery,
  sendSearchQuery,
  receiveSearchResults
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


export default {
	updateQuery,
	submitSearch
};
