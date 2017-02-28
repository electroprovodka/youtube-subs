import {
  UPDATE_QUERY,
  SEND_SEARCH_QUERY,
  RECEIVE_SEARCH_RESULTS,
  PAGE_CHANGE_RESPONSE,
  PAGE_CHANGE_REQUEST
} from '../actions/constants';

export default (state, action) => {
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
