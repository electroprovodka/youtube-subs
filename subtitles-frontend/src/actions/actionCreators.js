import {
  UPDATE_QUERY,
  SEND_SEARCH_QUERY,
  RECEIVE_SEARCH_RESULTS,
  PAGE_CHANGE_RESPONSE,
  PAGE_CHANGE_REQUEST
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
		totalLength: data.total_length,
		totalPages: data.total_pages
	};
};

export const requestPageChange = (nextPage) => {
	return {
		type: PAGE_CHANGE_REQUEST,
		page: nextPage
	};
};

export const responsePageChange = (data) => {
	return {
		type: PAGE_CHANGE_RESPONSE,
		videos: data.videos,
		totalLength: data.total_length
	};
};
