import {
  UPDATE_QUERY,
  SEND_SEARCH_QUERY,
  RECEIVE_SEARCH_RESULTS
} from './constants';

export const updateQuery = (query) => {
	return {
		type: UPDATE_QUERY,
		query
	};
};

export const sendSearchQuery = () => {
	return {
		type: SEND_SEARCH_QUERY
	};
};

export const receiveSearchResults = (data) => {
	return {
		type: RECEIVE_SEARCH_RESULTS,
		videos: data.videos,
		total_length: data.total_length
	};
};
