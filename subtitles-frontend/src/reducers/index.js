import {
  UPDATE_QUERY,
  SEND_SEARCH_QUERY,
  RECEIVE_SEARCH_RESULTS,
} from '../actions/constants';

export default (state, action) => {
	switch (action.type) {
	case UPDATE_QUERY:
		return {...state, query: action.query};
	case SEND_SEARCH_QUERY:
		return {...state, loading: true};
	case RECEIVE_SEARCH_RESULTS:
		return {...state, loading: false, videos: action.videos, total_length: action.total_length};
	}

	return state;
};
